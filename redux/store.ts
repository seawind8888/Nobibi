import { createStore, applyMiddleware, Store } from 'redux';
import createSagaMiddleware, { Task } from 'redux-saga';
import { rootReducer, AppStateType } from './reducers';
import rootSaga from './sagas/index';

const sagaMiddleware = createSagaMiddleware();

export interface RootStore extends Store<AppStateType> {
  sagaTask: Task;
  runSagaTask?: () => void;
}

interface IHotModule {
  hot?: { accept: (path: string, callback: () => void) => void };
}

declare const module: IHotModule;

const bindMiddleware = (middleware) => {
  // add route middleware
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    // development use logger
    // const { logger } = require('redux-logger');
    // middleware.push(logger);
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

function configureStore (initialState) {
  
  const store: RootStore = createStore(
    rootReducer,
    initialState,
    bindMiddleware([sagaMiddleware])
  );


  // store.sagaTask = sagaMiddleware.run(rootSaga);
  store.runSagaTask = () => {
    store.sagaTask = sagaMiddleware.run(rootSaga);
  };

  store.runSagaTask();

  

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () =>
      // eslint-disable-next-line global-require
      store.replaceReducer(require('./reducers').default),
    );
  }


  return store;
}

export default configureStore;
