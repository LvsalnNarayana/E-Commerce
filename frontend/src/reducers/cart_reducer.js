import {
    GET_CART_REQUEST,
    GET_CART_SUCCESS,
    GET_CART_FAIL,
    POST_CART_SUCCESS,
    POST_CART_FAIL,
    UPDATE_CART_SUCCESS,
    UPDATE_CART_FAIL,
    DELETE_CART_SUCCESS,
    DELETE_CART_FAIL,
} from '../constatnts/cart_constants.js';
export const cart_reducer = (state = { cart: { items: [], total: 0 } }, action) => {
    switch (action.type) {
        case GET_CART_REQUEST:
            return {
                loading: true,
                cart: {
                    items: [],
                    total: 0
                }
            }
        case GET_CART_SUCCESS:
            return {
                loading: false,
                cart: {
                    items: action.payload.data.items,
                    total: action.payload.data.total
                }
            }
        case GET_CART_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case POST_CART_SUCCESS:
            return {
                loading: false,
                cart: {
                    items: action.payload.data.items,
                    total: action.payload.data.total
                },
                flash: action.payload.flash,
                status:action.payload.status
            }
        case POST_CART_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case UPDATE_CART_SUCCESS:
            return {
                loading: false,
                cart: {
                    items: action.payload.data.items,
                    total: action.payload.data.total
                },
                flash: action.payload.flash
            }
        case UPDATE_CART_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case DELETE_CART_SUCCESS:
            return {
                loading: false,
                cart: {
                    items: action.payload.data.items,
                    total: action.payload.data.total
                }
            }
        case DELETE_CART_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}