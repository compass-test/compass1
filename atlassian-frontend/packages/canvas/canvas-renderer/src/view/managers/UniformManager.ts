import { Uniform, UniformOpts } from '../primitives/Uniform';

export class UniformManager {
  public constructor(private gl: WebGL2RenderingContext) {}

  public createUniform<T extends UniformOpts>(
    id: string,
    uniformLocation: WebGLUniformLocation,
    opts: T,
  ): Uniform<T> {
    return new Uniform(this.gl, id, uniformLocation, opts);
  }
}
