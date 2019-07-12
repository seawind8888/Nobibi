import fetch from '../utils/fetch';

export const userLogin = (params) => {
  return fetch({
    method: 'post',
    url: '/api/user/login',
    data: params
  });
};
export const userLogOut = () => {
  return fetch({
    method: 'get',
    url: '/api/user/logout'
  });
};

export const userRegister = (params) => {
  return fetch({
    method: 'post',
    url: '/api/user/createUser',
    data: params
  });
};
export const changePassApi = (params) => {
  return fetch({
    method: 'post',
    url: '/api/user/changePass',
    data: params
  });
};
export const modifyUserApi = (params) => {
  return fetch({
    method: 'patch',
    url: '/api/user/updateUser',
    data: params
  });
};

export const getUserInfo = (params) => {
  return fetch({
    method: 'get',
    url: '/api/user/getUserInfo',
    params: params
  });
};

export const getTopicList = (params) => {
  return fetch({
    method: 'get',
    url: '/api/topic/getTopicList',
    params: params
  });
};
export const updateTopicItem = (params) => {
  return fetch({
    method: 'get',
    url: '/topic/updateTopic',
    params: params
  });
};

export const createTopic = (params) => {
  return fetch({
    method: 'post',
    url: '/api/topic/createTopic',
    data: params
  });
};

export const getChannelList = (params) => {
  return fetch({
    method: 'get',
    url: '/api/category/getCategoryList',
    params: params
  });
};

export const getCommentList = (params) => {
  return fetch({
    method: 'get',
    url: '/api/comment/getCommentList',
    params: params
  });
};

export const addComment = (params) => {
  return fetch({
    method: 'post',
    url: '/api/comment/addComment',
    data: params
  });
};

export const actionPraise = (params) => {
  return fetch({
    method: 'post',
    url: '/api/praise/praiseAction',
    data: params
  });
};

export const getPraiseInfo = (params) => {
  return fetch({
    method: 'get',
    url: '/api/praise/getPraiseInfo',
    params: params
  });
};
