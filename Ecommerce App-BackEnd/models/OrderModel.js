import mongoose, { model, Schema } from 'mongoose'

const OrderSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    items: {
        type: Array,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    address: {
        type: Object,
        required: true
    },
    wilaya: {
        type: Object,
        required: function() {
            return this.paymentMethod === 'delivery company';
        }
    },
    city : {
        type:String,
        required:true
    },
    status: {
        type: String,
        required: true,
        default: 'Order Placed'
    },
    paymentMethod: {
        type: String,
        required: true
    },
    payment: {
        type: Boolean,
        required: true,
        default: false
    },
    date: {
        type: Number,
        required: true
    }

})


const OrderModel = mongoose.models.order || model('OrderModel', OrderSchema)


export default OrderModel