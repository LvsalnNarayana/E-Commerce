import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAIL
} from '../constatnts/user_constants.js';
import axios from 'axios';
export const login_user = ({ email, password }) => async (dispatch) => {
    const user_details = { email, password }
    try {
        dispatch({ type: USER_LOGIN_REQUEST });
        const { data } = await axios.post(`/api/users/login`,user_details);
        console.log(data);
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: {
                data: data
            }
        })
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response
        })
    }
}
export const fetch_user = () => async (dispatch) => {
    try {
        const { data } = await axios.get(`/api/users/profile`);
        dispatch({
            type: FETCH_USER_SUCCESS,
            payload: {
                data: data
            }
        })
    } catch (error) {
        dispatch({
            type: FETCH_USER_FAIL,
            payload: error.response
        })
    }
}