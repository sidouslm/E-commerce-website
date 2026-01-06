import { application } from "express";
import mongoose, { Schema, model} from "mongoose";


const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: Array,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    subCategory: {
        type: String,
        required: true
    },
    colors: {
        type: Array,
        required: true
    },
    bestseller: {
        type: Boolean,
    },
    date: {
        type: Number,
        required: true
    },

})

const ProductModel = mongoose.models.product || model('Product', productSchema)


export default ProductModel




