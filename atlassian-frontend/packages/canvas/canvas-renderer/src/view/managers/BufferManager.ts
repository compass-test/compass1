import { Buffer, BufferOpts } from '../primitives/Buffer';

export class BufferManager {
  public constructor(private _gl: WebGL2RenderingContext) {}

  public createBuffer(id: string, opts: BufferOpts) {
    return new Buffer(this._gl, opts);
  }
}
