import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { product_reducer } from './reducers/product_reducers';
import { product_detail_reducer } from './reducers/product_detail_reducer';
import { cart_reducer } from './reducers/cart_reducer';
import { user_reducer } from './reducers/user_reducer';


const reducer = combineReducers({
    products: product_reducer,
    single_product: product_detail_reducer,
    cart: cart_reducer,
    user: user_reducer
});
const initialstate = {};
const middleware = [thunk]
const store = createStore(
    reducer,
    initialstate,
    composeWithDevTools(applyMiddleware(...middleware)));;
export default store;