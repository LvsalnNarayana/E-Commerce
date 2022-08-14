import express from 'express';
import { get_all_products, get_product_by_id } from '../controllers/product_controller.js';
const router = express.Router();

//get all products from database
router.get('/', get_all_products);
//get single product based on id
router.get('/:id', get_product_by_id);
export default router;