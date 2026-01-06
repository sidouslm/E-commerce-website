import { v2 as cloudinary } from 'cloudinary'
import ProductModel from '../models/ProductModel.js'


const addProduct = async (req, res) => {
    try {
        const { name, price, description, category, subCategory, sizes, bestseller, colors } = req.body;

        // Basic validation
        if (!name || !price || !description || !category || !subCategory) {
            return res.json({ success: false, message: 'All fields are required' });
        }

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                const result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url
            })
        )

        // Handle sizes parsing safely
        let parsedSizes;
        try {
            parsedSizes = JSON.parse(colors);
        } catch {
            // Assume comma-separated string if JSON fails
            parsedSizes = colors ? colors.split(',').map(s => s.trim()) : [];
        }

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === 'true',
            colors: parsedSizes,
            image: imagesUrl,
            date: Date.now()
        }

        const product = new ProductModel(productData);
        await product.save()

        res.json({ success: true, message: 'Product Added' })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}




const listProducts = async (req, res) => {
    try {
        const products = await ProductModel.find({})
        res.json({success:true, products})

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
        
    }
}



const removeProducts = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.json({ success: false, message: 'Product ID is required' });
        }

        const foundProduct = await ProductModel.findByIdAndDelete(id);
        if (!foundProduct) {
            return res.json({ success: false, message: 'Product not found' });
        }

        res.json({ success: true, message: `Product "${foundProduct.name}" has been removed` });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}



const singleProduct = async (req, res) => {
    try {
        const {id} = req.params;
        const product = await ProductModel.findById(id)
        if (product === null ) return res.json({success:false, message : 'product not found'})
        res.json({success:true, product})
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}




export {
    listProducts,
    addProduct,
    singleProduct,
    removeProducts
}
