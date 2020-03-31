import {
  FETCH_TOPIC_LIST,
  FETCH_TOPIC_LIST_SUCCESS,
  FETCH_TOPIC_LIST_FAIL
} from '../../constants/ActionTypes';
  
  
export const fetchTopiclList = (payload = {}) => ({type: FETCH_TOPIC_LIST, payload});
  
export const fetchTopicListSuccess = (payload) => ({type: FETCH_TOPIC_LIST_SUCCESS, payload});
  
export const fetchTopicListFail = () => ({type: FETCH_TOPIC_LIST_FAIL});