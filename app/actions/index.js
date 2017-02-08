/**
 * Created by haifeng on 17/1/10.
 */

import {HOST, LOGIN_ACTION, LOGIN_SUCCESS}  from '../constants/actionTypes';
import {toastShort} from '../common/ToastUtil';
import FetchHttpClient, {form, header} from 'fetch-http-client';
const client = new FetchHttpClient(HOST);

export let userLogin = (username, password) => {
    return dispatch => {
        client.addMiddleware(form());
        client.post(LOGIN_ACTION, {
            form: {
                user_login: username,
                user_pass: password,
            },
        }).then(response => {
            return response.json();
        }).then((result)=> {
            if (result.status === 'success') {
                //登录成功..
                dispatch(loginSuccess(result.data));
                toastShort(result.msg);
            } else {
                toastShort(result.msg);
            }
        }).catch((error) => {
            toastShort('网络发生错误,请重试!')
        });
    }
}

let loginSuccess = (userInfo) => {
    return {
        type: LOGIN_SUCCESS,
        userInfo
    }
}