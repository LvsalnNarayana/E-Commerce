import User from '../models/user_model.js';
import asyncHandler from 'express-async-handler';
import generate_token from '../utils/generate_token.js';
import match_password from '../utils/match_password.js';


//@desc = Authenticate User
//@route = POST /api/users/login
//@access = public
export const Auth_user = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    if (req.session.token) {
        console.log("hello");
    }
    try {
        const user = await User.findOne({ email: email }).lean();
        if (user && (await match_password(password, user.password))) {
            const token = generate_token(user._id);        
            req.session.token = token;
            delete user.password;
            req.session.user = user;
            res.status(200).json({
                user : user
            })
        } else if (user === null) {
            const error = new Error('User not found')
            res.status(401).json({
                message: "User not found",
                status: 401,
                original_err_message: error.message,
                stack: process.env.NODE_ENV === 'production' ? null : error.stack,
            })
        } else if (!(await req.user.match_password(password))) {
            const error = new Error('Email or Password is wrong')
            res.status(401).json({
                message: "Email or Password is wrong",
                status: 401,
                original_err_message: error.message,
                stack: process.env.NODE_ENV === 'production' ? null : error.stack,
            })
        }
    } catch (error) {
        res.status(401).json({
            message: "User not found",
            status: 401,
            original_err_message: error.message,
            stack: process.env.NODE_ENV === 'production' ? null : error.stack,
        })
    }
});


//@desc = Fetch Profile
//@route = POST /api/users/Profile
//@access = Private
export const get_profile = asyncHandler(async (req, res) => {
    if (req.session.is_logged) {
        res.json({ is_logged: req.session.is_logged })
    } else {
        res.json({ is_logged: false })
    }
});

//@desc = Create User
//@route = POST /api/register
//@access = Public
export const register_user = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    const user_exists = await User.findOne({ email: email });
    if (user_exists) {
        res.status(401).json({
            message: "User Exists",
            status: 401,
            original_err_message: error.message,
            stack: process.env.NODE_ENV === 'production' ? null : error.stack,
        })
    }
    let user = await User.create({
        username,
        email,
        password
    });
    if (user) {
        user = await User.findOne({ email: user.email }).select('-password');
        res.status(201).json({
            ...user.toObject(),
            token: generate_token(user._id)
        })
    }
});







