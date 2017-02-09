/**
 * Created by haifeng on 17/1/9.
 */

import {createStore, applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';


const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
let store = createStoreWithMiddleware(rootReducer);
export default store;

// const enhancer = compose(
//     //你要使用的中间件，放在前面
//     applyMiddleware(thunk),
//     //必须的！启用带有monitors（监视显示）的DevTools
//     DevTools.instrument()
// )
//
// export default function createStoreWithMiddleware(initialState){
//     //注意：仅仅只有redux>=3.1.0支持第三个参数
//     const store = createStore(rootReducer,initialState,enhancer)
//     return store
// }