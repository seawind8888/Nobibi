/**
 * Created by haifeng on 17/1/10.
 */

import * as types from '../constants/actionTypes';
import Util from '../common/utils';

export function itemInit(listLength) {
    return {
        type: types.INIT_ITEM,
        listLength
    }
}

export function starItem(index) {
    return {
        type: types.STAR_ITEM,
        index
    }
}

export function collectionItem() {
    return {
        type: types.COLLECTION_ITEM
    }
}

export function fetchNewsList() {
    let URL = 'http://tz88.com.cn/cmfx/posts/all';

    return dispatch => {
        dispatch(NewsInit());

        Util.get(URL, (response) => {
            dispatch(NewsFetch(response));
        }, (error) => {alert(error)
            console.log(`Fetch food info error: ${error}`);
            dispatch(NewsFetch([]))
        })
    }
}



function NewsInit() {
    return {
        type:types.INIT_LIST
    }
}
function NewsFetch(news) {
    return {
        type:types.LOAD_LIST,
        news
    }
}