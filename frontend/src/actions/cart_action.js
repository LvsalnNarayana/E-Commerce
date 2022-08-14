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
import axios from 'axios';
export const get_cart = () => async (dispatch) => {
    try {
        dispatch({ type: GET_CART_REQUEST });
        const { data } = await axios.get('/api/cart');
        dispatch({
            type: GET_CART_SUCCESS,
            payload: {
                data: data.cart
            }
        })
    } catch (error) {
        dispatch({
            type: GET_CART_FAIL,
            payload: error.response
        })
    }
}
export const post_add_to_cart = (product_id) => async (dispatch) => {
    const add_to_cart_body = {
        "id": product_id
    }
    try {
        const { data, status } = await axios.post('/api/cart', add_to_cart_body);
        dispatch({
            type: POST_CART_SUCCESS,
            payload: {
                data: data.cart,
                flash: data.flash,
                status:status
            }
        })
    } catch (error) {
        dispatch({
            type: POST_CART_FAIL,
            payload: error.response
        })
    }
}
export const post_update_cart = (product_id, cart_action) => async (dispatch) => {
    const update_cart_body = {
        "id": product_id,
        "action": cart_action
    }
    try {
        const { data } = await axios.post('/api/cart/update_cart', update_cart_body);
        const cart = data.cart
        const flash = data.flash
        dispatch({
            type: UPDATE_CART_SUCCESS,
            payload: {
                data: cart,
                flash: flash
            }
        })
    } catch (error) {
        dispatch({
            type: UPDATE_CART_FAIL,
            payload: error.response
        })
    }
}
export const post_delete_cart = (product_id) => async (dispatch) => {
    const delete_cart_body = {
        "id": product_id
    }
    try {
        const { data } = await axios.post('/api/cart/delete_cart', delete_cart_body);
        dispatch({
            type: DELETE_CART_SUCCESS,
            payload: {
                data: data,
            }
        })
    } catch (error) {
        dispatch({
            type: DELETE_CART_FAIL,
            payload: error.response
        })
    }
}