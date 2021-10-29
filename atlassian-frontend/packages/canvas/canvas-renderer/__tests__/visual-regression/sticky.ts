import { CanvasRenderer } from '../__utils';
import { Sticky } from '../../src/model/models/Element';

it('canvas-renderer renders single sticky correctly', async () => {
  const renderer = await CanvasRenderer.create();

  await renderer.start({
    board: {
      elements: {
        '1': new Sticky({
          id: '1',
          x: 0,
          y: 0,
          text: '0',
          zIndex: 0,
        }),
      },
    },
  });

  const screenshot = await renderer.screenshot({
    x: 0 - 100 / 2 - 10, // x - width / 2 - 10,
    y: 0 - 100 / 2 - 10, // y - height / 2 - 10,
    width: 100 + 10 * 2, // width + 2 * 10
    height: 100 + 10 * 2, // ehieght + 2 * 10
  });

  expect(screenshot).toMatchProdImageSnapshot();
});
