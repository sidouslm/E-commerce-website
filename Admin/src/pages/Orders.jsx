import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assests.js'
const Orders = ({ token }) => {

  const [order, setOrders] = useState([])


  const fetchAllOrders = async () => {
    if (!token) {
      return null
    }
    try {

      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } })
      if (response.data.success) {
        setOrders(response.data.orders)
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      toast.error(error)
    }
  }


  useEffect(() => {
    fetchAllOrders();
  }, [token])
 

  const statusHandler = async (e , orderId )=> {
    try {
      
      const response =await axios.post(backendUrl + '/api/order/status' , {orderId, status:e.target.value} , {headers:{token}} )
      if (response.data.success) {
        await fetchAllOrders();
      }

    } catch (error) {
      console.log(error);
      toast.error(response.data.message)
      
    }
  }

  return (
    <div>
      <Title text1={'ORDERS'} text2={'PAGE'}/>
      <div>
        {
          order.length > 0 ? (
            order.map((order, index) => (
              <div className='grid grid-cols-1 md:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-4 items-start border-2 border-slate-200 p-3 sm:p-5 md:p-8 my-2 md:my-4 text-xs sm:text-sm text-slate-700' key={index}>
                <img className='w-12' src={assets.Package} alt="" />
                <div>
                  <div>
                    {order.items.map((item, index) => {
                      if (index === order.items.length - 1) {
                        return <p className='py-0.5' key={index}> {item.name} x {item.quantity} <span>{item.colors}</span> </p>
                      }
                      else {
                        return <p className='py-0.5' key={index}> {item.name} x {item.quantity} <span>{item.colors}</span> ,</p>

                      }
                    })}
                  </div>
                  <p className='mt-3 mb-2 font-medium'>{order.address ? order.address.firstname + ' ' + order.address.lastname : 'No address available'}</p>
                  <div>
                    <p>{order.wilaya ? order.wilaya.name + ', ' + order.city : order.city}</p>
                  </div>
                  <p>{order.address ? order.address.phone : 'no Phone Number'}</p>
                </div>
                <div>
                  <p className='text-sm sm:text-[15px]'>items : {order.items.length}</p>
                  <p className='mt-3'>Method : {order.paymentMethod}</p>
                  {order.paymentMethod === 'Stripe' && (
                    <p className='text-green-600'>Payment : {order.payment ? 'Paid' : 'Pending'}</p>
                  )}
                  {order.paymentMethod === 'delivery company' && (
                    <p className='text-orange-600'>Payment : Cash on Delivery</p>
                  )}
                  {order.paymentMethod !== 'Stripe' && order.paymentMethod !== 'Delivery Company' && (
                    <p>Payment : {order.payment ? 'Done' : 'Pending'}</p>
                  )}
                  <p>Date : {new Date(order.date).toLocaleDateString()}</p>
                </div>
                <p className='text-sm sm:text-[15px]'>{order.amount} {currency}</p>
                <select onChange={(e)=>statusHandler(e,order._id)} value={order.status} className='p-2 font-semibold cursor-pointer'>
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            ))
          ) : (
            <div className='absolute top-[45%] left-[45%]'>
              <img className='w-50 opacity-90' src={assets.EmptyOrders} alt="No orders" />
              <h2 className='text-center mt-2 text-slate-400'>No Orders Yet</h2>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Orders
