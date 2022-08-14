import express from 'express';
import {
    get_cart,
    post_add_to_cart,
    post_update_cart,
    post_delete_cart
} from '../controllers/cart_controller.js';
const router = express.Router();

//get all products from user cart
router.get('/', get_cart);

//add product to cart by POST method
router.post('/', post_add_to_cart);

//Update cart by POST method
router.post('/update_cart', post_update_cart);

//Delete cart product by POST method
router.post('/delete_cart', post_delete_cart);

export default router;