import asyncHandler from 'express-async-handler';

export const is_logged = asyncHandler(async (req, res, next) => {
    if (req.session.is_logged === true) {
        next()
    } else if (!req.session.is_logged) {
        const error = new Error('Log in to continue')
        res.status(401).json({
            message: "Log in to continue",
            status: 401,
            original_err_message: error.message,
            stack: process.env.NODE_ENV === 'production' ? null : error.stack,
        })
    }
    else {
        res.status(401).json({
            message: "Session Expired",
            status: 401,
            original_err_message: error.message,
            stack: process.env.NODE_ENV === 'production' ? null : error.stack,
        })
    }
});
