import Product from './product_model.js';
//________  require mongoose  ________// 
import mongoose from 'mongoose'

//________  require bcerypt  ________// 
import bcrypt from 'bcrypt'

//________  schema  ________// 
const schema = mongoose.Schema;

//________  user schema  ________// 
const user_schema = new schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    is_admin: {
        type: Boolean,
        default: false
    },
    cart: {
        items: [
            {
                product_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: 'Product'
                },
                quantity: {
                    type: Number,
                    required: true,
                    default: 0
                }
            }
        ],
        total: {
            type: Number,
            required: true,
            default: 0
        }
    }
}, {
    timestamps: true
});

//=============================================
//______________  match password  _____________
//=============================================
user_schema.methods.match_password = async function (entered_password) {
    return await bcrypt.compare(entered_password, this.password)
}
//=============================================
//______________  match password  _____________
//=============================================
user_schema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})
//=============================================
//_________________  get cart  ________________
//=============================================
user_schema.methods.get_cart = async function () {
    const cart_product_ids = this.cart.items.map(item => {
        return item.product_id;
    });
    let cart_products = [];
    let cart = { ...this.cart };
    try {
        const products = await Product.find({ _id: { $in: cart_product_ids } });
        products.forEach(product => {
            cart_products.push({
                product,
                quantity: this.cart.items.find(i => {
                    return i.product_id.toString() == product._id.toString();
                }).quantity
            });
        });
        cart = {
            items: cart_products,
            total: this.cart.total
        };
        return cart;
    } catch (err) {
        res.status(404).json({
            message: "Cart not found",
            status: 404,
            original_err_message: error.message,
            stack: process.env.NODE_ENV === 'production' ? null : error.stack,
        })
    }
}

//=============================================
//_______________  Add to cart  _______________
//=============================================
user_schema.methods.add_to_cart = async function (product_id) {
    const cart_product_index = this.cart.items.findIndex(cart_product => {
        return cart_product.product_id.toString() == product_id.toString();
    });
    let new_quantity = 1;
    let updated_cart = { ...this.cart }
    let updated_cart_items = [...this.cart.items];
    let total = this.cart.total;
    try {
        const product = await Product.findById(product_id);
        if (cart_product_index >= 0) {
            if (product.count_in_stock > this.cart.items[cart_product_index].quantity) {
                return "overlap_err"
                // new_quantity = this.cart.items[cart_product_index].quantity + 1;
                // updated_cart.items[cart_product_index].quantity = new_quantity;
                // total = total + product.price;
            } else {
                return "stock_err"
            }
        } else {
            updated_cart_items.push({
                product_id: product_id,
                quantity: new_quantity
            });
            total = total + product.price;
        }
        updated_cart = {
            items: updated_cart_items,
            total: total
        };
        this.cart = updated_cart;
        return this.save();
    } catch (err) {
        return err
    }

}

//=============================================
//_______________  Update cart  _______________
//=============================================
user_schema.methods.update_cart = async function (prod_id, action) {
    const cart_product_index = this.cart.items.findIndex(cart_product => {
        return cart_product.product_id.toString() == prod_id.toString();
    });
    let new_quantity = 1;
    let updated_cart = { ...this.cart }
    let updated_cart_items = [...this.cart.items];
    let total = this.cart.total;
    try {
        const product = await Product.findById(prod_id);
        if (action == "increase") {
            if (product.count_in_stock > this.cart.items[cart_product_index].quantity) {
                new_quantity = this.cart.items[cart_product_index].quantity + 1;
                updated_cart.items[cart_product_index].quantity = new_quantity;
                total = total + product.price;
            } else {
                return "stock_err"
            }
        } else if (action == "decrease") {
            if (updated_cart.items[cart_product_index].quantity == 1) {
                updated_cart_items.splice(cart_product_index, 1);
                total = total - product.price;
            } else {
                new_quantity = this.cart.items[cart_product_index].quantity - 1;
                updated_cart.items[cart_product_index].quantity = new_quantity;
                total = total - product.price;
            }
        }
        updated_cart = {
            items: updated_cart_items,
            total: total
        };
        this.cart = updated_cart;
        return this.save();
    } catch (err) {
        return err
    }
}
//=============================================
//___________  Delete cart product  ___________
//=============================================
user_schema.methods.delete_cart_product = async function (prod_id) {
    const cart_product_index = this.cart.items.findIndex(cart_product => {
        return cart_product.product_id.toString() == prod_id.toString();
    });
    let updated_cart = { ...this.cart }
    const updated_cart_items = [...this.cart.items];
    let total = this.cart.total;
    try {
        const product = await Product.findById(prod_id);
        updated_cart_items.splice(cart_product_index, 1);
        total = total - (product.price * updated_cart.items[cart_product_index].quantity);
        updated_cart = {
            items: updated_cart_items,
            total: total
        };
        this.cart = updated_cart;
        return this.save();
    } catch (err) {
        return err
    }
}
const User = mongoose.model('user', user_schema);

export default User;

