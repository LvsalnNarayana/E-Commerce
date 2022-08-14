//________  require mongoose  ________// 
import mongoose from 'mongoose'

//________  schema  ________// 
const schema = mongoose.Schema;
//________  review schema  ________// 
const review_schema = new schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comments: {
        type: String,
        required: true
    },
}, { timestamps: true });
//________  product schema  ________// 
const product_schema = new schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        default: 0,
    },
    number_reviews: {
        type: Number,
        required: true,
        default: 0,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    count_in_stock: {
        type: Number,
        required: true,
        default: 0,
    },
    reviews: [review_schema]
}, {
    timestamps: true
});

const Product = mongoose.model('Product', product_schema);
export default Product;

