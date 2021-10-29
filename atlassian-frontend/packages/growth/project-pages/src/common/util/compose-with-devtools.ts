import { compose } from 'redux';
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

// An extended version of redux's 'compose' method, that
// will use redux devtools chrome extension if available
// https://github.com/zalmoxisus/redux-devtools-extension
//
// The 'devtoolsConfig' parameter is an object adhering to the following API:
// https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md
export const composeWithDevtools = (devtoolsConfig = {}) => {
  const devtoolsEnhancer = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  return devtoolsEnhancer ? devtoolsEnhancer(devtoolsConfig) : compose;
};
