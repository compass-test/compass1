import { Viewport } from './model/models/Viewport';
import { Camera } from './model/models/Camera';
import { InteractionManager } from './interaction/InteractionManager';
import { StateManager } from './model/StateManager';
import { getContext } from './view/Context';
import { StickyRenderer } from './view/renderers/StickyRenderer';
import { CanvasBoardRendererOpts } from './types';
import { BoardStateListener } from './model/models/Board';
import { ProgramManager } from './view/managers/ProgramManager';
import { CameraStateListener } from './model/listeners/CameraStateListener';
import { TextRenderer } from './view/renderers/TextRenderer';
import { TextureManager } from './view/managers/TextureManager';
import { VertexArrayManager } from './view/managers/VertexArrayManager';
import { BufferManager } from './view/managers/BufferManager';
import { eventDelegator } from './view/managers/RendererManager';
import { RenderEventListener } from './view/renderers/Renderer';

export class CanvasBoardRenderer {
  private readonly interactionManager: InteractionManager;
  private readonly stateManager: StateManager;
  private readonly programManager: ProgramManager;
  private readonly textureManager: TextureManager;
  private readonly bufferManager: BufferManager;
  private readonly vertexArrayManager: VertexArrayManager;
  private readonly rendererEventDelegate: RenderEventListener;

  public readonly camera: Camera;

  private frame?: number;

  public constructor(opts: CanvasBoardRendererOpts) {
    const { selector } = opts;
    const { root, gl } = getContext(selector);

    const { width, height } = new Viewport(gl);
    this.camera = new Camera(width, height);

    this.textureManager = new TextureManager(gl);
    this.programManager = new ProgramManager(gl);
    this.bufferManager = new BufferManager(gl);
    this.vertexArrayManager = new VertexArrayManager(gl, this.bufferManager);

    this.rendererEventDelegate = eventDelegator(
      ['init', 'moveElement', 'addElement', 'render', 'viewportUpdate'],
      new StickyRenderer(
        gl,
        this.camera,
        this.programManager,
        this.vertexArrayManager,
      ),
      new TextRenderer(
        gl,
        this.camera,
        this.programManager,
        this.textureManager,
        this.vertexArrayManager,
      ),
    );

    this.stateManager = new StateManager([
      new BoardStateListener(opts.board, this.rendererEventDelegate),
      new CameraStateListener(this.camera, this.rendererEventDelegate),
    ]);

    const onInteraction = this.stateManager.update;
    this.interactionManager = new InteractionManager(
      root,
      this.camera,
      onInteraction,
    );

    gl.depthFunc(gl.LEQUAL);
    gl.depthRange(0, 1);
    gl.enable(gl.DEPTH_TEST);

    this.interactionManager.init();
    this.stateManager.init();
    this.loop();
  }

  private loop() {
    this.frame = requestAnimationFrame(() => {
      this.rendererEventDelegate.render();
      this.loop();
    });
  }

  public get dispose() {
    return () => {
      this.stateManager.dispose();
      this.interactionManager.dispose();
      this.programManager.dispose();
      if (this.frame) {
        cancelAnimationFrame(this.frame);
      }
    };
  }
}
