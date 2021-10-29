import { Program } from '../primitives/Program';
import { Buffer, BufferOpts } from '../primitives/Buffer';
import { VertexArray } from '../primitives/VertexArray';
import { BufferManager } from './BufferManager';

interface CreateVertexArrayOpts {
  buffers: Record<string, Omit<BufferOpts, 'id' | 'location'>>;
}

export class VertexArrayManager {
  constructor(
    private gl: WebGL2RenderingContext,
    private bufferManager: BufferManager,
  ) {}

  public createVertexArray(
    program: Program,
    { buffers, ...options }: CreateVertexArrayOpts,
  ): VertexArray {
    // Init buffers.
    const allBuffers: Map<string, Buffer> = new Map();
    let instanceCount = 0;
    let vertexCount = 0;

    Object.entries(buffers).forEach(([bufferId, bufferOpts]) => {
      const bufferProgramId = `${program.id}:${bufferId}`;
      const bufferLocation = this.gl.getAttribLocation(
        program.getProgram(),
        bufferId,
      );

      const buffer = this.bufferManager.createBuffer(bufferProgramId, {
        id: bufferProgramId,
        location: bufferLocation,
        ...bufferOpts,
      });

      if (bufferOpts.instanced) {
        instanceCount = bufferOpts.value.length / bufferOpts.size;
      } else {
        vertexCount = bufferOpts.value.length / bufferOpts.size;
      }

      allBuffers.set(bufferId, buffer);
    });

    if (!vertexCount) {
      throw new Error('At least one buffer must not be instanced');
    }

    return new VertexArray(this.gl, {
      buffers: allBuffers,
      vertexCount,
      instanceCount,
      ...options,
    });
  }
}
