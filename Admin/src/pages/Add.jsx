import React, { useState } from 'react'
import { assets } from '../assets/assests.js'
import axios from 'axios'
import { backendUrl } from '../App.jsx'
import { toast } from 'react-toastify'

const Add = ({ token }) => {

 const [image1 , setImage1] = useState(false)
 const [image2 , setImage2] = useState(false)
 const [image3 , setImage3] = useState(false)
 const [image4 , setImage4] = useState(false)


 const [name, setName] = useState('');
 const [description, setDescription] = useState('');
 const [price, setPrice] = useState('');
 const [Category, setCategory] = useState('');
 const [subCategory, setSubCategory] = useState('');
 const [bestseller, setBestseller] = useState(false);

 const [colors , setColors] = useState([]);
 const [loading, setLoading] = useState(false);


 const OnSubmitHandler = async (e) => {
    e.preventDefault()

    // Validation
    if (!name.trim()) {
      toast.error('Product name is required');
      return;
    }
    if (!description.trim()) {
      toast.error('Product description is required');
      return;
    }
    if (!Category.trim()) {
      toast.error('Category is required');
      return;
    }
    if (!subCategory.trim()) {
      toast.error('Sub Category is required');
      return;
    }
    if (!price || isNaN(price) || price <= 0) {
      toast.error('Valid product price is required');
      return;
    }
    if (colors.length === 0) {
      toast.error('At least one color must be selected');
      return;
    }
    if (!image1 && !image2 && !image3 && !image4) {
      toast.error('At least one image is required');
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData()

      formData.append("name",name)
      formData.append("description",description)
      formData.append("price",price)
      formData.append("category",Category)
      formData.append("subCategory",subCategory)
      formData.append("bestseller",bestseller)
      formData.append("colors", JSON.stringify(colors))


      image1 && formData.append('image1',image1)
      image2 && formData.append('image2',image2)
      image3 && formData.append('image3',image3)
      image4 && formData.append('image4',image4)


      const response =  await axios.post(backendUrl + "/api/product/add" ,formData,{headers:{token}})

      if (response.data.success) {
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice('')
        setCategory('')
        setSubCategory('')
        setBestseller(false)
        setColors([])
      } else {

        toast.error(response.data.message)
      }

    } catch (error) {
      console.error(error);
      toast.error(error.message)

    } finally {
      setLoading(false);
    }
 }


  return (
    <>
      {loading && <p>Loading...</p>}
      <form onSubmit={OnSubmitHandler}>
        <div className='flex flex-col w-full items-start gap-3'>
        <p className='mb-2'>Upload Image</p>
        <div className='flex gap-2'>
          <label htmlFor="image1">
            <img className='w-20 h-20 object-cover cursor-pointer hover:shadow-md transition-all ease-out duration-150' src={!image1 ?  assets.imgArea : URL.createObjectURL(image1)} alt="" />
            <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id="image1" hidden />
          </label>
          <label htmlFor="image2">
            <img className='w-20 h-20 object-cover cursor-pointer hover:shadow-md transition-all ease-out duration-150' src={!image2 ?  assets.imgArea : URL.createObjectURL(image2)} alt="" />
            <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id="image2" hidden />
          </label>
          <label htmlFor="image3">
            <img className='w-20 h-20 object-cover cursor-pointer hover:shadow-md transition-all ease-out duration-150' src={!image3 ?  assets.imgArea : URL.createObjectURL(image3)} alt="" />
            <input onChange={(e)=>setImage3(e.target.files[0])} type="file" id="image3" hidden />
          </label>
          <label htmlFor="image4">
            <img className='w-20 h-20 object-cover cursor-pointer hover:shadow-md transition-all ease-out duration-150' src={!image4 ?  assets.imgArea : URL.createObjectURL(image4)} alt="" />
            <input onChange={(e)=>setImage4(e.target.files[0])} type="file" id="image4" hidden />
          </label>
        </div>
      </div>

      <div className='w-full'>
        <p className='mt-2 mb-2'>Product Name</p>
        <input onChange={(e)=>setName(e.target.value)} value={name} className='w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] px-3 py-2' type="text" placeholder='Type Here' required />
      </div>

      <div className='w-full'>
        <p className='mt-2 mb-2'>Product Description</p>
        <textarea onChange={(e)=>setDescription(e.target.value)} value={description} className='w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] px-3 py-2' type="text" placeholder='Write Content Here' required />
      </div>

      <div className='flex gap-4 flex-wrap items-center w-full'>

        <div>
          <p className='mb-2' >Category</p>
          <input onChange={(e)=>setCategory(e.target.value)} value={Category} className='w-full px-3 py-2 sm:w-[100px] md:w-[120px] capitalize' type="text" placeholder='Rolex or Tissot....' />
        </div>

        <div>
          <p className='mb-2'>SubCategory</p>
          <input onChange={(e)=>setSubCategory(e.target.value)} value={subCategory} className='w-full px-3 py-2 sm:w-[100px] md:w-[120px] capitalize' type="text" placeholder='Men,Women....' />
        </div>


        <div className=''>
          <p className='mb-2 mt-2 '>Product Price</p>
          <input onChange={(e)=>setPrice(e.target.value)} value={price} className='w-1/2 px-3 py-2 sm:w-[100px] md:w-[120px] ' type="Number" placeholder='25' />
        </div>
      </div>

      <div>
        <p className='my-2'>Product Colors</p>
        <div className='flex gap-2 sm:gap-3'>
          {['Red', 'Blue', 'Green', 'Yellow', 'Black','white','Transparent'].map((colorName) => (
            <div key={colorName} className='flex flex-col items-center'>
              <button
                type="button"
                onClick={() => setColors(prev => prev.includes(colorName) ? prev.filter(item => item !== colorName) : [...prev, colorName])}
                className={`w-8 h-8 rounded-full border-2 cursor-pointer transition-all ease-in-out  ${
                  colors.includes(colorName) ? 'border-slate-500' : 'border-gray-300'
                }`}
                style={{ backgroundColor: colorName.toLowerCase() }}
              ></button>
              {colors.includes(colorName) && <div className='w-2 h-2 bg-slate-500 rounded-full mt-1'></div>}
            </div>
          ))}
        </div>
      </div>


      <div className='flex gap-2 mt-4'>
        <input type="checkbox" id="bestseller" checked={bestseller} onChange={(e) => setBestseller(e.target.checked)} />
        <label className='cursor-pointer' htmlFor="bestseller"> Add to bestseller</label>
      </div>



      <button className='w-28 py-3 mt-4 bg-slate-800 text-slate-50 cursor-pointer' type="submit" disabled={loading}>ADD</button>
    </form>
    </>
  )
}

export default Add
