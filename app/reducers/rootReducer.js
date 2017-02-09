/**
 * Created by haifeng on 17/1/10.
 */
import { combineReducers } from 'redux';

import News from './newsReducer';

const rootReducer = combineReducers({
    News
})

export default rootReducer