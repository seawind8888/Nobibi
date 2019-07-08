
import {  all, call, take, put, fork } from 'redux-saga/effects';
import {  getUserInfo, getTopicList, getChannelList } from '../../api';

import {
  FETCH_TOPIC_LIST,
  FETCH_TOPIC_LIST_SUCCESS,
  FETCH_CHANNEL_LIST,
  FETCH_CHANNEL_LIST_SUCCESS,
  GET_USER_INFO,
  GET_USER_INFO_SUCCESS,
  USER_SIGN_OUT
} from '../../constants/ActionTypes';

export function* userInfo() {
  while (true) {
    const { payload = {}} = yield take(GET_USER_INFO);
    const { data } = yield call(getUserInfo, payload);
    yield put({
      type: GET_USER_INFO_SUCCESS,
      data
    });
  }
}

export function* userSignOut() {
  while (true) {
    yield take(USER_SIGN_OUT);
  }
}

export function* topicList() {
  while (true) {
    const { payload = {}} = yield take(FETCH_TOPIC_LIST);
    const { data } = yield call(getTopicList, payload);
    yield put({
      type: FETCH_TOPIC_LIST_SUCCESS,
      data
    });
  }
}

export function* channelList() {
  while (true) {
    const { payload = {}} = yield take(FETCH_CHANNEL_LIST);
    const { data } = yield call(getChannelList, payload);
    yield put({
      type: FETCH_CHANNEL_LIST_SUCCESS,
      data
    });
  }
}


export default function* rootSagas() {
  yield all([
    fork(topicList),
    fork(userInfo),
    fork(userSignOut),
    fork(channelList)
  ]);
}
