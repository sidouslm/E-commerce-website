import express from 'express'
import { Router } from 'express'
import { AddProductToCart,getUserCart,updateCart } from '../controllers/CartController.js'
import authUser from '../middleware/auth.js'


const CartRouter = Router()

CartRouter.post('/get',authUser, getUserCart)
CartRouter.post('/add',authUser, AddProductToCart)
CartRouter.post('/upadte',authUser, updateCart)



export default CartRouter