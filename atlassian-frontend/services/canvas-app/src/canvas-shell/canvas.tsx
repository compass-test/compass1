import React, { useEffect } from 'react';
import { CanvasBoardRenderer } from '@atlassian/canvas-renderer';
import { Sticky } from '@atlassian/canvas-renderer/src/model/models/Element';

const Canvas = () => {
  useEffect(() => {
    const renderer = new CanvasBoardRenderer({
      selector: '#canvas',
      board: {
        elements: {
          'test-sticky-id': new Sticky({
            id: 'test-sticky-id',
            x: 0,
            y: 0,
            text: 'Welcome 🚀',
            zIndex: 0,
          }),
        },
      },
    });

    return renderer.dispose;
  }, []);

  return (
    <canvas width={window.innerWidth} height={window.innerHeight} id="canvas" />
  );
};

export default Canvas;
