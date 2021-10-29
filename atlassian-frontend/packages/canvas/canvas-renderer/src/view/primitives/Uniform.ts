export type UniformOpts =
  | FloatVectorUniformOpts
  | IntUniformOpts
  | UIntVectorUniformOpts
  | FloatUniformOpts;

export interface UniformLocation {
  id: string;
  location: WebGLUniformLocation;
}

export interface IntUniformOpts {
  type: 'uniform1i';
  value: number;
}

export interface FloatVectorUniformOpts {
  type:
    | 'uniformMatrix2fv'
    | 'uniformMatrix3fv'
    | 'uniform2fv'
    | 'uniform3fv'
    | 'uniform4fv'
    | 'uniform1iv';
  value: Float32List;
}

export interface UIntVectorUniformOpts {
  type: 'uniform1uiv';
  value: Uint32List;
}

export interface FloatUniformOpts {
  type: 'uniform1f';
  value: number;
}

export class Uniform<T extends UniformOpts> {
  private gl: WebGL2RenderingContext;

  public readonly id: string;
  private readonly data: UniformOpts;
  private readonly location: WebGLUniformLocation;

  public constructor(
    gl: WebGL2RenderingContext,
    id: string,
    location: WebGLUniformLocation,
    data: T,
  ) {
    this.gl = gl;
    this.id = id;
    this.data = data;
    this.location = location;
  }

  public set() {
    switch (this.data.type) {
      case 'uniform2fv': {
        this.gl.uniform2fv(this.location, this.data.value);
        return;
      }
      case 'uniform3fv': {
        this.gl.uniform3fv(this.location, this.data.value);
        return;
      }
      case 'uniform4fv': {
        this.gl.uniform4fv(this.location, this.data.value);
        return;
      }
      case 'uniformMatrix2fv': {
        this.gl.uniformMatrix2fv(this.location, false, this.data.value);
        return;
      }
      case 'uniformMatrix3fv': {
        this.gl.uniformMatrix3fv(this.location, false, this.data.value);
        return;
      }
      case 'uniform1i': {
        this.gl.uniform1i(this.location, this.data.value);
        return;
      }
      case 'uniform1uiv': {
        this.gl.uniform1uiv(this.location, this.data.value);
        return;
      }
      case 'uniform1iv': {
        this.gl.uniform1iv(this.location, this.data.value);
        return;
      }
      case 'uniform1f': {
        this.gl.uniform1f(this.location, this.data.value);
        return;
      }
    }
  }

  public patch(value: T['value']) {
    this.data.value = value;
  }
}
