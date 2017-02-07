/**
 * Created by haifeng on 17/1/10.
 */

import * as types from '../constants/actionTypes';

// const initialState = {
//     isStar: false
// };

let starReducer = (state = [], action) => {

    switch (action.type) {
        case types.INIT_ITEM:
            for (let i = 0; i < action.listLength; i++) {
                state.push({isStar: false})
            }
            return state;
        case types.STAR_ITEM:
            state.map((item, index) => {
                if (index == action.index) {
                    item.isStar = !item.isStar;
                    return [...state]
                }
                return [...state]
            });
            return [...state];
        default:
            return state
    }
}

export default starReducer;
