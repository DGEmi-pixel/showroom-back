import {Schema, model} from 'mongoose'
import { Product } from '../../constants/product.constant'

const productSchema = new Schema<Product>(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        outstanding: {
            type: Boolean,
            required: true
        },
        season: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        size: {
            type: [Number],
            required: true
        },
        brand: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        colors: {
            type: [String],
            required: true
        },
        offer: {
            type: Boolean,
            required: true
        },
        discount: {
            type: Number,
            required: true,
            default: 0
        },
        imageUrl: {
            type: String,
            required: true
        }
    }, {timestamps: true},
)

const productModel = model<Product>('product', productSchema)

export {productModel}