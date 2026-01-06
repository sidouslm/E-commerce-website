import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'

const List = ({token}) => {

  const [list,setList] = useState([]) 
  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
        setList(response.data.products);
      }else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
  }

  const removeProduct = async (id) => {
    try {
      
      const response = await axios.delete(backendUrl + `/api/product/delete/${id}` ,  {headers:{token}})


      if (response.data.success) {
        toast.success('Product Removed')
        await fetchList();
      } else { 
        toast.error(response.data.message)
      }
    
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }


  useEffect(()=>{
    fetchList()
  },[])

  return (
    <>
      <p className='mb-2'>All Products List</p>
      <div className='flex flex-col gap-2 '>

        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {
          list.map((item,index)=>(
            <div className='flex flex-row md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-4 py-2 px-4 text-sm border border-slate-300' key={index}>
              <div className='flex-shrink-0 w-16 h-16 md:w-20 md:h-20'><img className='w-full h-full object-cover object-center rounded-xl' src={item.image[0]} alt="" /></div>
              <div className='flex-1 md:hidden'>
                <p className='font-medium'>{item.name}</p>
                <p className='text-gray-600'>{item.category}</p>
                <p className='font-semibold'>{item.price} {currency}</p>
              </div>
              <p className='hidden md:block'> {item.name}</p>
              <p className='hidden md:block'> {item.category}</p>
              <p className='hidden md:block'> {item.price} {currency}</p>
              <p onClick={()=>removeProduct(item._id)} className='cursor-pointer text-lg text-center flex-shrink-0'>X</p>
            </div>
          ))
        }

      </div>
    </>
  )
}

export default List
