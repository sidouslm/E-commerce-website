import React, { useState } from 'react'
import { assets } from '../assets/assests.js'
import axios from 'axios'
import { backendUrl } from '../App.jsx'
import { toast } from 'react-toastify'

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [Category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [bestseller, setBestseller] = useState(false);
  const [colors, setColors] = useState([]);
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

      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", Category)
      formData.append("subCategory", subCategory)
      formData.append("bestseller", bestseller)
      formData.append("colors", JSON.stringify(colors))

      image1 && formData.append('image1', image1)
      image2 && formData.append('image2', image2)
      image3 && formData.append('image3', image3)
      image4 && formData.append('image4', image4)

      const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { token } })

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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {loading && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-3">
            <div className="w-6 h-6 border-2 border-slate-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-700 font-medium">Uploading product...</p>
          </div>
        </div>
      )}
      
      <form onSubmit={OnSubmitHandler} className="space-y-6">
        
        {/* Image Upload Section with Grid */}
        <div className="space-y-3">
          <p className="text-lg font-medium text-slate-700 mb-3">Upload Product Images</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((num) => {
              const imageState = num === 1 ? image1 : num === 2 ? image2 : num === 3 ? image3 : image4;
              const setImageState = num === 1 ? setImage1 : num === 2 ? setImage2 : num === 3 ? setImage3 : setImage4;

              return (
                <label key={num} htmlFor={`image${num}`} className="block cursor-pointer group">
                  <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-dashed border-slate-300 hover:border-slate-400 transition-colors duration-200 bg-slate-50">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      src={!imageState ? assets.imgArea : URL.createObjectURL(imageState)}
                      alt={`Product image ${num}`}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-200"></div>
                    <div className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm">
                      <span className="text-sm font-medium text-slate-700">{num}</span>
                    </div>
                  </div>
                  <input
                    onChange={(e) => setImageState(e.target.files[0])}
                    type="file"
                    id={`image${num}`}
                    className="hidden"
                    accept="image/*"
                  />
                  <p className="text-xs text-slate-500 mt-2 text-center">Image {num}</p>
                </label>
              );
            })}
          </div>
          <p className="text-sm text-slate-500">Upload at least one image (max 4 images)</p>
        </div>

        {/* Product Name */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            Product Name <span className="text-red-500">*</span>
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none transition-all"
            type="text"
            placeholder="Enter product name"
            required
          />
        </div>

        {/* Product Description */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            Product Description <span className="text-red-500">*</span>
          </label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none transition-all resize-none"
            rows="4"
            placeholder="Write detailed product description..."
            required
          />
        </div>

        {/* Category & Price Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Category */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Category <span className="text-red-500">*</span>
            </label>
            <input
              onChange={(e) => setCategory(e.target.value)}
              value={Category}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none transition-all"
              type="text"
              placeholder="e.g., Rolex"
              required
            />
          </div>

          {/* Sub Category */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Sub Category <span className="text-red-500">*</span>
            </label>
            <input
              onChange={(e) => setSubCategory(e.target.value)}
              value={subCategory}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none transition-all"
              type="text"
              placeholder="e.g., Men, Women"
              required
            />
          </div>

          {/* Price */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Price ($) <span className="text-red-500">*</span>
            </label>
            <input
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none transition-all"
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              required
            />
          </div>

          {/* Best Seller Checkbox */}
          <div className="space-y-2 flex items-end">
            <div className="flex items-center h-12">
              <input
                type="checkbox"
                id="bestseller"
                checked={bestseller}
                onChange={(e) => setBestseller(e.target.checked)}
                className="w-5 h-5 text-slate-600 rounded focus:ring-slate-500"
              />
              <label htmlFor="bestseller" className="ml-3 text-sm font-medium text-slate-700 cursor-pointer">
                Mark as Best Seller
              </label>
            </div>
          </div>
        </div>

        {/* Colors Selection */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-slate-700">
            Available Colors <span className="text-red-500">*</span>
            <span className="block text-xs text-slate-500 font-normal mt-1">Select at least one color</span>
          </label>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
            {[
              { name: 'Red', color: '#ef4444' },
              { name: 'Blue', color: '#3b82f6' },
              { name: 'Green', color: '#10b981' },
              { name: 'Yellow', color: '#f59e0b' },
              { name: 'Black', color: '#000000' },
              { name: 'White', color: '#ffffff', border: true },
              { name: 'Transparent', color: 'transparent', border: true }
            ].map((colorItem) => (
              <button
                key={colorItem.name}
                type="button"
                onClick={() => setColors(prev =>
                  prev.includes(colorItem.name)
                    ? prev.filter(item => item !== colorItem.name)
                    : [...prev, colorItem.name]
                )}
                className={`flex flex-col items-center p-2 rounded-lg transition-all duration-200 ${
                  colors.includes(colorItem.name)
                    ? 'bg-blue-50 ring-2 ring-slate-500'
                    : 'bg-slate-50 hover:bg-slate-100'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full ${colorItem.border ? 'border-2 border-slate-300' : ''}`}
                  style={{ backgroundColor: colorItem.color }}
                ></div>
                <span className="text-xs mt-2 font-medium text-slate-700">{colorItem.name}</span>
                {colors.includes(colorItem.name) && (
                  <div className="mt-1">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-8 py-3 bg-slate-600 text-white font-medium rounded-lg hover:bg-slate-700 focus:ring-4 focus:ring-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Adding Product...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Add Product</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Add