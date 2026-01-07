import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'

const List = ({ token }) => {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const removeProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return
    
    try {
      const response = await axios.delete(backendUrl + `/api/product/delete/${id}`, { headers: { token } })

      if (response.data.success) {
        toast.success('Product removed successfully')
        await fetchList();
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className="px-2 sm:px-4 md:px-6 py-3 sm:py-4">
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Product List</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">Manage your products ({list.length} items)</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        </div>
      ) : list.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <h3 className="text-base font-semibold text-slate-700 mb-1">No products found</h3>
          <p className="text-sm text-slate-500">Add your first product to start selling</p>
        </div>
      ) : (
        <>
          {/* Desktop Table - Now scrollable */}
          <div className="hidden sm:block">
            <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
              <div className="min-w-[600px]">
                <div className="grid grid-cols-12 gap-4 p-4 border-b border-slate-200 bg-slate-50">
                  <div className="col-span-2 text-xs font-semibold text-slate-700 uppercase">Image</div>
                  <div className="col-span-4 text-xs font-semibold text-slate-700 uppercase">Product</div>
                  <div className="col-span-2 text-xs font-semibold text-slate-700 uppercase">Category</div>
                  <div className="col-span-2 text-xs font-semibold text-slate-700 uppercase">Price</div>
                  <div className="col-span-2 text-xs font-semibold text-slate-700 uppercase">Action</div>
                </div>
                
                <div className="max-h-[500px] overflow-y-auto">
                  {list.map((item) => (
                    <div key={item._id} className="grid grid-cols-12 gap-4 p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <div className="col-span-2">
                        <div className="w-14 h-14 rounded-lg overflow-hidden border border-slate-200">
                          <img 
                            className="w-full h-full object-cover" 
                            src={item.image[0]} 
                            alt={item.name} 
                          />
                        </div>
                      </div>
                      <div className="col-span-4">
                        <div className="max-w-full">
                          <p className="font-semibold text-slate-800 text-sm truncate">{item.name}</p>
                          <p className="text-xs text-slate-500 line-clamp-2 mt-1 break-words">{item.description}</p>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100 truncate">
                          {item.category}
                        </span>
                      </div>
                      <div className="col-span-2">
                        <div className="font-bold text-slate-800 text-sm">{item.price} {currency}</div>
                      </div>
                      <div className="col-span-2">
                        <button
                          onClick={() => removeProduct(item._id)}
                          className="flex items-center gap-2 text-red-600 hover:text-red-700 px-3 py-1.5 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-100 text-xs font-medium"
                        >
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Cards - Flex wrap solution */}
          <div className="sm:hidden">
            <div className="max-h-[500px] overflow-y-auto pb-4">
              <div className="grid grid-cols-1 gap-3">
                {list.map((item) => (
                  <div key={item._id} className="bg-white rounded-xl border border-slate-200 p-3">
                    {/* Top Row: Image + Basic Info */}
                    <div className="flex gap-3">
                      <div className="w-16 h-16 rounded-lg overflow-hidden border border-slate-200 flex-shrink-0">
                        <img 
                          className="w-full h-full object-cover" 
                          src={item.image[0]} 
                          alt={item.name} 
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-slate-800 text-sm truncate">{item.name}</h3>
                            <p className="text-xs text-slate-500 mt-1 line-clamp-2 break-words">{item.description}</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="font-bold text-slate-800 text-base whitespace-nowrap">{item.price} {currency}</div>
                          </div>
                        </div>
                        
                        {/* Category Chip */}
                        <div className="mt-2">
                          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100 truncate">
                            {item.category}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Bottom Row: Delete Button */}
                    <button
                      onClick={() => removeProduct(item._id)}
                      className="mt-3 w-full flex items-center justify-center gap-2 text-red-600 hover:text-red-700 px-4 py-2.5 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-100 text-sm font-medium"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      Delete Product
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Summary Stats */}
    </div>
  )
}

export default List