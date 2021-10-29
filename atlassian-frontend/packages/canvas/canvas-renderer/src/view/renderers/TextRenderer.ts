import { Renderer } from './Renderer';
import { Texture } from '../primitives/Texture';
import { ProgramManager } from '../managers/ProgramManager';
import { Camera } from '../../model/models/Camera';
import { TextureManager } from '../managers/TextureManager';
import { Program } from '../primitives/Program';
import { VertexArrayManager } from '../managers/VertexArrayManager';
import { VertexArray } from '../primitives/VertexArray';
import { BoardElement } from '../../model/models/Element';

interface TextRendererState {
  points: Float32Array;
  sizes: Float32Array;
  textures: Texture[];
  elementIdToIndex: {
    [id: string]: number;
  };
}

const vertexShader = `#version 300 es

  uniform mat3 u_projection;
  uniform mat3 u_view;

  in vec2 a_position;
  in vec3 a_offset;
  in vec2 a_uv;
  in vec2 a_scale;

  out vec2 uv;
  flat out int textureId;

  void main() {
    vec3 clipSpacePoint = u_projection * u_view * vec3(a_position * a_scale + a_offset.xy, 1);
    uv = a_uv;
    textureId = gl_InstanceID; // TODO: Backport to WebGL 1
    gl_Position = vec4(clipSpacePoint.xy, a_offset.z, 1);
  }
  `;
const fragmentShader = (textureUnitCount: number) => {
  const textureUnits = new Array(textureUnitCount).fill(true);

  return `#version 300 es

  precision mediump float;

  uniform sampler2D u_textTexture[${textureUnitCount}];

  in vec2 uv;
  flat in int textureId;

  out vec4 color;

  void main() {
    switch(textureId) {
      ${textureUnits
        .map(
          (_, i) => `
        case ${i}:
          color = texture(u_textTexture[${i}], uv);
          break;`,
        )
        .join('\n')}
    }
  }
  `;
};

const r = 0;
const g = 1;
const b = 2;
const a = 3;
function premultiplyAlpha(input: Uint8ClampedArray) {
  for (let i = 0; i < input.length / 4; i++) {
    const pixel = i * 4;

    const alphaFactor = input[pixel + a] / 255;
    input[pixel + r] = input[pixel + r] * alphaFactor;
    input[pixel + g] = input[pixel + g] * alphaFactor;
    input[pixel + b] = input[pixel + b] * alphaFactor;
  }
}

export class TextRenderer implements Renderer {
  private textureManager: TextureManager;
  private canvas: HTMLCanvasElement;
  private canvasContext: CanvasRenderingContext2D;

  private state: TextRendererState;
  protected program: Program;
  private readonly textureUnits: number;
  private readonly emptyTexture: Texture;
  private readonly vertexArray: VertexArray;

  constructor(
    private gl: WebGL2RenderingContext,
    private camera: Camera,
    private programManager: ProgramManager,
    textureManager: TextureManager,
    vertexArrayManager: VertexArrayManager,
  ) {
    this.state = {
      points: new Float32Array([]),
      sizes: new Float32Array([]),
      textures: [],
      elementIdToIndex: {},
    };

    this.textureManager = textureManager;
    this.canvas = document.createElement('canvas');
    const canvasContext = this.canvas.getContext('2d');
    if (!canvasContext) {
      throw new Error('Unable to initialize canvas');
    }
    this.canvasContext = canvasContext;
    this.textureUnits = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);

    const projectionMatrix = this.camera.getProjectionMatrix().toArray();
    const viewMatrix = this.camera.getViewMatrix().toArray();

    this.emptyTexture = textureManager.createTexture('empty', {
      width: 1,
      height: 1,
    });
    this.emptyTexture.init(new Uint8ClampedArray([0, 0, 0, 0]));

    this.program = this.programManager.createProgram({
      id: 'text',
      uniforms: {
        u_projection: {
          type: 'uniformMatrix3fv',
          value: projectionMatrix,
        },
        u_view: {
          type: 'uniformMatrix3fv',
          value: viewMatrix,
        },
        u_textTexture: {
          type: 'uniform1iv',
          value: new Array(this.textureUnits).fill(0).map((_, i) => i),
        },
      },
      shaders: {
        vertex: vertexShader,
        fragment: fragmentShader(this.textureUnits),
      },
    });

