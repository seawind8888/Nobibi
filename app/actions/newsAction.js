/**
 * Created by haifeng on 17/2/9.
 */
import * as types from './actionTypes';
import Util from '../common/Common';

export let newsFetch = () => {
    let URL = 'http://tz88.com.cn/cmfx/posts/all';
    return dispatch => {
        Util.get(URL, (response) => {
            dispatch(fetchNewsList(response));
        }, (error) => {
            dispatch(fetchNewsError());
            console.log(error)
        })
    }
}

let fetchNewsList = (response) => {
    return {
        type: types.FETCH_NEWS_LIST,
        response
    }
}

let fetchNewsError = () => {
    return {
        type: types.FETCH_NEWS_INIT,
    }
}

