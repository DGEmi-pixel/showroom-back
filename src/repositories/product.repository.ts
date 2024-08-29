import { productModel } from '../db/models/product.model'
import { Product } from '../constants/product.constant';
import { ApiError } from '../constants/error.constant';
import { unlinkFile } from '../config/upload';

import cloudinary from '../db/index.cloudinary';

// Helper function to extract the public ID from the Cloudinary URL
const extractPublicId = (url: string) => {
    const parts = url.split('/');
    const fileName = parts[parts.length - 1];
    const [publicId] = fileName.split('.');
    return publicId;
};

const getAllProducts = async (): Promise<Product[]> => {
    try {
        const products = await productModel.find();
        return products;
    } catch (error) {
        throw error;
    }
}

//TODO MODIFICAR CUANDO SE AGREGUE EL CARROUSEL.
const getProductsWithOutstanding = async (): Promise<Product[]> => {
    try {
        const products = await productModel.find({outstanding: true})
        .sort({ updatedAt: -1 }) //Lo ordena de manera desc según la propiedad
        .limit(3) //Limita el número de registros
        return products
    } catch (error) {
        throw error
    }
}

const createProduct = async (productData: Product): Promise<Product | ApiError> => {
    try {
        //[ ] ANTES DE CREAR EL PRODUCTO GUARDAMOS LA IMAGEN EN CLOUDINARY
        if(productData.imageUrl){
            const result = await cloudinary.uploader.upload(productData.imageUrl, {
            });
            
            if(result){
                //[ ] Eliminar el archivo temporal
                await unlinkFile(productData.imageUrl)

                const imageUrl = result.secure_url

                //ACTUALIZAMOS EL VALOR DE LA PROPIEDAD DE PRODUCT MODAL DATA POR LA URL PÚBLICA
                productData.imageUrl = imageUrl

                const products = await productModel.create(productData)

                if(products){
                    return ({
                        error: false,
                        message: 'Producto agregado',
                        statusCode: 200,
                        data: products
                    })
                } else {
                    return ({
                        error: true,
                        message: 'Error, no se ha podido generar el producto',
                        statusCode: 500,
                        details: products
                    })
                }
            } else {
                return ({
                    error: true,
                    message: 'Error, no se ha podido guardar en la imagen en el servidor de imagenes',
                    statusCode: 500,
                })
            }
        }else {
            return ({
                error: true,
                message: 'Error, No se ha proporcionado ninguna imagen',
                statusCode: 404,
            })
        }
    } catch (err) {
        throw err
    }
}

const updateProduct = async (productData: Product): Promise<Product | ApiError> => {
    try {
        
        const updateFields: Product = {...productData}

        //Verificamos que exista el producto
        const productExistence = await productModel.findById(updateFields.id)

        if(!productExistence){
            return({
                error: true,
                message: 'Error, El producto ya no existe',
                statusCode: 500,
            })
        }

        //Primero verificamos que el path de la imagen no esté vacío
        if(updateFields.imageUrl.length > 0){

            if(productExistence.imageUrl){
                // Extract the public ID from the existing image URL
                const publicID = extractPublicId(productExistence.imageUrl)

                //Eliminamos la imagen antigua de cloudinary
                await cloudinary.uploader.destroy(publicID)
            }

            //Subir la nueva imagen a cloudinary
            const result = await cloudinary.uploader.upload(updateFields.imageUrl, {
            });

            if(result){
                //ACTUALIZAMOS EL VALOR DE LA PROPIEDAD DE PRODUCT MODAL DATA POR LA URL PÚBLICA
                updateFields.imageUrl = result.secure_url;
            }
        } else {
            //Si el usuario envía una url de imagen vacía entonces no es necesario actualizar la imagen
            updateFields.imageUrl = productExistence.imageUrl
        }

        //Una vez verificada la lógica de la imagen se procede a trabajar con todo el producto
        const product = await productModel.findOneAndUpdate({_id: updateFields.id}, updateFields, {
            new: true
        })
        if(product){
            return ({
                error: false,
                message: 'Producto actualizado',
                statusCode: 200,
                data: product
            })
        } else {
            return({
                error: true,
                message: 'Error, imposible actualizar el producto',
                statusCode: 500,
                details: product
            })
        }
        
    } catch (error) {
        throw error
    }
}

const removeProduct = async (productId: string): Promise<ApiError> => {
    try {

        //Verificamos que exista el producto
        const productExistence = await productModel.findById(productId)

        if(!productExistence){
            return({
                error: true,
                message: 'Error, El producto ya no existe',
                statusCode: 500,
            })
        }

        // Extract the public ID from the existing image URL
        const publicID = extractPublicId(productExistence.imageUrl)

        //Eliminamos la imagen antigua de cloudinary
        await cloudinary.uploader.destroy(publicID)

        const resDB = await productModel.findByIdAndDelete(productId)
        if(resDB)
        {
            return({
                error: false,
                message: 'Producto eliminado',
                statusCode: 200
            })
        } else {
            return ({
                error: true,
                message: 'Error, imposible eliminar el producto',
                statusCode: 500,
                details: resDB
            })
        }
    } catch (error) {
        throw error
    }
}

const removeManyProducts = async (arrayProductsId: string[]): Promise<ApiError> => {
    try {
        const resDB = await productModel.deleteMany({_id: {$in: arrayProductsId}})
        // const resDB = await productModel.find({_id: arrayProductsId[0]})
        if(resDB){
            return({
                error: false,
                message: 'Productos eliminados',         
                statusCode: 200,
            })
        } else {
            return({
                error: true,
                message: 'Error, imposible eliminar los productos',
                statusCode: 500,
                details: resDB
            })
        }
    } catch (error) {
        throw error
    }
}

export const productRepository = {
    getAllProducts,
    getProductsWithOutstanding,
    createProduct,
    updateProduct,
    removeProduct,
    removeManyProducts
}