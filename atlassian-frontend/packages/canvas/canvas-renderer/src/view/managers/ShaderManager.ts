import { Shader, ShaderOpts } from '../primitives/Shader';

export class ShaderManager {
  public constructor(private gl: WebGL2RenderingContext) {}

  public createShader(opts: Omit<ShaderOpts, 'gl'>) {
    return new Shader({ ...opts, gl: this.gl });
  }
}
