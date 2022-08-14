import asyncHandler from 'express-async-handler';


//@desc = Fetch Cart
//@route = GET /api/cart
//@access = User
export const get_cart = asyncHandler(async (req, res) => {
    try {
        const cart = await req.user.get_cart();
        res.json({cart:cart})
    } catch (error) {
        res.status(404).json({
            message: "Cart not found",
            status: 404,
            original_err_message: error.message,
            stack: process.env.NODE_ENV === 'production' ? null : error.stack,
        })
    }
});


//@desc = Add product to Cart
//@route = POST /api/Cart
//@access = User
export const post_add_to_cart = asyncHandler(async (req, res) => {
    const prod_id = req.body.id;
    try {
        const wait = await req.user.add_to_cart(prod_id);
        const cart = await req.user.get_cart();
        switch (wait) {
            case 'stock_err':
                req.flash('error', "Out of Stock");
                var flash = req.flash('error')
                res.json({ cart: cart, flash: flash })
                break;
            case 'overlap_err':
                req.flash('error', "Product Already Exists");
                var flash = req.flash('error')
                res.json({ cart: cart, flash: flash })
                break;
            default:
                res.json({cart:cart})
                break;
        }
    } catch (error) {
        res.status(400).json({
            message: "Cart Not Updated..! Bad Request",
            status: 400,
            original_err_message: error.message,
            stack: process.env.NODE_ENV === 'production' ? null : error.stack,
        })
    }
})


//@desc = Update Cart
//@route = POST /api/Cart
//@access = User
export const post_update_cart = asyncHandler(async (req, res) => {
    const prod_id = req.body.id;
    const action = req.body.action;
    try {
        const wait = await req.user.update_cart(prod_id, action);
        const cart = await req.user.get_cart();
        if (wait === 'stock_err') {
            req.flash('error', 'Out of Stock');
        }
        switch (wait) {
            case 'stock_err':
                const flash = req.flash('error')
                res.json({ cart: cart, flash: flash })
                break;
            default:
                res.json({cart:cart})
                break;
        }
    } catch (error) {
        res.status(400).json({
            message: "Cart Not Updated..! Bad Request",
            status: 400,
            original_err_message: error.message,
            stack: process.env.NODE_ENV === 'production' ? null : error.stack,
        })
    }
})


//@desc = Delete Cart product
//@route = POST /api/Cart
//@access = User
export const post_delete_cart = asyncHandler(async (req, res) => {
    const prod_id = req.body.id;
    try {
        await req.user.delete_cart_product(prod_id);
        const cart = await req.user.get_cart();
        res.json({cart:cart})
    } catch (error) {
        res.status(400).json({
            message: "Cart Not Updated..! Bad Request",
            status: 400,
            original_err_message: error.message,
            stack: process.env.NODE_ENV === 'production' ? null : error.stack,
        })
    }
})