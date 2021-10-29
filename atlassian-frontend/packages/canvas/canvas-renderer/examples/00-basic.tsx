import React, { useEffect } from 'react';

import { CanvasBoardRenderer } from '../src';
import { Sticky } from '../src/model/models/Element';

const style = { height: '100vh', width: '100vw' };

export default () => {
  useEffect(() => {
    const renderer = new CanvasBoardRenderer({
      selector: '#app',
      board: {
        elements: {
          'this-is-a-uuid': new Sticky({
            id: 'this-is-a-uuid',
            x: 0,
            y: 0,
            text: "Butter smooth yeets 🚀'",
            zIndex: 0,
          }),
        },
      },
    });

    return renderer.dispose;
  }, []);

  return <canvas id="app" style={style} />;
};
