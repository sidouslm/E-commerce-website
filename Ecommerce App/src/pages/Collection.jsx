import React from 'react'
import { ShopContext } from '../context/ShopContext.jsx';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {

  const { products, search, showSearch } = React.useContext(ShopContext);

  const [showFilter, setShowFilter] = React.useState(false);

  const [filterProducts, setFilterProducts] = React.useState([]);

  const [Category, setCategory] = React.useState([]);

  const [SubCategories, setSubCategories] = React.useState([]); 

  const [sortType, setSortType] = React.useState('relevent');

   const [isVisible, setIsVisible] = React.useState(false);
   const ref = React.useRef(null);

   
  const toggleSubCategory = (e)=>{
    if (SubCategories.includes(e.target.value)) {
      setSubCategories(prev=>prev.filter(item => item !== e.target.value))
    }else {
      setSubCategories(prev => [...prev, e.target.value])
    }
  }


  const toggleCategory = (e)=>{
    if (Category.includes(e.target.value)) {
      setCategory(prev=>prev.filter(item => item !== e.target.value)); 
    } else {
      setCategory(prev => [...prev, e.target.value])
    }
  }


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


  React.useEffect(() => {
    let sorted = filterProducts.slice();
    
    if (sortType === 'Low-Hight') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortType === 'Hight-Low') {
      sorted.sort((a, b) => b.price - a.price);
    }
    
    setFilterProducts(sorted);
  }, [sortType])
  React.useEffect(() => {
      setFilterProducts(products);
  },[])

  React.useEffect(() => { 
    let filtered = products;

    if (Category.length > 0) {
      filtered = filtered.filter(item => Category.includes(item.category));
    }

    if (SubCategories.length > 0) {
      filtered = filtered.filter(item => SubCategories.includes(item.subCategory));
    }
    
    if( showSearch && search){
      filtered = filtered.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }

    setFilterProducts(filtered);
  },[Category, SubCategories, products , search, showSearch]);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* filter section */}
      <div className='min-w-60'>
        <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2 transition-all'>FILTERS
          <svg className={`h-3 sm:hidden ${showFilter ? '-rotate-90' : ''}`} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
          </svg>

        </p>
        {/* categories filters */}
        <div className={`border border-slate-300 pl-5 py-3 mt-6 transition-all duration-300 ${showFilter ? 'opacity-100' : 'opacity-0 hidden'} sm:block sm:opacity-100`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 mt-2 pl-3 text-sm font-light text-slate-950'>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Rolex'} checked={Category.includes('Rolex')} onChange={toggleCategory}/>Rolex
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Tissot'} checked={Category.includes('Tissot')} onChange={toggleCategory}/>Tissot
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Casio'} checked={Category.includes('Casio')} onChange={toggleCategory}/>Casio
            </p>
          </div>
        </div>
        {/* SubCategories filters */}
        <div className={`border border-slate-300 px-5 py-3 mt-6 transition-all duration-300 ${showFilter ? 'opacity-100' : 'opacity-0 hidden'} sm:block sm:opacity-100`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 mt-2 pl-3 text-sm font-light text-slate-950'>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' checked={SubCategories.includes('Men')} onChange={toggleSubCategory} value={'Men'} />Men
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' checked={SubCategories.includes('Women')} onChange={toggleSubCategory} value={'Women'} />Women
            </p>

          </div>
        </div>


      </div>

      {/* right section */}
       <div className='flex-1'>

        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'All'} text2={'COLLECTION'}/>
          {/* Product sort */}
          <select className='border-[1.5px] border-slate-300 text-xs px-2' onChange={(e) => setSortType(e.target.value)} >
            <option value="relevent">Sort by : relevance</option>
            <option value="Low-Hight">Sort by : low-hight</option>
            <option value="Hight-Low">Sort by : hight-low</option>
          </select>
        </div>
        {/* proDUCT MAP */}
        <div ref={ref} className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6my-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} >
              {
                filterProducts.map((item,index)=>(
                  <ProductItem key={index} id={item._id} img={item.image} name={item.name} price={item.price} />
                ))
              }
        </div>
       </div>
    </div>
  )
}

export default Collection
