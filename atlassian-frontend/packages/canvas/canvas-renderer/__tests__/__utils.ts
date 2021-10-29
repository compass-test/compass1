import { getExampleUrl, loadPage } from '@atlaskit/visual-regression/helper';
import { ScreenshotClip } from 'puppeteer';
import { CanvasBoardRendererOpts, Coordinate } from '../src/types';

/**
 * A page object aiding with best-practice
 * visual regression testing of canvas-renderer
 *
 * @example
 * ```ts
 * const renderer = await CanvasRenderer.create();
 * await renderer.start();
 * await renderer.click(0, 0);
 * ```
 */
export class CanvasRenderer {
  private constructor(public readonly page: typeof global.page) {}

  private async toScreen(world: Coordinate): Promise<Coordinate> {
    return await this.page.evaluate(world => {
      const win = window as any;
      return win.__canvas.toWorld(world);
    }, world as any);
  }

  public static async create(): Promise<CanvasRenderer> {
    const { page, __BASEURL__ } = global;
    const url = getExampleUrl(
      'canvas',
      'canvas-renderer',
      'testing',
      __BASEURL__,
    );

    await loadPage(page, url);

    await page.waitForFunction(() => {
      const win = window as any;
      return win.__canvas;
    });

    return new CanvasRenderer(page);
  }

  /**
   * Start the canvas renderer by mounting it
   */
  public async start(options?: Omit<CanvasBoardRendererOpts, 'selector'>) {
    await this.page.evaluate(options => {
      const win = window as any;
      win.__canvas.start(options);
    }, options as any);
  }

  /**
   * Click on world coordinates at x,y
   * @param x
   * @param y
   */
  public async click(x: number, y: number) {}

  /**
   * Take a screenshot of a bounding box
   * defined in world coordinates
   */
  public async screenshot(
    clip: ScreenshotClip,
  ): Promise<string | void | Buffer> {
    const p0 = await this.toScreen({
      x: clip.x,
      y: clip.y,
    });

    const p3 = await this.toScreen({
      x: clip.x + clip.width,
      y: clip.y + clip.height,
    });

    return await this.page.screenshot({
      clip: {
        x: p0.x,
        y: p0.y,
        width: p3.x - p0.x,
        height: p3.y - p0.y,
      },
    });
  }
}
