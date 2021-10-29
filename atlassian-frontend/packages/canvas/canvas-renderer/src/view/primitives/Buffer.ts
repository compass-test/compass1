export type BufferType =
  | WebGL2RenderingContext['STATIC_DRAW']
  | WebGL2RenderingContext['DYNAMIC_DRAW'];

export interface BufferOpts {
  id: string;
  value: Float32Array;
  location: number;
  size: number;
  hint: BufferType;
  type: WebGL2RenderingContext['FLOAT'];
  normalize?: boolean;
  stride?: number;
  offset?: number;
  instanced?: boolean;
}

export interface BufferLoadOpts {
  value: Float32Array;
}

export interface BufferPatchOpts {
  startAt: number;
  value: Float32Array;
}

export class BufferError extends Error {
  public constructor(message?: string) {
    super();
    this.message = message || 'Buffer failed to be created.';
  }
}

export class Buffer {
  private gl: WebGL2RenderingContext;

  public readonly instanced: boolean;
  private value: Float32Array;
  private readonly location: number;
  private readonly size: number;
  private readonly hint: BufferType;
  private readonly type: WebGL2RenderingContext['FLOAT'];
  private readonly normalize: boolean;
  private readonly stride: number;
  private readonly offset: number;

  private buffer: WebGLBuffer | undefined;

  public constructor(
    gl: WebGL2RenderingContext,
    {
      id,
      value,
      location,
      size,
      hint,
      type,
      normalize,
      stride,
      offset,
      instanced = false,
    }: BufferOpts,
  ) {
    this.gl = gl;
    this.location = location;
    this.value = value;
    this.size = size;
    this.hint = hint;
    this.type = type;
    this.normalize = normalize ?? false;
    this.stride = stride ?? 0;
    this.offset = offset ?? 0;
    this.instanced = instanced;

    this.init();
  }

  public get count() {
    return this.value.length / this.size;
  }

  public getInstanced() {
    return this.instanced;
  }

  private init() {
    const buffer = this.gl.createBuffer();

    if (!buffer) {
      throw new BufferError(`Failed to create buffer`);
    }

    this.buffer = buffer;

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.value, this.hint);
  }

  public update({ value }: BufferLoadOpts) {
    if (this.buffer) {
      this.value = value;
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, this.value, this.hint);
    }
  }

  public patch({ startAt, value }: BufferPatchOpts) {
    if (this.buffer) {
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
      this.gl.bufferSubData(
        this.gl.ARRAY_BUFFER,
        startAt * this.size * 4,
        value,
      );
    }
  }

  public bind() {
    if (this.buffer) {
      this.gl.enableVertexAttribArray(this.location);
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);

      this.gl.vertexAttribPointer(
        this.location,
        this.size,
        this.type,
        this.normalize,
        this.stride,
        this.offset,
      );

      if (this.instanced) {
        this.gl.vertexAttribDivisor(this.location, 1);
      }
    }
  }
}
