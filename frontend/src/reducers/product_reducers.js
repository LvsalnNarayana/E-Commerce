import {
    GET_ALL_PRODUCTS_REQUEST,
    GET_ALL_PRODUCTS_SUCCESS,
    GET_ALL_PRODUCTS_FAIL,
} from '../constatnts/product_constants.js';
export const product_reducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case GET_ALL_PRODUCTS_REQUEST:
            return {
                loading: true,
                products: []
            }
        case GET_ALL_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload
            }
        case GET_ALL_PRODUCTS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}