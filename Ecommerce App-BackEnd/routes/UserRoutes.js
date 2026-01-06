import express, { Router } from 'express'

import { LoginUser, RegisterUser, AdminLogin, GetUserProfile, UpdateUser, UploadProfileImage, DeleteUser } from '../controllers/UserController.js'
import authUser from '../middleware/auth.js'
import upload from '../middleware/multer.js'


const UserRouter = Router();


UserRouter.post('/register', RegisterUser)
UserRouter.post('/login', LoginUser)
UserRouter.post('/admin', AdminLogin)
UserRouter.post('/profile', authUser, GetUserProfile)
UserRouter.put('/update', authUser, UpdateUser)
UserRouter.post('/upload-profile-image', authUser, upload.single('image'), UploadProfileImage)
UserRouter.delete('/delete/:id', DeleteUser)



export default UserRouter
