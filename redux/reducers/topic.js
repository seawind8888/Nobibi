import {
  FETCH_TOPIC_LIST,
  FETCH_TOPIC_LIST_SUCCESS,
  FETCH_TOPIC_LIST_FAIL
} from '../../constants/ActionTypes';
    
    
const initialState = {
  list: []
};
    
const topic = (state = initialState, { type, data }) => {
  switch (type) {
    case FETCH_TOPIC_LIST:
    case FETCH_TOPIC_LIST_SUCCESS:
      return {
        ...state,
        ...data
      };
    case FETCH_TOPIC_LIST_FAIL:
      return initialState;
    default:
      return state;
  }
};
    
export default topic;