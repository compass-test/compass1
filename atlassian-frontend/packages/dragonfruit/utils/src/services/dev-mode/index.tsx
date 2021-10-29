import React from 'react';

// @ts-ignore
// 'use-global-hook' lets us have a global state shared across our app.
// We don't want to use React context to store dev mode state because it would require more code.
// It would also cause dev mode stuff to pollute unrelated parts of our code. This approach is more self contained.
import globalHook from 'use-global-hook';

import {
  readJsonFromLocalStorage,
  writeToLocalStorage,
} from '../cache/local-storage';

// At build time `process.env.NODE_ENV` will be replaced by a hard-coded string. This string will either be 'development' or 'production'.
// See `services/dragonfruit/webpack.config.js` for how this is configured.
export const isInDevMode = process.env.NODE_ENV === 'development';

let DEV_MODE_LOCAL_STORAGE_KEY = 'compass.dev-mode.state';

type DevModeOptions = {
  showErrorBoundaries: boolean;
};

// defaultState will be used when we're not in dev mode, or when there are no saved settings
const defaultState: DevModeOptions = {
  showErrorBoundaries: false,
};

let initialState: DevModeOptions;

if (!isInDevMode) {
  initialState = defaultState;
} else {
  const savedState = readJsonFromLocalStorage(DEV_MODE_LOCAL_STORAGE_KEY, {});
  initialState = { ...defaultState, ...savedState };
}

const actions = {
  toggleDevModeValue: (store: any, key: keyof DevModeOptions) => {
    const newState = { ...store.state, [key]: !store.state[key] };
    store.setState(newState);
    writeToLocalStorage(DEV_MODE_LOCAL_STORAGE_KEY, newState);
  },
  toggleShowErrorBoundaries: (store: any) => {
    actions.toggleDevModeValue(store, 'showErrorBoundaries');
  },
};

// Create a global hook for dev mode settings. This will be a singleton state shared throughout the app.
export const useDevMode = globalHook(React, initialState, actions);

type DevModeProps = { devMode: any };

// This allows us to use dev mode settings in class components
export const injectDevMode = <P,>(
  Component: React.ComponentType<P & DevModeProps>,
): React.ComponentType<P> => {
  return (props: P) => {
    const devMode = useDevMode();
    return <Component {...props} devMode={devMode} />;
  };
};
