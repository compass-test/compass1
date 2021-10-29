import React from 'react';
import ReactDOM from 'react-dom';
import { RunnerPlugin } from '../../types';

const SimpleRenderPlugin: RunnerPlugin = {
  id: 'simple_render',
  name: 'Simple Render',
  async run({
    element,
    container,
  }: {
    element: React.ReactElement<unknown>;
    container: HTMLElement;
  }) {
    ReactDOM.render(element, container);
  },
};

export default SimpleRenderPlugin;
