import React from 'react'
import { ShopContext } from '../context/ShopContext.jsx';
import { Link } from 'react-router-dom';

const ProductItem = ({id, img, name, price}) => {

    const {currency} = React.useContext(ShopContext);


  return (
    <div>
    <Link className='text-gray700 cursor-pointer' to={`/product/${id}`}>
        <div className='overflow-hidden h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80'>
            <img className='w-full h-full object-cover hover:scale-110 transition ease-in-out' src={img[0]} />
        </div>
        <p className='mx-0 mt-4 pt=3 pb-1 text-sm text-slate-700'>{name}</p>
        <p className='text-sm font-medium text-slate-600'>{price}{currency}</p>
    </Link>
    </div>
  )
}

export default ProductItem
