import { productRepository } from "../repositories/product.repository";
import { Product } from "../constants/product.constant";
import { ApiError } from "../constants/error.constant";

const getAllProducts = async (): Promise<Product[]> => {
    try {
        const resDB = await productRepository.getAllProducts();
        return resDB;
    } catch (error) {
        throw error;
    }
}

const getProductsWithOutstanding = async (): Promise<Product[]> => {
    try {
        const resDB = await productRepository.getProductsWithOutstanding()
        return resDB
    } catch (error) {
        throw error
    }
}

const createProduct = async (productData: Product): Promise<Product | ApiError> => {
    try {
        const resDB = await productRepository.createProduct(productData)
        return resDB
    } catch (error) {
        throw error
    }
}

const updateProduct = async (productData: Product): Promise<Product | ApiError> => {
    try {
        const resDB = await productRepository.updateProduct(productData)
        return resDB
    } catch (error) {
        throw error
    }
}

const removeProduct = async (productId: string): Promise<ApiError> => {
    try {
        const resDB = await productRepository.removeProduct(productId)
        return resDB
    } catch (error) {
        throw error
    }
}

const removeManyProducts = async (arrayProductsId: string[]): Promise<ApiError> => {
    try {
        const resDB = await productRepository.removeManyProducts(arrayProductsId)
        return resDB
    } catch (error) {
        throw error
    }
}

export const productService = {
    getAllProducts,
    getProductsWithOutstanding,
    createProduct,
    updateProduct,
    removeProduct,
    removeManyProducts
}