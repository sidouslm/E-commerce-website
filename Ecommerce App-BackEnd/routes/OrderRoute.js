import express, { Router } from 'express'
import { PlaceOrder,PlaceOrderStripe,UserOrders,UpdateStatus,AllOrders, verifyStripe } from '../controllers/OrderController.js'
import adminAuth from '../middleware/AdminAuth.js'
import authUser from '../middleware/auth.js'



const OrderRouter = Router()

//Admin
OrderRouter.post('/list',adminAuth,AllOrders)
OrderRouter.post('/status',adminAuth,UpdateStatus)

//payment Features
OrderRouter.post('/place', authUser,PlaceOrder)
OrderRouter.post('/stripe',authUser ,PlaceOrderStripe)

//User Feature

OrderRouter.post('/userorders', authUser, UserOrders)

//verify feature

OrderRouter.post('/verifyStripe',authUser,verifyStripe)


export default OrderRouter