    this.vertexArray = vertexArrayManager.createVertexArray(this.program, {
      buffers: {
        a_position: {
          type: this.gl.FLOAT,
          hint: this.gl.STATIC_DRAW,
          normalize: false,
          size: 2,
          value: new Float32Array([
            -0.5,
            -0.5,
            -0.5,
            0.5,
            0.5,
            0.5,
            0.5,
            0.5,
            0.5,
            -0.5,
            -0.5,
            -0.5,
          ]),
        },
        a_uv: {
          type: this.gl.FLOAT,
          hint: this.gl.STATIC_DRAW,
          normalize: false,
          size: 2,
          value: new Float32Array([0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0]),
        },
        a_offset: {
          type: this.gl.FLOAT,
          hint: this.gl.DYNAMIC_DRAW,
          size: 3,
          value: new Float32Array(this.state.points),
          instanced: true,
        },
        a_scale: {
          type: this.gl.FLOAT,
          hint: this.gl.DYNAMIC_DRAW,
          size: 2,
          value: new Float32Array(this.state.sizes),
          instanced: true,
        },
      },
    });
  }

  public init(elements: BoardElement[]) {
    const instanceCount = elements.length;

    this.state.points = new Float32Array(instanceCount * 3);
    this.state.sizes = new Float32Array(instanceCount * 2);
    this.state.textures = [];

    elements.forEach(({ id, text, x, y, zIndex }, i) => {
      if (!text) {
        return;
      }
      this.state.elementIdToIndex[id] = i;

      const texture = this._renderText(text);
      this.state.textures.push(texture);
      this.state.points[i * 3] = x;
      this.state.points[i * 3 + 1] = y;
      this.state.points[i * 3 + 2] = 1 - zIndex / instanceCount;
      this.state.sizes[i * 2] = texture.width / 2;
      this.state.sizes[i * 2 + 1] = texture.height / 2;
    });

    const offsetBuffer = this.vertexArray.getBuffer('a_offset');
    offsetBuffer.update({ value: this.state.points });

    const scaleBuffer = this.vertexArray.getBuffer('a_scale');
    scaleBuffer.update({ value: this.state.sizes });

    this.vertexArray.attachBuffer(scaleBuffer);

    this.vertexArray.instanceCount = instanceCount;
  }

  public render() {
    this.gl.enable(this.gl.BLEND);
    this.gl.blendFunc(this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA);

    this.program.batchDraw(this.vertexArray, this.textureUnits, chunk => {
      let offset = chunk * this.textureUnits;
      let until = Math.min(
        offset + this.textureUnits,
        this.state.textures.length,
      );

      let sampler = 0;
      for (let i = offset; i < until; i++) {
        this.state.textures[i].bindToSampler(sampler++);
      }

      for (let i = until; i < this.textureUnits; i++) {
        this.emptyTexture.bindToSampler(sampler++);
      }
    });

    this.gl.disable(this.gl.BLEND);
  }

  public moveElement(element: BoardElement) {
    const draggingIndex = this.state.elementIdToIndex[element.id];
    const offsetBuffer = this.vertexArray.getBuffer('a_offset');
    offsetBuffer.patch({
      startAt: draggingIndex,
      value: new Float32Array([element.x, element.y]),
    });
    this.state.points[draggingIndex * 3] = element.x;
    this.state.points[draggingIndex * 3 + 1] = element.y;
  }

  public addElement({ id, x, y, text, zIndex }: BoardElement) {
    if (!text) {
      return;
    }

    const elementCount = Object.keys(this.state.elementIdToIndex).length;
    this.state.elementIdToIndex[id] = elementCount;
    const nextTexture = this._renderText(text);
    const newSizes = [nextTexture.width / 2, nextTexture.height / 2];

    this.state.textures.push(nextTexture);
    this.state.points = new Float32Array([
      ...this.state.points.values(),
      x,
      y,
      1 - zIndex / (elementCount + 1),
    ]);

    this.state.sizes = new Float32Array([
      ...this.state.sizes.values(),
      ...newSizes,
    ]);

    const offsetBuffer = this.vertexArray.getBuffer('a_offset');
    offsetBuffer.update({ value: this.state.points });

    const scaleBuffer = this.vertexArray.getBuffer('a_scale');
    scaleBuffer.update({ value: this.state.sizes });

    this.vertexArray.instanceCount = elementCount + 1;
  }

  public viewportUpdate(camera: Camera) {
    const projectionMatrix = camera.getProjectionMatrix().toArray();
    const viewMatrix = camera.getViewMatrix().toArray();

    this.program.getUniform('u_view').patch(viewMatrix);
    this.program.getUniform('u_projection').patch(projectionMatrix);
  }

  private _renderText(input: string, fillColor = '#172B4Dff'): Texture {
    const { width, height, x, y, border } = this._computeBoundingBox(input);

    this._ensureCanvasSize(width, height, border);

    this.canvasContext.font = '24pt sans-serif';
    this.canvasContext.fillStyle = fillColor;
    this.canvasContext.textBaseline = 'top';

    this.canvasContext.clearRect(0, 0, width + border, height + border);
    this.canvasContext.fillText(input, border, border);

    const imageData = this.canvasContext.getImageData(x, y, width, height);

    return this._createTextureFromImageData(imageData);
  }

  private _createTextureFromImageData({
    height,
    width,
    data,
  }: ImageData): Texture {
    premultiplyAlpha(data);

    const texture = this.textureManager.createTexture('a', {
      minification: 'linear',
      magnification: 'linear',
      repeat: 'clamp',
      height,
      width,
    });

    texture.init(data);

    return texture;
  }

  private _ensureCanvasSize(width: number, height: number, border: number) {
    const devicePixelRatio = window.devicePixelRatio || 1;

    const resolutionDependentWidth = devicePixelRatio * (width + border * 2);
    const resolutionDependentHeight = devicePixelRatio * (height + border * 2);
    if (this.canvas.width < resolutionDependentWidth) {
      this.canvas.width = resolutionDependentWidth;
    }

    if (this.canvas.height < resolutionDependentHeight) {
      this.canvas.height = resolutionDependentHeight;
    }
  }

  private _computeBoundingBox(input: string, border = 5) {
    this.canvasContext.font = '24pt sans-serif';
    this.canvasContext.textBaseline = 'top';

    const {
      actualBoundingBoxLeft,
      actualBoundingBoxRight,
      actualBoundingBoxAscent,
      actualBoundingBoxDescent,
    } = this.canvasContext.measureText(input);

    const width = Math.ceil(actualBoundingBoxRight - actualBoundingBoxLeft);

    const y = border - actualBoundingBoxAscent;
    const height = Math.ceil(
      actualBoundingBoxAscent + actualBoundingBoxDescent + 4,
    );

    return {
      border,
      x: border,
      y,
      width,
      height,
    };
  }
}
