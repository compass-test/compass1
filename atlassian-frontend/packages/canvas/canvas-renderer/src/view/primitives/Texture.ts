type GLMinification = 'nearest' | 'linear';
type GLRepeat = 'clamp' | 'repeat';

export interface TextureOpts {
  width: number;
  height: number;
  repeat?: GLRepeat;
  minification?: GLMinification;
  magnification?: GLMinification;
}

export interface TextureBindOps {
  location: WebGLUniformLocation;
  sampler: GLenum;
}

interface Region {
  x: number;
  y: number;
  width: number;
  height: number;
}

export class Texture {
  private readonly texture: WebGLTexture;
  public readonly width: number;
  public readonly height: number;
  private readonly minification: GLMinification | undefined;
  private readonly repeat: GLRepeat | undefined;
  private readonly magnification: GLMinification | undefined;

  constructor(
    private gl: WebGL2RenderingContext,
    { width, height, repeat, minification, magnification }: TextureOpts,
  ) {
    const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);

    if (width > maxTextureSize || height > maxTextureSize) {
      throw new Error(
        `Texture is larger than maximum texture size of ${maxTextureSize}`,
      );
    }

    this.width = width;
    this.height = height;
    this.repeat = repeat;
    this.minification = minification;
    this.magnification = magnification;
    this.repeat = repeat;

    const texture = gl.createTexture();
    if (!texture) {
      throw new Error('Failed to create texture');
    }
    this.texture = texture;
  }

  init(data: Uint8ClampedArray) {
    const gl = this.gl;

    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      this.width,
      this.height,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      data,
    );

    if (this.minification) {
      const minification =
        this.minification === 'linear' ? gl.LINEAR : gl.NEAREST;

      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minification);
    }

    if (this.magnification) {
      const minification =
        this.magnification === 'linear' ? gl.LINEAR : gl.NEAREST;

      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, minification);
    }

    if (this.repeat) {
      const repeat = this.repeat === 'clamp' ? gl.CLAMP_TO_EDGE : gl.REPEAT;

      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, repeat);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, repeat);
    }
  }

  patch({ x, y, width, height }: Region, data: Uint8ClampedArray) {
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
    this.gl.texSubImage2D(
      this.gl.TEXTURE_2D,
      0,
      x,
      y,
      width,
      height,
      this.gl.RGBA,
      this.gl.UNSIGNED_BYTE,
      data,
    );
  }

  bindToSampler(sampler: number) {
    // Once per frame
    this.gl.activeTexture(this.gl.TEXTURE0 + sampler);

    // N times (one per sticky)
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
  }

  dispose() {
    this.gl.deleteTexture(this.texture);
  }
}
