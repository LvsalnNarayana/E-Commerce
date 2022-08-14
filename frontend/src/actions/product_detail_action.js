import {
    GET_PRODUCT_DETAIL_REQUEST,
    GET_PRODUCT_DETAIL_SUCCESS,
    GET_PRODUCT_DETAIL_FAIL
} from '../constatnts/product_constants.js';
import axios from 'axios';
export const get_product_detail = (id) => async (dispatch) => {
    try {
        dispatch({ type: GET_PRODUCT_DETAIL_REQUEST });
        const product_detail_response = await axios.get(`/api/products/${id}`);
        dispatch({
            type: GET_PRODUCT_DETAIL_SUCCESS,
            payload: { 
                data: product_detail_response.data.product,
                add_to_cart : product_detail_response.data.add_to_cart
            }
        })
    } catch (error) {
        dispatch({
            type: GET_PRODUCT_DETAIL_FAIL,
            payload: error.response
        })
    }
}
