import React from 'react'
import { ShopContext } from '../context/ShopContext.jsx'
import Title from '../components/Title.jsx';
import CartTotal from '../components/CartTotal.jsx';

const cart = () => {

  const { products, currency, cartItems, updateQuantity, navigate } = React.useContext(ShopContext);

  const [cartData, setCartData] = React.useState([]);


  React.useEffect(() => {

    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            color: item,
            quantity: cartItems[items][item]
          })
        }
      }
    } setCartData(tempData);



  }, [cartItems])

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>
      <div>
      {
        cartData.map((item, index) => {

          const productData = products.find((product) => product._id === item._id)

          if (!productData) {
            return null; // Skip rendering if product not found
          }

          return (
            <div key={index} className='py-2 xs:py-3 sm:py-4 border-t border-b text-slate-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-2 xs:gap-3 sm:gap-4'>
              <div className='flex items-start gap-3 xs:gap-4 sm:gap-6'>
                <img className='w-12 xs:w-14 sm:w-16 md:w-20' src={productData.image[0]} alt="" />
                <div>
                  <p className='text-xs xs:text-sm sm:text-lg font-medium'>{productData.name}</p>
                  <div className='flex items-center gap-2 xs:gap-3 sm:gap-5 mt-1 xs:mt-2'>
                    <p className='text-xs xs:text-sm'>{productData.price}{currency}</p>
                    <p className='px-1 xs:px-2 sm:px-3 sm:py-1 border bg-slate-50 text-xs xs:text-sm'>{item.color}</p>
                  </div>
                </div>
              </div>
              <input onChange={(e)=> e.target.value === '' || e.target.value === 0 ? null : updateQuantity(item._id, item.color , Number(e.target.value))} className='border max-w-8 xs:max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 text-xs xs:text-sm' type="number" min={1} defaultValue={item.quantity} name="" id="" />
              <svg onClick={()=>updateQuantity(item._id, item.color , 0)} className=' cursor-pointer hover:text-red-500 bi bi-trash3 transition-all ease-in-out' xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"  viewBox="0 0 16 16">
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
              </svg>
            </div>
            )
          })
      }
      </div>

        <div className='flex justify-end my-20'>
          <div className='w-full sm:w-[450px]'>
            <CartTotal/>
            <div className='w-full text-end'> 
              <button onClick={()=>navigate('/place-order')} className='bg-slate-800 hover:bg-slate-900 transition-all cursor-pointer text-white text-sm my-8 py-3 px-3'>PROCEED TO CHECKOUT</button>
            </div>
          </div>
        </div>
      </div>
      
    
  )
}

export default cart
