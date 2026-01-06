import React, { useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title.jsx';
import { toast } from 'react-toastify';
import axios from 'axios';

const order = () => {

  const { backendUrl ,token,orders, currency } = React.useContext(ShopContext);
  const [orderData, setOrderData] = useState([])

  const loadOrderData = async () =>{
    try {
      if (!token) {
        return null
      }

      const response = await axios.post(backendUrl + '/api/order/userorders' , {} , {headers:{token}})
      
      if (response.data.success) {
        let AllOrderItem = []
        response.data.orders.map((order)=> {
          order.items.map((item)=> {
            item['status' ] = order.status
            item['payment' ] = order.payment
            item['paymentMethod' ] = order.paymentMethod
            item['date' ] = order.date

            AllOrderItem.push(item)
          })
        })
        
        setOrderData(AllOrderItem.reverse())
        
      }

    } catch (error) {
      
    }
  }
  
  
  useEffect(()=>{
    loadOrderData();
  },[token])

  return (
    <div className='border-t pt-16 w-full'>
      <div className='text-2xl font-light'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>
      <div >
        {
          orderData.map((item, index) => (
                <div key={index} className=' w-full py-4 border-t border-b text-slate-700 flex flex-col md:flex-row items-center justify-between gap-4'>
              <div className='w-full flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
                <div className='flex items-center gap-4'>
                  <img src={item.image[0]} className='w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl' alt="" />
                  <div className='flex flex-col gap-2'>
                    <p className='text-sm sm:text-base font-medium'>{item.name}</p>
                    <div className='flex items-center gap-3 text-xs sm:text-sm text-slate-700'>
                      <p>{item.price} {currency}</p>
                      <p>Quantity : {item.quantity}</p>
                      <p>Size: {item.size}</p>
                    </div>
                    <p className='mt-1 text-xs sm:text-sm'>Date: <span className='text-slate-400'>{new Date(item.date).toDateString()}</span></p>
                    <p className='mt-1 text-xs sm:text-sm'>Payment: <span className='text-slate-400'>{item.paymentMethod}</span></p>
                  </div>
                </div>
                <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
                  <div className='flex items-center gap-2'>
                    <p className='w-2 h-2 rounded-full bg-blue-300'></p>
                    <p className='text-sm'>{item.status}</p>
                  </div>
                  <button onClick={loadOrderData} className='cursor-pointer hover:bg-slate-700  hover:border-blue-300   hover:text-slate-50 transition-all ease-in-out border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default order
