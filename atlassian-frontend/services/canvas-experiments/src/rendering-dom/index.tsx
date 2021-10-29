import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ExperimentRunOptions } from '../types';

export function dispose(options: ExperimentRunOptions) {
  ReactDOM.unmountComponentAtNode(options.element);
}

export function run(options: ExperimentRunOptions) {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    options.element,
  );
}
