import {
  GET_USER_INFO,
  GET_USER_INFO_SUCCESS,
  USER_SIGN_OUT
} from '../../constants/ActionTypes';

const initialState = {
  userInfo: {}
};

const user = (state = initialState, { type, data = {} }) => {
  switch (type) {
    case GET_USER_INFO:
    case GET_USER_INFO_SUCCESS:
      return {
        ...state,
        userInfo: data
      };
    case USER_SIGN_OUT:{
      return {
        ...state,
        userInfo: {}
      };
    }
    default:
      return state;
  }
   
};

export default user;