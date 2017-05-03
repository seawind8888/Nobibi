/**
 * Created by haifeng on 17/1/10.
 */

import * as types from '../actions/actionTypes';

const initialState = {
    isLoading:true,
    investList:[]
};

let InvestReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.FETCH_INVEST_INIT:
            return state;
        case types.FETCH_INVEST_LIST:
            return {
                ...state,
                isLoading: false,
                investList: action.response.data
            }
        default:
            return state
    }
}

export default InvestReducer;
