import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const Verify = () => {

    const {navigate,token,setCartItems,backendUrl} = useContext(ShopContext)
    const [searchParams,setSearchParams] = useSearchParams()

    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')


    const veryfyPayment = async () => {
        try {
            
            if (!token) {
                return null
            }

            const response = await axios.post(backendUrl + '/api/order/verifyStripe', {success,orderId},{headers:{token}})
            if (response.data.success) {
                setCartItems({})
                navigate('/order')

            }else {
                navigate('/cart')
                toast.error('Payment Failed Please Try Again')
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
            
        }
    }


    useEffect(()=> {
        veryfyPayment()
    },[token])

  return (
    <div>
      
    </div>
  )
}

export default Verify
