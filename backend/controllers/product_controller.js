import Product from '../models/product_model.js';
import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';

//@desc = Fetch All Products
//@route = GET /api/products
//@access = public
export const get_all_products = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products)
    } catch (error) {
        const error2 = new Error("not found")
        res.status(404).json({
            message: "Products not found",
            status: 404,
            original_err_message: error.message,
            stack: process.env.NODE_ENV === 'production' ? null : error.stack,
        })
    }
});
//@desc = Fetch Product by ID
//@route = GET /api/products/:id
//@access = public
export const get_product_by_id = asyncHandler(async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (req.user != null || req.user != undefined) {
            const product_exist = req.user.cart.items.some((data) => {
                return data.product_id.toString() === req.params.id.toString()
            });
            if (product_exist === true) {
                res.json({ product: product, add_to_cart: 'disable' })
            } else {
                res.json({ product: product, add_to_cart: 'enable' })
            }
        } else {
            res.json({ product: product, add_to_cart: null })
        }

    } catch (error) {
        const error2 = new Error("not found")
        res.status(404).json({
            message: "No Product not found",
            status: 404,
            original_err_message: error.message,
            stack: process.env.NODE_ENV === 'production' ? null : error.stack,
        })
    }
})