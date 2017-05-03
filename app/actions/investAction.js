/**
 * Created by haifeng on 17/2/9.
 */
import * as types from './actionTypes';
import Util from '../common/Common';

export let investFetch = () => {
    let URL = 'http://tz88.com.cn/cmfx/invest/all';
    return dispatch => {
        Util.get(URL, (response) => {
            dispatch(fetchInvestList(response));
        }, (error) => {
            dispatch(fetchInvestError);
            console.log(error)
        })
    }
}

let fetchInvestList = (response) => {
    return {
        type: types.FETCH_INVEST_LIST,
        response
    }
}

let fetchInvestError = () => {
    return {
        type: types.FETCH_INVEST_INIT,
    }
}

