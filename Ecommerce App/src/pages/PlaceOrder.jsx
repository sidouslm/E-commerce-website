import React, { useState, useContext, useEffect, useRef } from 'react'
import Title from '../components/Title'
import { wilayas } from '../assets/assests.js'
import { ShopContext } from '../context/ShopContext'
import CartTotal from '../components/CartTotal.jsx'
import axios from 'axios'
import {toast} from 'react-toastify'


const placeOrder = () => {
  const { selectedWilaya, setSelectedWilaya, selectedDeliveryType, setSelectedDeliveryType, navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = React.useContext(ShopContext)
  const [method, setMethod] = useState('COD')
  const [wilayaFilter, setWilayaFilter] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
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

  const onchangeHnadler = (e) => {
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
            const response = await axios.post(backendUrl + '/api/order/place',orderData, {headers:{token}})
            console.log(response.data)
            if (response.data.success) {
              setCartItems({})
              navigate('/order')
            } else {
              toast.error(response.data.message)
            }
        break;

        // Api Calls for Stripe
        case 'Stripe':
            // Placeholder for Stripe integration
            const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, {headers:{token}})
            if (responseStripe.data.success) {
              const {session_url} = responseStripe.data
              window.location.replace(session_url)
              
            } else {
              toast.error(responseStripe.data.message)
            }
            
        break;

        default :
          break;
      }

      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
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
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* left side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <input required onChange={onchangeHnadler} name='firstname' value={formData.firstname} className='border border-slate-300 rounded py-1.5 px-3.5 w-full capitalize' type="text" placeholder='First name' />
          <input required onChange={onchangeHnadler} name='lastname' value={formData.lastname} className='border border-slate-300 rounded py-1.5 px-3.5 w-full capitalize' type="text" placeholder='Last name' />
        </div>
        <input required onChange={onchangeHnadler} name='email' value={formData.email} className='border border-slate-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email adress' />
        {method === 'delivery company' && (
          <>
            <input required onChange={onchangeHnadler} name='phone' value={formData.phone} className='border border-slate-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Number 0....' />
            <div className='relative' ref={dropdownRef}>
              <button
                className='border border-slate-300 rounded py-1.5 px-3.5 w-full text-left'
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {selectedWilaya ? `${selectedWilaya.name} - ${selectedDeliveryType === 'domicile' ? selectedWilaya.domicile : selectedWilaya.stopdesk} DA` : 'Select wilaya'}
              </button>
              {isDropdownOpen && (
                <div className='absolute top-full left-0 w-full border border-slate-300 rounded bg-white z-10 max-h-40 overflow-y-auto'>
                  <input required
                    className='border-b border-slate-300 rounded-t py-1.5 px-3.5 w-full'
                    type="text"
                    placeholder='Search wilaya'
                    value={wilayaFilter}
                    onChange={(e) => setWilayaFilter(e.target.value)}
                  />
                  {wilayas.filter(wilaya => wilaya.name.toLowerCase().includes(wilayaFilter.toLowerCase())).map((wilaya, index) => (
                    <div
                      key={index}
                      className='py-1.5 px-3.5 hover:bg-slate-100 cursor-pointer'
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
                className={`px-4 py-2 border rounded ${selectedDeliveryType === 'domicile' ? 'bg-slate-800 text-slate-300  border' : 'bg-gray-200 text-black border'}  cursor-pointer`}
                onClick={() => setSelectedDeliveryType('domicile')}
              >
                Domicile
              </button>
              <button
                className={`px-4 py-2 border rounded ${selectedDeliveryType === 'stopdesk' ? 'bg-slate-800 text-slate-300  border' : 'bg-gray-200 text-black border'}  cursor-pointer`}
                onClick={() => setSelectedDeliveryType('stopdesk')}
              >
                Stopdesk
              </button>
            </div>
            <input onChange={onchangeHnadler} name='city' value={formData.city} className='border capitalize border-slate-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='city' />
          </>
        )}
        {method === 'Stripe' && (
          <>
            <input required onChange={onchangeHnadler} name='street' value={formData.street} className='border border-slate-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street' />
            <div className='flex gap-2'>
            <input required onChange={onchangeHnadler} name='city' value={formData.city} className='border capitalize border-slate-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' />
            <input required onChange={onchangeHnadler} name='state' value={formData.state} className='border border-slate-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State' />
            </div>
            <div className='flex gap-2'>
            <input required onChange={onchangeHnadler} name='postalcode' value={formData.postalcode} className='border border-slate-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Postal Code' />
            <input required onChange={onchangeHnadler} name='country' value={formData.country} className='border border-slate-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country' />
            </div>
            <input required onChange={onchangeHnadler} name='phone' value={formData.phone} className='border border-slate-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Number 0....' />
          </>
        )}
      </div>
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>
        <div className='mt-8'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
        <div className='flex flex-col sm:flex-row gap-4'>
          <button
            className={`px-4 py-2 border rounded ${method === 'delivery company' ? 'bg-slate-800 text-slate-300  border' : 'bg-gray-200 text-black border'}  cursor-pointer`}
            onClick={() => setMethod('delivery company')}
          >
            delivery company
          </button>
          <button
            className={`px-4 py-2 border rounded ${method === 'Stripe' ? 'bg-slate-800 text-slate-300  border' : 'bg-gray-200 text-black border'}  cursor-pointer`}
            onClick={() => setMethod('Stripe')}
          >
            Stripe
          </button>
        </div>
        </div>
        <div className='mt-12'>
          <button type='submit' className='text-center bg-slate-800 cursor-pointer hover:bg-slate-900  transition-all ease-in-out text-slate-300 p-3 text-sm rounded'>COMMANDE</button>
        </div>
      </div>
    </form>
  )
}

export default placeOrder
