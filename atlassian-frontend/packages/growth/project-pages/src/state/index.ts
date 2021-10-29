import { applyMiddleware, createStore as reduxCreateStore, Store } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import { composeWithDevtools } from '../common/util/compose-with-devtools';

import rootEpic from './epics';
import rootReducer from './reducer';
import { State } from './types';

export const createStore = (
  initialState: any = undefined,
  middlewares: any = [],
): Store<State> => {
  const store = reduxCreateStore(
    rootReducer,
    initialState,
    composeWithDevtools({ name: 'Project Pages' })(
      applyMiddleware(...middlewares, createEpicMiddleware(rootEpic)),
    ),
  );

  return store;
};
