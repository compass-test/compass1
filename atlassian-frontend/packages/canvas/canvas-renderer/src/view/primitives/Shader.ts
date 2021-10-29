export class ShaderError extends Error {
  public constructor(message?: string) {
    super();
    this.message = message || 'no further information provided';
  }
}

type ShaderType =
  | WebGL2RenderingContext['FRAGMENT_SHADER']
  | WebGL2RenderingContext['VERTEX_SHADER'];

export interface ShaderOpts {
  id: string;
  type: ShaderType;
  source: string;
  gl: WebGL2RenderingContext;
}

export class Shader {
  public readonly id: string;
  private readonly type: ShaderType;
  private readonly source: string;
  private gl: WebGL2RenderingContext;
  private shader: WebGLShader | undefined;

  public constructor({ id, type, source, gl }: ShaderOpts) {
    this.id = id;
    this.type = type;
    this.source = source;
    this.gl = gl;

    this.init();
  }

  public getShader() {
    if (this.shader) {
      return this.shader;
    }
    throw new ShaderError('WebGLShader not set.');
  }

  private init() {
    const shader = this.gl.createShader(this.type);
    if (shader) {
      this.gl.shaderSource(shader, this.source);
      this.gl.compileShader(shader);
      const isCompiled = this.gl.getShaderParameter(
        shader,
        this.gl.COMPILE_STATUS,
      );
      if (isCompiled) {
        this.shader = shader;
        return;
      }
      throw new ShaderError(
        `Unable to compile shader. ${this.gl.getShaderInfoLog(shader)}`,
      );
    }
    throw new ShaderError('Unable to create shader');
  }
}
