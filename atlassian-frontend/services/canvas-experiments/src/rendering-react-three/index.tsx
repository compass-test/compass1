import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { patchThree } from './util/patch';
import { ExperimentRunOptions } from '../types';

export function dispose(options: ExperimentRunOptions) {
  ReactDOM.unmountComponentAtNode(options.element);
}

export function run(options: ExperimentRunOptions) {
  // For any performance optimisations done on top of THREE.
  patchThree();

  const paramsSearch = new URLSearchParams(window.location.search);

  const isEnabled = (paramKey: string) => paramsSearch.get(paramKey) === '1';
  // NOTE: recommended config currently is ?useConcurrentMode=1&useGesture=1,
  // but some drag-and-drop features will break when zooming out.
  const config = {
    // For enabling React 18 features.
    useConcurrentMode: isEnabled('useConcurrentMode'),
    // For enabling use of `react-use-gesture`, vs. hand-rolled drag-and-drop implementation.
    useGesture: isEnabled('useGesture'),
    // For tweaking the number of stickies rendered on screen.
    totalStickies: parseInt(paramsSearch.get('totalStickies') ?? '10000'),
  };

  const root = options.element;

  if (root && config.useConcurrentMode) {
    // @ts-ignore
    const reactRoot = ReactDOM.createRoot(root);
    reactRoot.render(<App {...config} />);
  } else {
    ReactDOM.render(<App {...config} />, root);
  }
}
