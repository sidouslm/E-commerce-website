import OrderModel from "../models/OrderModel.js";
import UserModel from "../models/User.js";
import Stripe from 'stripe'


//golbal variables
const currency = 'usd'
const deleveryCharge = 10

// GATEWAY INSIALIZE

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

///Placing Order using COD

const PlaceOrder = async (req,res)=>{

    try {

        const {userId , items, amount , address, wilaya, city, paymentMethod = 'COD'} = req.body;

        const OrderData = {
            userId,
            items,
            amount,
            address,
            wilaya,
            city,
            paymentMethod,
            payment:false,
            date: Date.now()
        }


        const newOrder = new OrderModel(OrderData)
        await newOrder.save()

        await UserModel.findByIdAndUpdate(userId,{cartData:{}})

        res.json({success : true, message:'OrderPlaced'})


    } catch (error) {
        console.log(error);
        res.json({success:false,message : error.message})

    }

}



///Placing Order using Stripe

const PlaceOrderStripe = async (req,res)=>{
    try {
        
        const {userId , items, amount , address, wilaya, city, paymentMethod = 'Stripe'} = req.body;
        const {origin} = req.headers


        const OrderData = {
            userId,
            items,
            amount,
            address,
            wilaya,
            city,
            paymentMethod,
            payment:false,
            date: Date.now()
        }
        
        const newOrder = new OrderModel(OrderData)
        await newOrder.save()

        const line_items = items.map((item)=>({
            price_data:{
                currency:currency,
                product_data: {
                    name:item.name
                },
                unit_amount:item.price * 100
            },
            quantity: item.quantity
        }))
        
        line_items.push({
            price_data:{
                currency:currency,
                product_data: {
                    name:'Delivery Charges'
                },
                unit_amount:deleveryCharge * 100
            },
            quantity: 1

        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:  `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode:'payment',
        })

        res.json({success:true,session_url:session.url})

    } catch (error) {
        console.log(error);
        res.json({success:false,message : error.message})
    }
}


// All Orders Data for admin panel

const AllOrders = async (req,res)=>{
    try {
        
        const orders = await OrderModel.find({})
        res.json({success:true , orders})

    } catch (error) {
        console.log(error);
        res.json({success:false,message : error.message})
    }
}



//User Order Data for the front end

const UserOrders = async (req,res)=>{
    try {
        
        const {userId} = req.body;

        const orders = await OrderModel.find({userId })
        res.json({success : true, orders})

    } catch (error) {
        console.log(error);
        res.json({success:false,message : error.message})
    }
}

//Verify Stripe

      const verifyStripe = async(req,res)=>{
        const {orderId , success, userId} = req.body 
        try {
          if (success === 'true') {
            await OrderModel.findByIdAndUpdate(orderId, {payment:true});
            await UserModel.findByIdAndUpdate(userId, {cartData:{}});
            res.json({success:true});
          }else {
              await OrderModel.findByIdAndUpdate(orderId)
              res.json({success:false})
          }
        } catch (error) {
            console.log(error);
            res.json({success:false,message : error.message})
        }
      }


//Update Order Status from admin panel

const UpdateStatus = async (req,res)=> {
    try {
        
        const {orderId , status} = req.body;

        await OrderModel.findByIdAndUpdate(orderId, { status })
        res.json({success : true, message : 'Status Updated'})

    } catch (error) {
        console.log(error);
        res.json({success:false,message : error.message})
    }
}



export {
    PlaceOrder,
    PlaceOrderStripe,
    AllOrders,
    UserOrders,
    UpdateStatus,
    verifyStripe
}




