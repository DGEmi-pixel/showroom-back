import {type Request, type Response, type NextFunction} from 'express';
import { productService } from '../services/product.service';
import { Product } from '../constants/product.constant';


const getAllProducts = async (_req: Request, res: Response, next:NextFunction): Promise<void> => {
    try {
        const resDB = await productService.getAllProducts();
        res.status(200).json(resDB)
    } catch (error) {
        next(error)
    }
}

const getProductsWithOutstanding = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const resDB = await productService.getProductsWithOutstanding()
        res.status(200).json(resDB)
    } catch (error) {
        next(error)
    }
}

const createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        //COMO EL OBJETO A RECIBIR ES UN FORMDATA SE DEBE RESTRUCTURAR
        const {id, name, description, outstanding, season, type, size, brand, price, offer, discount, colors} = req.body
        
        //SI EXISTE UN ARCHIVO
        if(req.file){
            const imageUrl = req.file.path

            const nProduct: Product = {
                id,
                name,
                description,
                outstanding: outstanding === 'true',
                season,
                type,
                size: JSON.parse(size),
                brand,
                price,
                offer: offer === 'true',
                discount: parseFloat(discount),
                colors: JSON.parse(colors),
                imageUrl: imageUrl
            }
        
            const resDB = await productService.createProduct(nProduct)

            res.status(200).json(resDB)
        } else {
            res.status(400).json({ message: 'No se ha cargado ninguna imagen.' });
        }

    } catch (error) {
        next(error)
    }
}

const updateProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        //COMO EL OBJETO A RECIBIR ES UN FORMDATA SE DEBE RESTRUCTURAR
        const {id, name, description, outstanding, season, type, size, brand, price, offer, discount, colors} = req.body

        const nProduct: Product = {
            id,
            name,
            description,
            outstanding: outstanding === 'true',
            season,
            type,
            size: JSON.parse(size),
            brand,
            price,
            offer: offer === 'true',
            discount: parseFloat(discount),
            colors: JSON.parse(colors),
            imageUrl: ''
        }

        //SI EXISTE UN ARCHIVO
        if(req.file){
            nProduct.imageUrl = req.file.path
        }
    
        const resDB = await productService.updateProduct(nProduct)

        res.status(200).json(resDB)

    } catch (error) {
        next(error)
    }
}

const removeProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const resDB = await productService.removeProduct(req.params.id)
        res.status(200).json(resDB)
    } catch (error) {
        next(error)
    }
}

const removeManyProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const resDB = await productService.removeManyProducts(req.body.arrayProductsId)
        res.status(200).json(resDB)
    } catch (error) {
        next(error)
    }
}

export const productController =
{
    getAllProducts,
    getProductsWithOutstanding,
    createProduct,
    updateProduct,
    removeProduct,
    removeManyProducts
}