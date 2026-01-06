import React from 'react'
import { ShopContext } from '../context/ShopContext.jsx'
import Title from './Title.jsx';
import ProductItem from './ProductItem.jsx';

const LatestCollection = () => {

    const {products} = React.useContext(ShopContext);
    const [latestProducts, setLatestProducts] = React.useState([]);
    const [isVisible, setIsVisible] = React.useState(false);
        const ref = React.useRef(null);
     

    React.useEffect(() => {
        setLatestProducts(products.slice(0, 10));
    },[products]);
    React.useEffect(() => {
          const observer = new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting) {
                setIsVisible(true);
              }
            },
            { threshold: 0.1 }
          );
    
          if (ref.current) {
            observer.observe(ref.current);
          }
    
          return () => {
            if (ref.current) {
              observer.unobserve(ref.current);
            }
          };
        }, []);





  return (
    <div ref={ref} className={`my-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className='text-center py-8 text-3xl'>
        <Title text1={'LATEST'} text2={'COLLECTION'}/>
        <p className='2=3/4 m-auto text-xs sm:text-sm md:text-base text-gray-500'>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos molestiae maiores </p>
      </div>

        {/* redenring products */}

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                latestProducts.map((item,index)=>(
                    <ProductItem key={index} id={item._id} img={item.image} name={item.name} price={item.price} />
                ))
            }
          

        </div>

    </div>
  )
}

export default LatestCollection


