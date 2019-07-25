
import {  all, call,  put, select, takeLatest } from 'redux-saga/effects';
import {  getUserInfo, getChannelList, getTopicList, getFavoriteTopic } from '../../api';
import { 
  getUserInfoSuccess,
  getUserInfoFail,
  userSignOut
} from '../actions/user';
import { 
  fetchChannelListSuccess,
  fetchChannelListFail
} from '../actions/channel';
import { 
  fetchTopicListSuccess,
  fetchTopicListFail
} from '../actions/topic';

import {
  GET_USER_INFO,
  USER_SIGN_OUT,
  FETCH_CHANNEL_LIST,
  FETCH_TOPIC_LIST
} from '../../constants/ActionTypes';
import { selectUserInfo } from '../reducers/selectors';



export function* userInfo() {
  try {
    const { data } = yield call(getUserInfo);
    yield put(getUserInfoSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(getUserInfoFail(error));
  }
}

export function* channelList() {
  try {
    const { data } = yield call(getChannelList);
    yield put(fetchChannelListSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(fetchChannelListFail());
  }
}

export function* topicList(action) {
  try {
    const { getMyTopic = false, favorite = false, categoryName = '', page = 1 } = action.payload;
    const requestUrl = favorite ? getFavoriteTopic : getTopicList;
    let params = {
      categoryName,
      page
    };
    if (getMyTopic || favorite) {
      const {userName} = yield select(selectUserInfo);
      params.userName =  userName;
    }
    const { data } = yield call(requestUrl, params);
    yield put(fetchTopicListSuccess({
      ...data,
      page,
      categoryName}));
  } catch (error) {
    console.log(error);
    yield put(fetchTopicListFail());
  }
}

export function* signOut() {
  yield put(userSignOut());
}


export default function* rootSagas() {
  yield all([
    takeLatest(FETCH_TOPIC_LIST, topicList),
    takeLatest(GET_USER_INFO, userInfo),
    takeLatest(USER_SIGN_OUT, signOut),
    takeLatest(FETCH_CHANNEL_LIST, channelList)
  ]);
}
