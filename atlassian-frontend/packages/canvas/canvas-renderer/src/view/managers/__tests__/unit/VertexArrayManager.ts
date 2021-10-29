import { VertexArrayManager } from '../../VertexArrayManager';
import { makeMock, makeGLMock } from '../../../../Mocks';
import { Program } from '../../../primitives/Program';
import { BufferManager } from '../../BufferManager';
import { Buffer } from '../../../primitives/Buffer';

describe('VertexArrayManager', () => {
  describe('createVertexArray', () => {
    it('should throw an error if all buffers are empty', () => {
      const gl = makeGLMock();
      const program = makeMock<Program>();
      const bufferManager = makeMock<BufferManager>();

      const vertexArray = new VertexArrayManager(gl, bufferManager);

      expect(() =>
        vertexArray.createVertexArray(program, { buffers: {} }),
      ).toThrow('At least one buffer must not be instanced');
    });

    it('should throw if only instanced buffers are provided', () => {
      const gl = makeGLMock();
      const program = makeMock<Program>();
      const bufferManager = makeMock<BufferManager>();

      const vertexArray = new VertexArrayManager(gl, bufferManager);

      expect(() =>
        vertexArray.createVertexArray(program, {
          buffers: {
            test: {
              hint: gl.DYNAMIC_READ,
              type: gl.FLOAT,
              size: 2,
              value: new Float32Array([0, 0]),
              instanced: true,
            },
          },
        }),
      ).toThrow('At least one buffer must not be instanced');
    });

    it('should bind provided buffers', () => {
      const gl = makeGLMock();
      gl.createVertexArray.mockReturnValue({});

      const program = makeMock<Program>();
      const bufferManager = makeMock<BufferManager>();
      const buffer = makeMock<Buffer>();
      bufferManager.createBuffer.mockReturnValue(buffer);

      const vertexArrayManager = new VertexArrayManager(gl, bufferManager);

      const vertexArray = vertexArrayManager.createVertexArray(program, {
        buffers: {
          test: {
            hint: gl.DYNAMIC_READ,
            type: gl.FLOAT,
            size: 2,
            value: new Float32Array([0, 0]),
          },
        },
      });

      expect(buffer.bind).toHaveBeenCalled();
      expect(vertexArray.vertexCount).toEqual(1);
      expect(vertexArray.instanceCount).toEqual(0);
    });

    it('should use instancing if an instanced buffer is provided', () => {
      const gl = makeGLMock();
      gl.createVertexArray.mockReturnValue({});

      const program = makeMock<Program>();
      const bufferManager = makeMock<BufferManager>();
      const buffer = makeMock<Buffer>();
      bufferManager.createBuffer.mockReturnValue(buffer);

      const vertexArrayManager = new VertexArrayManager(gl, bufferManager);

      const vertexArray = vertexArrayManager.createVertexArray(program, {
        buffers: {
          test: {
            hint: gl.DYNAMIC_READ,
            type: gl.FLOAT,
            size: 2,
            value: new Float32Array([0, 0]),
          },
          test2: {
            hint: gl.DYNAMIC_READ,
            type: gl.FLOAT,
            size: 2,
            value: new Float32Array([0, 0]),
            instanced: true,
          },
        },
      });

      expect(buffer.bind).toHaveBeenCalled();
      expect(vertexArray.vertexCount).toEqual(1);
      expect(vertexArray.instanceCount).toEqual(1);
    });
  });
});
