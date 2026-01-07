import React, { useState, useContext, useEffect, useRef } from 'react'
import Title from '../components/Title'
import { wilayas } from '../assets/assests.js'
import { ShopContext } from '../context/ShopContext'
import CartTotal from '../components/CartTotal.jsx'
import axios from 'axios'
import {toast} from 'react-toastify'

const PlaceOrder = () => {
  const { selectedWilaya, setSelectedWilaya, selectedDeliveryType, setSelectedDeliveryType, navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext)
  const [method, setMethod] = useState('COD')
  const [wilayaFilter, setWilayaFilter] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('')
  const dropdownRef = useRef(null)
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    wilaya: '',
    city: '',
    phone: '',
    street: '',
    state: '',
    postalcode: '',
    country:''
  })

  const onchangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value

    setFormData(data => ({ ...data, [name]: value }))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (method === 'delivery company' && !selectedWilaya) {
      toast.error('Please select a wilaya.');
      return;
    }
    
    setIsLoading(true)
    
    try {
      let orderItems = []

      for(const items in cartItems) {
        for(const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.colors = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }
      console.log(orderItems);

      let orderData = {
        address: {
          firstname: formData.firstname,
          lastname: formData.lastname,
          email: formData.email,
          phone: formData.phone
        },
        wilaya: selectedWilaya,
        city: formData.city,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
        paymentMethod: method
      }

      switch (method) {
        // Api Calls for delivery company
        case 'delivery company':
            setLoadingMessage('Processing your order with delivery company...')
            const response = await axios.post(backendUrl + '/api/order/place', orderData, {headers:{token}})
            console.log(response.data)
            if (response.data.success) {
              toast.success('Order placed successfully!')
              setCartItems({})
              navigate('/order')
            } else {
              toast.error(response.data.message)
            }
        break;

        // Api Calls for Stripe
        case 'Stripe':
            setLoadingMessage('Redirecting to Stripe payment...')
            const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, {headers:{token}})
            if (responseStripe.data.success) {
              const {session_url} = responseStripe.data
              // Redirect to Stripe payment page
              window.location.replace(session_url)
            } else {
              toast.error(responseStripe.data.message)
            }
        break;

        default:
          break;
      }

    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message || 'Something went wrong')
    } finally {
      setIsLoading(false)
      setLoadingMessage('')
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
        setWilayaFilter('')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <>
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 sm:p-8 max-w-md w-[90%] mx-4 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-800 mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">
              {method === 'Stripe' ? 'Processing Payment...' : 'Placing Order...'}
            </h3>
            <p className="text-sm text-slate-600 mb-4">{loadingMessage}</p>
            <p className="text-xs text-slate-500">
              Please wait while we {method === 'Stripe' ? 'redirect you to secure payment' : 'process your order'}...
            </p>
            {method === 'Stripe' && (
              <p className="text-xs text-slate-500 mt-2">
                You will be redirected to Stripe's secure payment page.
              </p>
            )}
          </div>
        </div>
      )}

      <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
        {/* left side */}
        <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
          <div className='text-xl sm:text-2xl my-3'>
            <Title text1={'DELIVERY'} text2={'INFORMATION'} />
          </div>
          <div className='flex gap-3'>
            <input 
              required 
              onChange={onchangeHandler} 
              name='firstname' 
              value={formData.firstname} 
              className='border border-slate-300 rounded py-2 px-4 w-full capitalize disabled:opacity-50' 
              type="text" 
              placeholder='First name' 
              disabled={isLoading}
            />
            <input 
              required 
              onChange={onchangeHandler} 
              name='lastname' 
              value={formData.lastname} 
              className='border border-slate-300 rounded py-2 px-4 w-full capitalize disabled:opacity-50' 
              type="text" 
              placeholder='Last name' 
              disabled={isLoading}
            />
          </div>
          <input 
            required 
            onChange={onchangeHandler} 
            name='email' 
            value={formData.email} 
            className='border border-slate-300 rounded py-2 px-4 w-full disabled:opacity-50' 
            type="email" 
            placeholder='Email address' 
            disabled={isLoading}
          />
          {method === 'delivery company' && (
            <>
              <input 
                required 
                onChange={onchangeHandler} 
                name='phone' 
                value={formData.phone} 
                className='border border-slate-300 rounded py-2 px-4 w-full disabled:opacity-50' 
                type="number" 
                placeholder='Phone number' 
                disabled={isLoading}
              />
              <div className='relative' ref={dropdownRef}>
                <button
                  type="button"
                  className='border border-slate-300 rounded py-2 px-4 w-full text-left disabled:opacity-50 disabled:cursor-not-allowed'
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  disabled={isLoading}
                >
                  {selectedWilaya ? `${selectedWilaya.name} - ${selectedDeliveryType === 'domicile' ? selectedWilaya.domicile : selectedWilaya.stopdesk} DA` : 'Select wilaya'}
                </button>
                {isDropdownOpen && (
                  <div className='absolute top-full left-0 w-full border border-slate-300 rounded bg-white z-10 max-h-40 overflow-y-auto shadow-lg'>
                    <input 
                      required
                      className='border-b border-slate-300 rounded-t py-2 px-4 w-full'
                      type="text"
                      placeholder='Search wilaya'
                      value={wilayaFilter}
                      onChange={(e) => setWilayaFilter(e.target.value)}
                    />
                    {wilayas.filter(wilaya => wilaya.name.toLowerCase().includes(wilayaFilter.toLowerCase())).map((wilaya, index) => (
                      <div
                        key={index}
                        className='py-2 px-4 hover:bg-slate-100 cursor-pointer'
                        onClick={() => {
                          setSelectedWilaya(wilaya)
                          setFormData(data => ({ ...data, wilaya: wilaya.name }))
                          setIsDropdownOpen(false)
                          setWilayaFilter('')
                        }}
                      >
                        {wilaya.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className='flex flex-col sm:flex-row gap-4'>
                <button
                  type="button"
                  className={`px-4 py-2 border rounded ${selectedDeliveryType === 'domicile' ? 'bg-slate-800 text-white' : 'bg-gray-200 text-black'} disabled:opacity-50 disabled:cursor-not-allowed`}
                  onClick={() => setSelectedDeliveryType('domicile')}
                  disabled={isLoading}
                >
                  Domicile
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 border rounded ${selectedDeliveryType === 'stopdesk' ? 'bg-slate-800 text-white' : 'bg-gray-200 text-black'} disabled:opacity-50 disabled:cursor-not-allowed`}
                  onClick={() => setSelectedDeliveryType('stopdesk')}
                  disabled={isLoading}
                >
                  Stopdesk
                </button>
              </div>
              <input 
                onChange={onchangeHandler} 
                name='city' 
                value={formData.city} 
                className='border capitalize border-slate-300 rounded py-2 px-4 w-full disabled:opacity-50' 
                type="text" 
                placeholder='City' 
                disabled={isLoading}
              />
            </>
          )}
          {method === 'Stripe' && (
            <>
              <input 
                required 
                onChange={onchangeHandler} 
                name='street' 
                value={formData.street} 
                className='border border-slate-300 rounded py-2 px-4 w-full disabled:opacity-50' 
                type="text" 
                placeholder='Street' 
                disabled={isLoading}
              />
              <div className='flex gap-2'>
                <input 
                  required 
                  onChange={onchangeHandler} 
                  name='city' 
                  value={formData.city} 
                  className='border capitalize border-slate-300 rounded py-2 px-4 w-full disabled:opacity-50' 
                  type="text" 
                  placeholder='City' 
                  disabled={isLoading}
                />
                <input 
                  required 
                  onChange={onchangeHandler} 
                  name='state' 
                  value={formData.state} 
                  className='border border-slate-300 rounded py-2 px-4 w-full disabled:opacity-50' 
                  type="text" 
                  placeholder='State' 
                  disabled={isLoading}
                />
              </div>
              <div className='flex gap-2'>
                <input 
                  required 
                  onChange={onchangeHandler} 
                  name='postalcode' 
                  value={formData.postalcode} 
                  className='border border-slate-300 rounded py-2 px-4 w-full disabled:opacity-50' 
                  type="text" 
                  placeholder='Postal Code' 
                  disabled={isLoading}
                />
                <input 
                  required 
                  onChange={onchangeHandler} 
                  name='country' 
                  value={formData.country} 
                  className='border border-slate-300 rounded py-2 px-4 w-full disabled:opacity-50' 
                  type="text" 
                  placeholder='Country' 
                  disabled={isLoading}
                />
              </div>
              <input 
                required 
                onChange={onchangeHandler} 
                name='phone' 
                value={formData.phone} 
                className='border border-slate-300 rounded py-2 px-4 w-full disabled:opacity-50' 
                type="number" 
                placeholder='Phone number' 
                disabled={isLoading}
              />
            </>
          )}
        </div>
        
        {/* right side */}
        <div className='mt-8'>
          <div className='mt-8 min-w-80'>
            <CartTotal />
          </div>
          <div className='mt-8'>
            <Title text1={'PAYMENT'} text2={'METHOD'} />
            <div className='flex flex-col sm:flex-row gap-4'>
              <button
                type="button"
                className={`px-4 py-2 border rounded ${method === 'delivery company' ? 'bg-slate-800 text-white' : 'bg-gray-200 text-black'} disabled:opacity-50 disabled:cursor-not-allowed`}
                onClick={() => setMethod('delivery company')}
                disabled={isLoading}
              >
                Delivery Company
              </button>
              <button
                type="button"
                className={`px-4 py-2 border rounded ${method === 'Stripe' ? 'bg-slate-800 text-white' : 'bg-gray-200 text-black'} disabled:opacity-50 disabled:cursor-not-allowed`}
                onClick={() => setMethod('Stripe')}
                disabled={isLoading}
              >
                Stripe
              </button>
            </div>
          </div>
          <div className='mt-12'>
            <button 
              type='submit' 
              className='text-center bg-slate-800 cursor-pointer hover:bg-slate-900 transition-all ease-in-out text-white p-3 text-sm rounded w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  {method === 'Stripe' ? 'Processing Payment...' : 'Placing Order...'}
                </>
              ) : (
                'PLACE ORDER'
              )}
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default PlaceOrder