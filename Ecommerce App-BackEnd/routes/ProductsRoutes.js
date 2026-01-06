import express, { Router } from 'express'
import {listProducts, removeProducts, addProduct, singleProduct } from '../controllers/ProductsController.js'
import upload from '../middleware/multer.js'
import adminAuth from '../middleware/AdminAuth.js'


const ProductRouter = Router()

ProductRouter.post('/add',adminAuth, upload.fields([{name:'image1', maxCount:1},{name:'image2', maxCount:1},{name:'image3', maxCount:1},{name:'image4', maxCount:1},]), addProduct)
ProductRouter.delete('/delete/:id',adminAuth,removeProducts)
ProductRouter.post('/single/:id' ,singleProduct)
ProductRouter.get('/list' ,listProducts)


export default ProductRouter