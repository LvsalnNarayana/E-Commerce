export const set_error = (req, res, next) => {
    const error = new Error('Error');
    error.status = 404;
    next(error)
}
export const error_message = (err, req, res, next) => {
    const status = err.status || 500;
    const error = new Error(`${err.message}`)
    res.status(status).json({
        status: status,
        message: status == 404 ? 'Oops ! Not Found' : 'Internal Server Error',
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
}
