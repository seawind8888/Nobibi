/**
 * Created by haifeng on 17/1/10.
 */

import * as types from '../constants/actionTypes';

const initialState = {};

let loginReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.LOGIN_INITIAL:
            return state;
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                data: action.data
            }
        default:
            return state
    }
}

export default loginReducer;
