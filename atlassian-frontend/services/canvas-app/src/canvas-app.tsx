import React from 'react';
import ReactDOM from 'react-dom';
import './reset.css';

import { CanvasShell } from './canvas-shell';
import Canvas from './canvas-shell/canvas';

const $app = document.querySelector('#app');
ReactDOM.render(
  <CanvasShell>
    <Canvas />
  </CanvasShell>,
  $app,
);
