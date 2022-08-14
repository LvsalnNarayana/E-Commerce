import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './users.js';
import products from './products.js';
import User from './models/user_model.js';
import Product from './models/product_model.js';
import Order from './models/order_model.js';
import conectDB from './config/config.js';

dotenv.config();
conectDB();

const importdata = async () => {
    try {
        await Order.deleteMany();
        await User.deleteMany();
        await Product.deleteMany();
        const created_users = await User.insertMany(users);
        const admin_user = created_users[0]._id
        const sample_products = products.map((product) => {
            return { ...product, user: admin_user }
        });
        await Product.insertMany(sample_products);
        process.exit()
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}
const deletedata = async () => {
    try {
        await Order.deleteMany();
        await User.deleteMany();
        await Product.deleteMany();
        process.exit()
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}
const deletecart = async () => {
    const cart = {
        items: [],
        total: 0
    }
    try {
        await User.findOneAndUpdate({ is_admin: true }, {cart})
        process.exit()
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}
// if (process.argv[2] === '-d') {
//     deletedata();
// } else {
//     importdata();
// }
switch (process.argv[2]) {
    case '-d':
        deletedata();
        break;
    case '-c':
        deletecart();
        break;
    default:
        importdata();
        break;
}