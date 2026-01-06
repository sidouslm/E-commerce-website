import UserModel from "../models/User.js";
import validator from 'validator'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import cloudinary from '../config/cloudnary.js'

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}


const LoginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        
        const user = await UserModel.findOne({email})
        if (!user) {
            return res.json({ success: false, Message: 'User does Not Exists' })
        }
        const isMatch = await bcrypt.compare(password , user.password)
        if (isMatch) {
            const token = createToken(user._id)
            res.json({success:true, token})
        } else {
            res.json({success:false, message : 'invalid credentials'})
        }

    } catch (error) {
        
        console.error('Something went Wrong', error);
        res.json({ success: false, message: error.message })
    }
    
}



const RegisterUser = async (req, res) => {
    try {
        
        
        const { name, email, password } = req.body;
        
        const exists = await UserModel.findOne({ email })
        if (exists) {
            return res.json({ success: false, Message: 'User Already Exists' })
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, Message: 'Please enter a valid Email' })
        }
        if (password.length < 8) {
            return res.json({ success: false, Message: 'Password must be 8 characters or longer' })
        }
        
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save()

        const token = createToken(user._id)

        res.json({ success: true, token })


    } catch (error) {
        console.error('Something went Wrong', error);
        res.json({ success: false, message: error.message })

    }
}

const AdminLogin = async (req, res) => {
    try {
        const {email, password} = req.body ;

        if (email === process.env.ADMIN_EMAIL &&  password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign({isAdmin: true}, process.env.JWT_SECRET)
            res.json({success:true , token})
        } else {
            res.json({success:false , message : 'invalid credentials'})
        }

    } catch (error) {

        console.error('Something went Wrong', error);
        res.json({ success: false, message: error.message })
    }

}

const GetUserProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await UserModel.findById(userId).select('-password');
        if (!user) {
            return res.json({ success: false, message: 'User not found' })
        }
        res.json({ success: true, user })
    } catch (error) {
        console.error('Something went Wrong', error);
        res.json({ success: false, message: error.message })
    }
}

const UpdateUser = async (req, res) => {
    try {
        const userId = req.userId;
        const { name, lastName, email } = req.body;

        const updateData = {};
        if (name) updateData.name = name;
        if (lastName !== undefined) updateData.lastName = lastName;
        if (email) {
            if (!validator.isEmail(email)) {
                return res.json({ success: false, message: 'Please enter a valid Email' })
            }
            const existingUser = await UserModel.findOne({ email, _id: { $ne: userId } });
            if (existingUser) {
                return res.json({ success: false, message: 'Email already in use' })
            }
            updateData.email = email;
        }

        const user = await UserModel.findByIdAndUpdate(userId, updateData, { new: true }).select('-password');
        if (!user) {
            return res.json({ success: false, message: 'User not found' })
        }
        res.json({ success: true, user })
    } catch (error) {
        console.error('Something went Wrong', error);
        res.json({ success: false, message: error.message })
    }
}

const UploadProfileImage = async (req, res) => {
    try {
        const userId = req.userId;
        const imageFile = req.file;

        if (!imageFile) {
            return res.json({ success: false, message: 'No image file provided' })
        }

        // Upload to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });
        const imageUrl = imageUpload.secure_url;

        const user = await UserModel.findByIdAndUpdate(userId, { image: imageUrl }, { new: true }).select('-password');
        if (!user) {
            return res.json({ success: false, message: 'User not found' })
        }
        res.json({ success: true, user })
    } catch (error) {
        console.error('Something went Wrong', error);
        res.json({ success: false, message: error.message })
    }
}

const DeleteUser = async (req, res) => {
    try {
        const userId = req.params.id || req.body.userId;
        const user = await UserModel.findByIdAndDelete(userId);
        if (!user) {
            return res.json({ success: false, message: 'User not found' })
        }
        res.json({ success: true, message: 'User deleted successfully' })
    } catch (error) {
        console.error('Something went Wrong', error);
        res.json({ success: false, message: error.message })
    }
}

export {
    LoginUser,
    RegisterUser,
    AdminLogin,
    GetUserProfile,
    UpdateUser,
    UploadProfileImage,
    DeleteUser
}
