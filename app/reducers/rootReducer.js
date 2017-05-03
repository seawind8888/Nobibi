/**
 * Created by haifeng on 17/1/10.
 */
import { combineReducers } from 'redux';

import News from './newsReducer';
import Invest from './investReducer';

const rootReducer = combineReducers({
    News,
    Invest
})

export default rootReducer