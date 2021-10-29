export class Viewport {
  public readonly width: number;
  public readonly height: number;

  public constructor(private gl: WebGL2RenderingContext) {
    const canvas = this.gl.canvas as HTMLCanvasElement;
    const devicePixelRatio = window.devicePixelRatio || 1;
    this.width = canvas.clientWidth * devicePixelRatio;
    this.height = canvas.clientHeight * devicePixelRatio;
    canvas.width = this.width;
    canvas.height = this.height;
    this.gl.viewport(0, 0, this.width, this.height);
    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  }
}
