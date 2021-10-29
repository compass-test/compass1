import { Buffer, BufferLoadOpts } from './Buffer';

export interface VertexArrayOpts {
  buffers: Map<string, Buffer>;
  instanceCount: number;
  vertexCount: number;
}

export class VertexArray {
  private _vertexArray: WebGLVertexArrayObject;
  private buffers: Map<string, Buffer>;
  instanceCount: number;
  vertexCount: number;

  constructor(
    private gl: WebGL2RenderingContext,
    { buffers, vertexCount, instanceCount }: VertexArrayOpts,
  ) {
    const vertexArray = this.gl.createVertexArray();

    if (!vertexArray) {
      throw new Error('Unable to initialize vertex');
    }

    this._vertexArray = vertexArray;
    this.instanceCount = instanceCount;
    this.vertexCount = vertexCount;
    this.buffers = buffers;

    this.gl.bindVertexArray(this._vertexArray);

    for (const [, buffer] of buffers) {
      buffer.bind();
    }

    this.gl.bindVertexArray(null);
  }

  public update(name: string, opts: BufferLoadOpts) {
    const buffer = this.getBuffer(name);
    buffer.update(opts);
    this.instanceCount = buffer.count;
  }

  bind() {
    this.gl.bindVertexArray(this._vertexArray);
  }

  getBuffer(name: string): Buffer {
    return this.buffers.get(name)!;
  }

  attachBuffer(buffer: Buffer): void {
    // TODO: unbork this
    this.instanceCount = buffer.count;
  }
}
