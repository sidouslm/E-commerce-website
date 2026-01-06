import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'

const Profile = () => {
  const { user, updateUserProfile, uploadProfileImage, navigate } = useContext(ShopContext)
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: ''
  })
  const [imageFile, setImageFile] = useState(false)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        lastName: user.lastName || '',
        email: user.email || ''
      })
    }
  }, [user])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }



  const handleImageUpload = async () => {
    if (imageFile) {
      setUploading(true)
      await uploadProfileImage(imageFile)
      setImageFile(null)
      setUploading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await updateUserProfile(formData)
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'PROFILE'} />
      </div>

      <div className='flex flex-col sm:flex-row justify-between sm:gap-10 pt-10'>
        <div className='w-full sm:max-w-[480px]'>
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
              <p className='mb-2'>Profile Image</p>
              <label htmlFor="image">
                <img
                  className='w-24 h-24 object-cover border-slate-500 border-2 cursor-pointer hover:shadow-md transition-all ease-out duration-150 rounded-full'
                  src={!imageFile ? (user.image || 'https://via.placeholder.com/150') : URL.createObjectURL(imageFile)}

                />
                <input
                  onChange={(e) => setImageFile(e.target.files[0])}
                  type="file"
                  id="image"
                  hidden
                  accept="image/*"
                />
              </label>
              {imageFile && (
                <button
                  onClick={handleImageUpload}
                  disabled={uploading}
                  className='bg-black text-white px-4 py-2 text-sm disabled:opacity-50'
                >
                  {uploading ? 'Uploading...' : 'Upload Image'}
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
              <div>
                <label className='text-sm font-medium'>First Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className='w-full px-3 py-2 border border-gray-300 rounded'
                  required
                />
              </div>

              <div>
                <label className='text-sm font-medium'>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className='w-full px-3 py-2 border border-gray-300 rounded'
                />
              </div>

              <div>
                <label className='text-sm font-medium'>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className='w-full px-3 py-2 border border-gray-300 rounded'
                  required
                />
              </div>

              <button
                type="submit"
                className='bg-black text-white px-8 py-2 text-sm'
              >
                Update Profile
              </button>
            </form>
          </div>
        </div>

        <div className='w-full sm:max-w-[480px]'>
          <div className='flex flex-col gap-4'>
            <h3 className='text-lg font-medium'>Quick Actions</h3>
            <div className='flex flex-col gap-2'>
              <button
                onClick={() => navigate('/cart')}
                className='w-full text-left px-4 py-2 border border-gray-300 rounded hover:bg-gray-50'
              >
                View Cart
              </button>
              <button
                onClick={() => navigate('/order')}
                className='w-full text-left px-4 py-2 border border-gray-300 rounded hover:bg-gray-50'
              >
                View Orders
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
