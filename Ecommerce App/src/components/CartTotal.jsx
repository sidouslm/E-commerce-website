import React from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';

const CartTotal = () => {

    const {currency, getDeliveryFee, getCartAmount} = React.useContext(ShopContext);

  return (
    <div className='w-full'>
        <div className='text-2xl'>
          <Title text1={'CART'} text2={'TOTALS'} />
        </div>
      
        <div className='flex flex-col gap-2 mt-2 text-sm'>
            <div className='flex justify-between'>
                <p>SubTotal</p>
                <p>{getCartAmount()}.00 {currency}</p>
            </div>
            <hr />
            <div className='flex justify-between'>
                <p>Shipping Fee</p>
                <p>{getDeliveryFee()}.00 {currency}</p>
            </div>
            <hr />
            <div className='flex justify-between'>
                <b>Total</b>
                <b>{getCartAmount() === 0 ? 0 : getCartAmount()+getDeliveryFee()}.00 {currency}</b>
            </div>
        </div>

    </div>
  )
}

export default CartTotal
