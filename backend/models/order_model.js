//________  require mongoose  ________// 
import mongoose from 'mongoose'

//________  schema  ________// 
const schema = mongoose.Schema;

//________  order schema  ________// 
const order_schema = new schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    order_items: [{
        product_name: {
            type: String,
            required: true
        },
        qty: {
            type: Number,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product'
        }
    }],
    shipping_address: {
        address1: { type: String, required: true },
        address2: { type: String, required: true },
        city: { type: String, required: true },
        pincode: { type: String, required: true },
        state: { type: String, required: true },
    },
    payment_method: {
        type: String,
        required: true
    },
    payment_result: {
        id: { type: String },
        status: { type: String },
        update_time: { type: String },
        email: { type: String },
    },
    tax_price: {
        type: Number,
        required: true,
        default: 0.0
    },
    shipping_price: {
        type: Number,
        required: true,
        default: 0.0
    },
    is_paid: {
        type: Boolean,
        required: true,
        default: false
    },
    paid_at: {
        type: Date
    },
    is_delivered: {
        type: Boolean,
        required: true,
        default: false
    },
    delivered_at: {
        type: Date
    }

}, {
    timestamps: true
});

const Order = mongoose.model('Order', order_schema);
export default Order;

