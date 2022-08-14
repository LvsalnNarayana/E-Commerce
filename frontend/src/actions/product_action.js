import {
    GET_ALL_PRODUCTS_REQUEST,
    GET_ALL_PRODUCTS_SUCCESS,
    GET_ALL_PRODUCTS_FAIL,
} from '../constatnts/product_constants.js';
import axios from 'axios';
export const get_products = () => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_PRODUCTS_REQUEST });
        const { data } = await axios.get('/api/products');
        dispatch({
            type: GET_ALL_PRODUCTS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_ALL_PRODUCTS_FAIL,
            payload: error.response
        })
    }
}
