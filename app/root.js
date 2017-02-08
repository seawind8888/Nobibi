/**
 * Created by haifeng on 17/2/7.
 */
import React, {Component} from 'react';
import { Provider } from 'react-redux';
import store from './store/configureStore';

import App from './main/App';

class rootApp extends Component {
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        )
    }
}

export default rootApp