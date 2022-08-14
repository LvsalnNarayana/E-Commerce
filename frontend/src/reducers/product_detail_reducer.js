import {
    GET_PRODUCT_DETAIL_REQUEST,
    GET_PRODUCT_DETAIL_SUCCESS,
    GET_PRODUCT_DETAIL_FAIL
} from '../constatnts/product_constants.js';
export const product_detail_reducer = (state = { product: { reviews: [] } }, action) => {
    switch (action.type) {
        case GET_PRODUCT_DETAIL_REQUEST:
            return {
                loading: true,
                product: {}
            }
        case GET_PRODUCT_DETAIL_SUCCESS:
            return {
                loading: false,
                product: action.payload.data,
                add_to_cart: action.payload.add_to_cart
            }
        case GET_PRODUCT_DETAIL_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}