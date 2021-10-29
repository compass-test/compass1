import React, { useEffect } from 'react';
import { CanvasBoardRendererOpts, Coordinate } from '../src/types';
import { CanvasBoardRenderer } from '../src';

class CanvasTestRenderer {
  private renderer?: CanvasBoardRenderer;

  start(options: Omit<CanvasBoardRendererOpts, 'selector'>) {
    this.renderer = new CanvasBoardRenderer({
      ...options,
      selector: '#app',
    });
  }

  toWorld(screen: Coordinate) {
    const { x, y } = this.renderer!.camera.toScreenPosition(screen.x, screen.y);
    return { x, y };
  }

  toScreen(world: Coordinate) {
    const { x, y } = this.renderer!.camera.toWorldPosition(world.x, world.y);
    return { x, y };
  }

  dispose() {
    this.renderer?.dispose();
  }
}

const style = { height: '100vh', width: '100vw' };

export default () => {
  useEffect(() => {
    const win = window as any;
    win.__canvas = new CanvasTestRenderer();

    try {
      const parent = win.parent as any;
      parent.__canvas = win.__canvas;
      console.log(parent);
    } catch (err) {
      console.error(`Could not __canvas on parent frame`, err);
    }

    return () => {
      win.__canvas?.dispose();
      delete win.__canvas;

      try {
        const parent = win.parent as any;
        delete parent.__canvas;
      } catch (err) {
        // ¯\_(ツ)_/¯
      }
    };
  }, []);

  return <canvas id="app" style={style} />;
};
