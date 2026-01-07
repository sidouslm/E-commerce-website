import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App.jsx'
import { toast } from 'react-toastify'
import { assets } from '../assets/assests.js'

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  // Example order for demo
  const exampleOrder = {
    _id: 'example_123456',
    date: new Date().toISOString(),
    status: 'Order Placed',
    items: [
      {
        name: 'Rolex Submariner',
        quantity: 1,
        price: 12500,
        image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=100',
        colors: 'Black'
      },
      {
        name: 'Apple Watch Series 9',
        quantity: 2,
        price: 399,
        image: 'https://images.unsplash.com/photo-1434493650001-5d43a6fea0a1?w-100',
        colors: 'Silver'
      }
    ],
    address: {
      firstname: 'John',
      lastname: 'Doe',
      email: 'john@example.com',
      phone: '+1234567890'
    },
    city: 'Algiers',
    wilaya: { name: 'Algiers' },
    paymentMethod: 'Stripe',
    payment: true,
    amount: 13298
  }

  const fetchAllOrders = async () => {
    if (!token) {
      // For demo purposes, show example order if no token
      setOrders([exampleOrder])
      setLoading(false)
      return
    }
    
    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } })
      if (response.data.success) {
        setOrders(response.data.orders.length > 0 ? response.data.orders : [exampleOrder])
      } else {
        // Show example order if API fails
        setOrders([exampleOrder])
      }
    } catch (error) {
      // Show example order on error
      setOrders([exampleOrder])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token])

  const statusHandler = async (e, orderId) => {
    if (orderId === 'example_123456') {
      // Update example order status
      setOrders(prev => prev.map(order => 
        order._id === orderId ? { ...order, status: e.target.value } : order
      ))
      toast.success('Example order status updated (demo)')
      return
    }
    
    try {
      const response = await axios.post(
        backendUrl + '/api/order/status',
        { orderId, status: e.target.value },
        { headers: { token } }
      )
      if (response.data.success) {
        toast.success('Order status updated')
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Failed to update status')
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Order Placed': return 'bg-blue-50 text-blue-700 border border-blue-200'
      case 'Packing': return 'bg-yellow-50 text-yellow-700 border border-yellow-200'
      case 'Shipped': return 'bg-purple-50 text-purple-700 border border-purple-200'
      case 'Out for Delivery': return 'bg-orange-50 text-orange-700 border border-orange-200'
      case 'Delivered': return 'bg-green-50 text-green-700 border border-green-200'
      default: return 'bg-gray-50 text-gray-700 border border-gray-200'
    }
  }

  return (
    <div className="px-2 sm:px-4 md:px-6 py-3 sm:py-4">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-slate-800">Orders</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">Manage customer orders ({orders.length} total)</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-600"></div>
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-xl border border-slate-200 p-3 sm:p-4 md:p-5 shadow-sm">
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-100 rounded-lg">
                    <img className="w-5 h-5 sm:w-6 sm:h-6" src={assets.Package} alt="Package" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 text-sm sm:text-base">
                      Order {order._id === 'example_123456' ? '#EXAMPLE' : `#${order._id.slice(-6)}`}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {new Date(order.date).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:mt-0">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Order Content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                {/* Items Section - Wider on mobile */}
                <div className="lg:col-span-2">
                  <h4 className="font-medium text-slate-700 text-sm mb-2 sm:mb-3">Items ({order.items.length})</h4>
                  <div className="space-y-2 sm:space-y-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                        {item.image && (
                          <img 
                            className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-lg flex-shrink-0" 
                            src={item.image} 
                            alt={item.name} 
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-slate-800 text-sm sm:text-base truncate">{item.name}</p>
                          <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs sm:text-sm text-slate-600">
                            <span className="bg-white px-2 py-0.5 rounded border border-slate-200">
                              Qty: {item.quantity}
                            </span>
                            <span className="bg-white px-2 py-0.5 rounded border border-slate-200">
                              Price: {item.price.toLocaleString()} {currency}
                            </span>
                            {item.colors && (
                              <div className="flex items-center gap-1.5 bg-white px-2 py-0.5 rounded border border-slate-200">
                                <span>Color:</span>
                                <div className="w-3 h-3 rounded-full border border-slate-300" 
                                  style={{ backgroundColor: item.colors.toLowerCase() === 'black' ? '#000' : 
                                          item.colors.toLowerCase() === 'silver' ? '#c0c0c0' : item.colors.toLowerCase() }} />
                                <span className="hidden xs:inline">{item.colors}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="text-sm sm:text-base font-semibold text-slate-800 text-right ml-2">
                          <div>{(item.price * item.quantity).toLocaleString()} {currency}</div>
                          <div className="text-xs text-slate-500 font-normal">Total</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Customer & Actions Section */}
                <div className="space-y-4">
                  {/* Customer Info */}
                  <div className="bg-slate-50 rounded-lg p-3 sm:p-4">
                    <h4 className="font-medium text-slate-700 text-sm mb-2">Customer Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="text-slate-800 font-medium">{order.address?.firstname} {order.address?.lastname}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span className="text-slate-600">{order.address?.phone || 'No phone'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-slate-600">{order.city}, {order.wilaya?.name || 'N/A'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div className="bg-slate-50 rounded-lg p-3 sm:p-4">
                    <h4 className="font-medium text-slate-700 text-sm mb-2">Payment Information</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600 text-sm">Method:</span>
                        <span className={`font-semibold text-sm ${order.paymentMethod === 'Stripe' ? 'text-green-600' : 'text-orange-600'}`}>
                          {order.paymentMethod === 'Stripe' ? '💳 Card' : '💰 Cash on Delivery'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600 text-sm">Status:</span>
                        <span className={`font-semibold text-sm ${order.payment ? 'text-green-600' : 'text-orange-600'}`}>
                          {order.payment ? '✅ Paid' : '⏳ Pending'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status Update */}
                  <div className="bg-slate-50 rounded-lg p-3 sm:p-4">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Update Order Status</label>
                    <div className="relative">
                      <select
                        onChange={(e) => statusHandler(e, order._id)}
                        value={order.status}
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                      >
                        <option value="Order Placed">📥 Order Placed</option>
                        <option value="Packing">📦 Packing</option>
                        <option value="Shipped">🚚 Shipped</option>
                        <option value="Out for Delivery">🚛 Out for Delivery</option>
                        <option value="Delivered">✅ Delivered</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-700">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Footer */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col xs:flex-row justify-between items-start xs:items-center gap-2">
                <div className="text-xs sm:text-sm text-slate-600">
                  <span className="inline-flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    {order.items.length} items
                  </span>
                  <span className="mx-2">•</span>
                  <span>
                    {order.paymentMethod === 'Stripe' ? '💳 Card Payment' : '💰 Cash on Delivery'}
                  </span>
                  {order._id === 'example_123456' && (
                    <span className="ml-2 text-blue-600 font-medium">(Example Order)</span>
                  )}
                </div>
                <div className="text-lg sm:text-xl font-bold text-slate-800">
                  Total: {order.amount.toLocaleString()} {currency}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Summary Stats */}
      {orders.length > 0 && (
        <div className="mt-6 p-4 sm:p-5 bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl border border-blue-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
              <div className="text-sm text-slate-600 mb-1">Total Orders</div>
              <div className="text-2xl sm:text-3xl font-bold text-slate-800">{orders.length}</div>
              <div className="text-xs text-slate-500 mt-1">All time orders</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
              <div className="text-sm text-slate-600 mb-1">Total Revenue</div>
              <div className="text-2xl sm:text-3xl font-bold text-green-600">
                {orders.reduce((sum, order) => sum + parseFloat(order.amount), 0).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })} {currency}
              </div>
              <div className="text-xs text-slate-500 mt-1">Gross revenue</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Orders