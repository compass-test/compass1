import { Texture, TextureOpts } from '../primitives/Texture';

export class TextureManager {
  public constructor(private gl: WebGL2RenderingContext) {}

  public createTexture(id: string, opts: TextureOpts) {
    return new Texture(this.gl, opts);
  }
}
