import {
  GET_USER_INFO,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAIL,
  USER_SIGN_OUT
} from '../../constants/ActionTypes';


export const getUserInfo = (payload = {}) => ({type: GET_USER_INFO, payload});

export const getUserInfoSuccess = (payload) => ({type: GET_USER_INFO_SUCCESS, payload});

export const getUserInfoFail = () => ({type: GET_USER_INFO_FAIL});

export const userSignOut = () => ({type: USER_SIGN_OUT});