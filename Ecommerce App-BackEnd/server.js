import express from "express"
import cors from 'cors'
import 'dotenv/config'
import dbconnection from "./config/dbConnection.js"
import connectCloudnary from "./config/cloudnary.js"
import UserRouter from "./routes/UserRoutes.js"
import ProductRouter from "./routes/ProductsRoutes.js"
import CartRouter from "./routes/CartRouter.js"
import OrderRouter from "./routes/OrderRoute.js"

const App = express()
const PORT = process.env.PORT || 4000;
const dbname = process.env.DATABASE
dbconnection(dbname)
connectCloudnary()

App.use(express.json())
App.use(cors())
App.use(express.urlencoded({extended:true}))


App.use('/api/user' , UserRouter)
App.use('/api/product', ProductRouter)
App.use('/api/cart', CartRouter)
App.use('/api/order', OrderRouter)

App.get('/',(req, res) => {
    res.send('API is working')
});




App.listen(PORT, ()=> {
    console.log(`server has started on ${PORT}` );
    
})