

import mongoose, { model, Schema } from "mongoose";

const UserSchema = new Schema( {
    name: {
        type:String,
        required:true,
    },
    lastName: {
        type:String,
        default:''
    },
    email : {
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true,
    },
    image: {
        type:String,
        default:''
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    cartData: {
        type:Object, //[Schema.Types.ObjectId] => Product => populate mongoose
        default:{}
    }
},{minimize:false})

const UserModel = mongoose.models.user || model('UserModel', UserSchema)

export default UserModel