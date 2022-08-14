/* eslint-disable default-case */
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAIL
} from '../constatnts/user_constants.js';
export const user_reducer = (state = { user_message: {is_logged :false} }, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {
                loading: true,
                ...state
            }
        case USER_LOGIN_SUCCESS:
            return {
                loading: false,
                user_message: action.payload.data
            }
        case USER_LOGIN_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case FETCH_USER_SUCCESS:
            return {
                user_message: action.payload.data
            }
        case FETCH_USER_FAIL:
            return {
                error: action.payload
            }
        default:
            return state
    }
}