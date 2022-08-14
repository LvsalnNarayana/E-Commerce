import express from 'express';
import cors from 'cors';
// import products from './products.js';
import dotenv from 'dotenv';
import conectDB from './config/config.js';
import product_routes from './routes/product_router.js';
import user_routes from './routes/user_router.js';
import cart_routes from './routes/cart_router.js';
import bodyparser from 'body-parser';
import { set_error, error_message } from './middleware/errors/errors.js';
import User from './models/user_model.js'
import session from 'express-session';
import { default as connectMongoDBSession } from 'connect-mongodb-session';
import { is_logged } from './middleware/Auth/auth_middleware.js';
import flash from 'connect-flash';

dotenv.config();
conectDB();

const app = express();
app.use(cors());
app.use(bodyparser.json());
const MongoDBStore = connectMongoDBSession(session);

const store = new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collection: 'sessions',
});
//user middleware
//*user middleware*//
app.use(session({
    cookie: {
        secure: false,
        maxAge: 1000000
    },
    secret: process.env.JWT_SECRET,
    saveUninitialized: false,
    resave: false,
    store: store,
}));
app.use(flash());
app.use((req, res, next) => {
    // let user_id = { id: null }
    if (req.session.user) {
        // user_id = Jwt.verify(req.session.token, process.env.JWT_SECRET);
        // User.findById(user_id.id).then(user => {
        //     req.user = user;
        //     req.session.is_logged = true;
        //     next();
        // })
        //     .catch(err => {
        //         console.log(err);
        //     })
        req.user = req.session.user;
    } else {
        next()
    }

});

//routes
app.get('/', (req, res) => {
    res.send('server is running');
});

//User
app.use('/api/users', user_routes);

//products
app.use('/api/products', product_routes);

//cart
app.use('/api/cart', is_logged, cart_routes);


//error
app.get('*', set_error);
app.use(error_message);

const port = process.env.PORT || 5002
app.listen(port, console.log(`server connected to ${port}`))