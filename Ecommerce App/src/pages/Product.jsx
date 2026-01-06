import React from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext.jsx'
import RelatedProducts from '../components/RelatedProducts.jsx';

function product() {

  const {productId} = useParams();

   const {products, currency, addToCart} = React.useContext(ShopContext);
   const [productData, setProductData] = React.useState(false);
  
   const [image , setImage] = React.useState('');

   const [colors , setColor] = React.useState('');




  const featchProuctData = async ()=> {
    products.map((item)=>{
      if(item._id === productId){
        setProductData(item);
        setImage(item.image[0])
        return null;
      }
    })
  }
   
  React.useEffect(()=>{
    featchProuctData();
  },[productId, product]);
  return productData ?  (
    <div className='border-t pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* product data  */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row '>
        {/*  product images  */}

        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex max-h-110 sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-center sm:justify-normal gap-2.5'>
            {
              productData.image.map((item,index)=>(
                <img src={item} key={index} className='w-25 h-25 object-cover cursor-pointer mb-3' onClick={()=>setImage(item)}/>
              ))
            }
          </div>
          <div className='w-full flex justify-center sm:justify-center'>
            <img className='w-110 h-110 object-cover ' src={image} alt="" />
          </div>
        </div>
        {/* product info  */}
        <div className='flex-1'>
            <h1 className='font-medium text-2xl mt-2 min-w-full text-slate-900'>{productData.name}</h1>
            <p className='mt-8 text-3xl font-medium text-slate-700'>{currency} {productData.price}</p>
            <p className='mt-5 text-slate-500 md:w-4/5 min-w-4/5'>{productData.description}</p>
            <div className='flex flex-col gap-4 my-8'>
              <p>Select Color</p>
              <div className='flex gap-2'>
                {productData.colors && productData.colors.map((item, index) => (
                  <div key={index} className='flex flex-col items-center'>
                    <button
                      onClick={()=>setColor(item)}
                      className={`w-8 h-8 rounded-full border-2 cursor-pointer transition-all ease-in-out hover:shadow-xl ${
                        item === colors ? 'border-slate-500' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: item.toLowerCase() }}
                    ></button>
                    {item === colors && <div className='w-2 h-2 bg-slate-500 rounded-full mt-1'></div>}
                  </div>
                ))}

              </div>
              <button onClick={()=>addToCart(productData._id,colors )} className='bg-slate-800 w-max mt-5 text-gray-50 px-8 py-3 text-sm active:bg-slate-950 cursor-pointer'>ADD TO CART</button>
              <hr className='mt-8 sm:w-4/5 border-none outline-none h-[1px] bg-slate-300 '/>
              <div className='text-sm text-slate-300 mt-5 flex flex-col gap-1'>
                <p>100% Copy Product</p>
                <p>Cash on delevery</p>
                <p>return policy is availabale</p>
              </div>
            </div>
        </div>

        {/* product description*/}

        </div>
        
      {/* display related products*/ }
      <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
    </div>
  ) : <div className='opacity-0'></div>
}

export default product
