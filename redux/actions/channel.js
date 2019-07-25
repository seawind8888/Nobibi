import {
  FETCH_CHANNEL_LIST,
  FETCH_CHANNEL_LIST_SUCCESS,
  FETCH_CHANNEL_LIST_FAIL
} from '../../constants/ActionTypes';


export const fetchChannelList = () => ({type: FETCH_CHANNEL_LIST});

export const fetchChannelListSuccess = (payload) => ({type: FETCH_CHANNEL_LIST_SUCCESS, payload});

export const fetchChannelListFail = () => ({type: FETCH_CHANNEL_LIST_FAIL});