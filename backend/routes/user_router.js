import express from 'express';
import { Auth_user, get_profile, register_user } from '../controllers/user_controller.js';
const router = express.Router();

//get user from database
router.post('/login', Auth_user);

//get user profile based on JWT Token
router.get('/profile', get_profile);

//get user profile based on JWT
router.post('/register', register_user);

export default router;
