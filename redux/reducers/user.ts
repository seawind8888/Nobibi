import {
  GET_USER_INFO,
  GET_USER_INFO_SUCCESS,
  USER_SIGN_OUT
} from '../../constants/ActionTypes';
import { User } from '../../@types' 


const initialState = {
  _id: '',
  userName: '',
  avatar: '',
  email: '',
  visit: [],
  status: '',
  refUserRoleCode: '',
  createTime: '',
  updateTime: ''
};

const user = (state: User = initialState, { type, payload = {} }) => {
  switch (type) {
    case GET_USER_INFO:
      return state;
    case GET_USER_INFO_SUCCESS:
      return {
        ...payload
      };
    case USER_SIGN_OUT:{
      return {
        ...initialState
      };
    }
    default:
      return state;
  }
   
};

export default user;