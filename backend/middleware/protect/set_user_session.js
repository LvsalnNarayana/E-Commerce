import Jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../../models/user_model.js';

export const protect = asyncHandler(async (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const user_id = Jwt.verify(token, process.env.JWT_SECRET);
            req.session.is_logged = true;
            req.session.user_id = user_id.id;
            res.status(200).json({
                message: "user logged in",
                status: 200
            })
            // next()
        } catch (error) {
            res.status(401).json({
                message: "Not Authorized ! Token Failed",
                status: 401,
                original_err_message: error.message,
                stack: process.env.NODE_ENV === 'production' ? null : error.stack,
            })
        }
    } else {
        next()
    }
});
