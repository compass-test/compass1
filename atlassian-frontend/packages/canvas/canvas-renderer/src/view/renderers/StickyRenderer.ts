import { ProgramManager } from '../managers/ProgramManager';
import { VertexArrayManager } from '../managers/VertexArrayManager';
import { Program } from '../primitives/Program';
import { Camera } from '../../model/models/Camera';

import { Renderer } from './Renderer';
import { VertexArray } from '../primitives/VertexArray';
import { BoardElement } from '../../model/models/Element';

interface StickyRendererWebGLState {
  points: Float32Array;
  elementIdToIndex: {
    [id: string]: number;
  };
}

// TODO - dynamic
const w = 100;
const h = 100;

export class StickyRenderer implements Renderer {
  protected state: StickyRendererWebGLState;
  protected program: Program;
  private readonly vertexArray: VertexArray;

  public constructor(
    private gl: WebGL2RenderingContext,
    private camera: Camera,
    private programManager: ProgramManager,
    vertexArrayManager: VertexArrayManager,
  ) {
    this.state = {
      points: new Float32Array([]),
      elementIdToIndex: {},
    };

    const projectionMatrix = this.camera.getProjectionMatrix().toArray();
    const viewMatrix = this.camera.getViewMatrix().toArray();

    this.program = this.programManager.createProgram({
      id: 'sticky',
      uniforms: {
        u_projection: {
          type: 'uniformMatrix3fv',
          value: projectionMatrix,
        },
        u_view: {
          type: 'uniformMatrix3fv',
          value: viewMatrix,
        },
      },
      shaders: {
        vertex: `
          uniform mat3 u_projection;
          uniform mat3 u_view;
          uniform float u_stickiesCount;

          attribute vec2 a_position;
          attribute vec3 a_offset;

          void main() {
            vec3 clipSpacePoint = u_projection * u_view * vec3(a_position + a_offset.xy, 1);
            gl_Position = vec4(clipSpacePoint.xy, a_offset.z, 1);
          }
      `,
        fragment: `
          precision mediump float;

          void main() {
            gl_FragColor = vec4(1.0, 0.91, 0.52, 1);
          }
      `,
      },
    });

    this.vertexArray = vertexArrayManager.createVertexArray(this.program, {
      buffers: {
        a_position: {
          type: this.gl.FLOAT,
          hint: this.gl.STATIC_DRAW,
          size: 2,
          value: new Float32Array([
            -w / 2,
            -h / 2,
            -w / 2,
            h / 2,
            w / 2,
            h / 2,
            w / 2,
            h / 2,
            w / 2,
            -h / 2,
            -w / 2,
            -h / 2,
          ]),
        },
        a_offset: {
          type: this.gl.FLOAT,
          hint: this.gl.DYNAMIC_DRAW,
          size: 3,
          value: new Float32Array(this.state.points),
          instanced: true,
        },
      },
    });
  }

  public init(elements: BoardElement[]) {
    const instanceCount = elements.length;

    const pointsArr = elements
      .map(({ id, x, y, zIndex }, index) => {
        this.state.elementIdToIndex[id] = index;
        return [x, y, 1 - zIndex / instanceCount];
      })
      .flat();
    this.state.points = new Float32Array(pointsArr);

    const offsetBuffer = this.vertexArray.getBuffer('a_offset');
    offsetBuffer.update({
      value: this.state.points,
    });

    this.vertexArray.instanceCount = instanceCount;
  }

  public addElement({ id, x, y, zIndex }: BoardElement) {
    const elementCount = Object.keys(this.state.elementIdToIndex).length;
    this.state.elementIdToIndex[id] = elementCount;

    this.state.points = new Float32Array([
      ...this.state.points.values(),
      x,
      y,
      1 - zIndex / (elementCount + 1),
    ]);
    const offsetBuffer = this.vertexArray.getBuffer('a_offset');
    offsetBuffer.update({ value: this.state.points });

    this.vertexArray.instanceCount = elementCount + 1;
  }

  public moveElement(element: BoardElement) {
    // debugger;
    const draggingIndex = this.state.elementIdToIndex[element.id];
    const offsetBuffer = this.vertexArray.getBuffer('a_offset');
    offsetBuffer.patch({
      startAt: draggingIndex,
      value: new Float32Array([element.x, element.y]),
    });
    this.state.points[draggingIndex * 3] = element.x;
    this.state.points[draggingIndex * 3 + 1] = element.y;
  }

  public viewportUpdate(camera: Camera) {
    const projectionMatrix = camera.getProjectionMatrix().toArray();
    const viewMatrix = camera.getViewMatrix().toArray();

    this.program.getUniform('u_view').patch(viewMatrix);
    this.program.getUniform('u_projection').patch(projectionMatrix);
  }

  public render() {
    this.program.draw(this.vertexArray);
  }
}
