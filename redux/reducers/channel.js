import {
  FETCH_CHANNEL_LIST,
  FETCH_CHANNEL_LIST_SUCCESS,
  FETCH_CHANNEL_LIST_FAIL
} from '../../constants/ActionTypes';
      
      
const initialState = {
  list: []
};
      
const channel = (state = initialState, { type, payload = {} }) => {
  switch (type) {
    case FETCH_CHANNEL_LIST:
    case FETCH_CHANNEL_LIST_SUCCESS:
      return {
        ...state,
        list: payload.list
      };
    case FETCH_CHANNEL_LIST_FAIL:
      return initialState;
    default:
      return state;
  }
};
      
export default channel;