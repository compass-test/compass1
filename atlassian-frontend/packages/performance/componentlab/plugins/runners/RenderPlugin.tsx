import React from 'react';
import ReactDOM from 'react-dom';
import { RunnerPlugin } from '../../types';

const RenderPlugin: RunnerPlugin = {
  id: 'complete_render',
  name: 'Complete Render',
  async run({
    element,
    container,
  }: {
    element: React.ReactElement<unknown>;
    container: HTMLElement;
  }) {
    ReactDOM.render(element, container);
    await getNextIdle();
  },
};

function getNextIdle() {
  return new Promise((resolve) => {
    // @ts-ignore
    requestIdleCallback(resolve);
  });
}

export default RenderPlugin;
