import { Shader } from './Shader';
import { Uniform, UniformOpts } from './Uniform';
import { VertexArray } from './VertexArray';

export class ProgramError extends Error {
  public constructor(message?: string) {
    super();
    this.message = message || 'no further information provided';
  }
}

export interface ProgramOpts {
  id: string;
  vertexShader: Shader;
  fragmentShader: Shader;
  gl: WebGL2RenderingContext;
}

export class Program {
  public readonly id: string;
  private vertexShader: Shader;
  private fragmentShader: Shader;
  private readonly uniforms: Map<string, Uniform<UniformOpts>>;
  private gl: WebGL2RenderingContext;
  private program: WebGLProgram | undefined;

  public constructor({ id, gl, vertexShader, fragmentShader }: ProgramOpts) {
    this.id = id;
    this.vertexShader = vertexShader;
    this.fragmentShader = fragmentShader;
    this.uniforms = new Map();
    this.gl = gl;
    this.init();
  }

  public getProgram() {
    if (this.program) {
      return this.program;
    }
    throw new ProgramError('WebGLProgram not set.');
  }

  private init() {
    const program = this.gl.createProgram();
    if (program) {
      this.gl.attachShader(program, this.vertexShader.getShader());
      this.gl.attachShader(program, this.fragmentShader.getShader());
      this.gl.linkProgram(program);
      const isLinked = this.gl.getProgramParameter(
        program,
        this.gl.LINK_STATUS,
      );
      if (isLinked) {
        this.program = program;
        return;
      }
      throw new ProgramError('Unable to link shaders to program.');
    }
    throw new ProgramError('Unable to create program.');
  }

  public getUniform(id: string) {
    const fullId = `${this.id}:${id}`;
    if (this.uniforms.has(fullId)) {
      return this.uniforms.get(fullId)!;
    }
    throw new ProgramError(`Uniform with id ${fullId} not found.`);
  }

  public attachUniform<T extends UniformOpts>(uniform: Uniform<T>) {
    this.uniforms.set(uniform.id, uniform);
  }

  public draw(vertexArray: VertexArray) {
    const { instanceCount, vertexCount } = vertexArray;

    if (!this.program) {
      throw new ProgramError('Program not set - cannot draw.');
    }

    this.gl.useProgram(this.program);

    vertexArray.bind();

    for (const [, uniform] of this.uniforms) {
      uniform.set();
    }

    if (instanceCount) {
      this.gl.drawArraysInstanced(
        this.gl.TRIANGLES,
        0,
        vertexCount,
        instanceCount,
      );
    } else {
      this.gl.drawArrays(this.gl.TRIANGLES, 0, vertexCount);
    }
    return;
  }

  public batchDraw(
    vertexArray: VertexArray,
    chunkSize: number,
    prepareBatch: (chunk: number) => void,
  ) {
    const { instanceCount, vertexCount } = vertexArray;

    if (!instanceCount) {
      throw new Error('Only instanced buffers can use batch draw');
    }

    if (!this.program) {
      throw new ProgramError('Program not set - cannot draw.');
    }

    this.gl.useProgram(this.program);

    vertexArray.bind();

    for (const [, uniform] of this.uniforms) {
      uniform.set();
    }

    let chunks = Math.ceil(instanceCount / chunkSize);
    for (let i = 0; i < chunks; i++) {
      prepareBatch(i);

      const first = i * chunkSize;
      const batchSize = Math.min(chunkSize, instanceCount - first);

      this.gl.drawArraysInstanced(this.gl.TRIANGLES, 0, vertexCount, batchSize);
    }
  }
}
