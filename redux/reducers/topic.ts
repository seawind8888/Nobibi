import {
  FETCH_TOPIC_LIST,
  FETCH_TOPIC_LIST_SUCCESS,
  FETCH_TOPIC_LIST_FAIL
} from '../../constants/ActionTypes';

import { Topic } from '../../@types'
      
      
const initialState = {
  list: [],
  categoryName: '',
  type: '',
  total: 0
};
      
const topic = (state: Topic = initialState, { type, payload = {} }) => {
  switch (type) {
    case FETCH_TOPIC_LIST:
      return initialState;
    case FETCH_TOPIC_LIST_SUCCESS:
      return {
        ...state,
        ...payload
      };
    case FETCH_TOPIC_LIST_FAIL:
      return initialState;
    default:
      return state;
  }
};
      
export default topic;