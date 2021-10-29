import { Texture } from '../../Texture';
import { makeGLMock } from '../../../../Mocks';

describe('Texture', () => {
  describe('constructor', () => {
    it('should throw an error if the texture failed to be created', () => {
      const gl = makeGLMock();

      expect(() => new Texture(gl, { width: 0, height: 0 })).toThrow(
        'Failed to create texture',
      );
    });

    it('should throw an error if the texture is too large', () => {
      const gl = makeGLMock();

      gl.getParameter.mockReturnValue(100);

      expect(() => new Texture(gl, { width: 200, height: 200 })).toThrow(
        'Texture is larger than maximum texture size of 100',
      );
      expect(gl.getParameter).toHaveBeenCalledWith(gl.MAX_TEXTURE_SIZE);
    });

    it('should create the texture', () => {
      const gl = makeGLMock();

      gl.createTexture.mockReturnValue({});

      expect(new Texture(gl, { width: 0, height: 0 })).toBeInstanceOf(Texture);
    });
  });

  describe('init', () => {
    const width = 50,
      height = 50;

    it('should bind the texture data', () => {
      const gl = makeGLMock();

      gl.createTexture.mockReturnValue({});

      const texture = new Texture(gl, { width, height });

      const data = new Uint8ClampedArray();
      texture.init(data);

      expect(gl.texImage2D).toHaveBeenCalledWith(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        width,
        height,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        data,
      );
      expect(gl.texParameteri).not.toHaveBeenCalled();
    });

    it('should use clamp if repeat is set to clamp', () => {
      const gl = makeGLMock();

      gl.createTexture.mockReturnValue({});

      const texture = new Texture(gl, { width, height, repeat: 'clamp' });

      const data = new Uint8ClampedArray();
      texture.init(data);

      expect(gl.texParameteri).toHaveBeenCalledTimes(2);
      expect(gl.texParameteri).toHaveBeenCalledWith(
        gl.TEXTURE_2D,
        gl.TEXTURE_WRAP_S,
        gl.CLAMP_TO_EDGE,
      );

      expect(gl.texParameteri).toHaveBeenCalledWith(
        gl.TEXTURE_2D,
        gl.TEXTURE_WRAP_T,
        gl.CLAMP_TO_EDGE,
      );
    });

    it('should use repeat if repeat is set to repeat', () => {
      const gl = makeGLMock();

      gl.createTexture.mockReturnValue({});

      const texture = new Texture(gl, { width, height, repeat: 'repeat' });

      const data = new Uint8ClampedArray();
      texture.init(data);

      expect(gl.texParameteri).toHaveBeenCalledTimes(2);
      expect(gl.texParameteri).toHaveBeenCalledWith(
        gl.TEXTURE_2D,
        gl.TEXTURE_WRAP_S,
        gl.REPEAT,
      );

      expect(gl.texParameteri).toHaveBeenCalledWith(
        gl.TEXTURE_2D,
        gl.TEXTURE_WRAP_T,
        gl.REPEAT,
      );
    });

    it('should set interpolation to linear if linear', () => {
      const gl = makeGLMock();

      gl.createTexture.mockReturnValue({});

      const texture = new Texture(gl, {
        width,
        height,
        minification: 'linear',
      });

      const data = new Uint8ClampedArray();
      texture.init(data);

      expect(gl.texParameteri).toHaveBeenCalledTimes(1);
      expect(gl.texParameteri).toHaveBeenCalledWith(
        gl.TEXTURE_2D,
        gl.TEXTURE_MIN_FILTER,
        gl.LINEAR,
      );
    });

    it('should set interpolation to nearest if nearest', () => {
      const gl = makeGLMock();

      gl.createTexture.mockReturnValue({});

      const texture = new Texture(gl, {
        width,
        height,
        minification: 'nearest',
      });

      const data = new Uint8ClampedArray();
      texture.init(data);

      expect(gl.texParameteri).toHaveBeenCalledTimes(1);
      expect(gl.texParameteri).toHaveBeenCalledWith(
        gl.TEXTURE_2D,
        gl.TEXTURE_MIN_FILTER,
        gl.NEAREST,
      );
    });
  });
});
