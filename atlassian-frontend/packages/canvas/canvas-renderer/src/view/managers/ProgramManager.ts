import { ShaderManager } from './ShaderManager';
import { UniformManager } from './UniformManager';
import { Program } from '../primitives/Program';
import { UniformOpts } from '../primitives/Uniform';

export class ProgramError extends Error {
  public constructor(message?: string) {
    super();
    this.message = message || 'no further information provided';
  }
}

export interface ProgramOpts {
  id: string;
  uniforms: Record<string, UniformOpts>;
  shaders: {
    vertex: string;
    fragment: string;
  };
}

export class ProgramManager {
  private readonly gl: WebGL2RenderingContext;
  private shaderManager: ShaderManager;
  private uniformManager: UniformManager;

  public constructor(gl: WebGL2RenderingContext) {
    this.gl = gl;
    this.shaderManager = new ShaderManager(gl);
    this.uniformManager = new UniformManager(gl);
  }

  public createProgram({
    id,
    uniforms,
    shaders: { vertex, fragment },
  }: ProgramOpts) {
    // Init shaders.
    const vertexShader = this.shaderManager.createShader({
      id: id,
      type: this.gl.VERTEX_SHADER,
      source: vertex,
    });
    const fragmentShader = this.shaderManager.createShader({
      id: id,
      type: this.gl.FRAGMENT_SHADER,
      source: fragment,
    });

    // Init program.
    const program = new Program({
      id: id,
      gl: this.gl,
      vertexShader,
      fragmentShader,
    });

    // Init uniforms.
    Object.entries(uniforms).forEach(([uniformId, uniformOpts]) => {
      const uniformProgramId = `${id}:${uniformId}`;
      const uniformLocation = this.gl.getUniformLocation(
        program.getProgram(),
        uniformId,
      );
      if (uniformLocation) {
        const uniform = this.uniformManager.createUniform(
          uniformProgramId,
          uniformLocation,
          uniformOpts,
        );
        program.attachUniform(uniform);
      } else {
        // eslint-disable-next-line no-console
        console.warn('Uniform', uniformProgramId, 'not found in program', id);
      }
    });

    return program;
  }

  public dispose() {
    // TODO.
  }
}
