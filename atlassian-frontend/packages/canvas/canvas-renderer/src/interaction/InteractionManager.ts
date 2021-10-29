import { Camera } from '../model/models/Camera';
import { Interaction } from '../model/models/Interaction';
import { EventHandler } from './InteractionHandler';

export class InteractionManager {
  public constructor(
    private root: HTMLCanvasElement,
    private camera: Camera,
    private onInteraction: (interaction: Interaction) => void,
    private unregisterHandlers: VoidFunction[] = [],
  ) {}

  public init() {
    this.unregisterHandlers.push(this.registerMouseListeners());
    this.unregisterHandlers.push(this.registerWheelListeners());
    this.unregisterHandlers.push(this.registerMenuListeners());
  }

  private registerMouseListeners() {
    const onDragStart: EventHandler<MouseEvent> = evt => {
      const position = this.camera.toWorldPosition(evt.clientX, evt.clientY);

      this.onInteraction({
        type: 'drag-start',
        payload: {
          position,
        },
      });
    };
    const onDragMove: EventHandler<MouseEvent> = evt => {
      if (evt.buttons === 1) {
        const position = this.camera.toWorldPosition(evt.clientX, evt.clientY);
        this.onInteraction({
          type: 'drag',
          payload: {
            position,
          },
        });
      } else if (evt.buttons === 2) {
        const position = this.camera
          .toWorldScale(evt.movementX, evt.movementY)
          .addV(this.camera.position);

        this.onInteraction({
          type: 'pan',
          payload: {
            position,
          },
        });
      }
    };
    const onDragEnd: EventHandler<MouseEvent> = evt => {
      const position = this.camera.toWorldPosition(evt.clientX, evt.clientY);
      this.onInteraction({
        type: 'drag-end',
        payload: {
          position,
        },
      });
    };
    const onDoubleClick: EventHandler<MouseEvent> = evt => {
      const position = this.camera.toWorldPosition(evt.clientX, evt.clientY);
      this.onInteraction({
        type: 'dbl-click',
        payload: {
          position,
        },
      });
    };

    this.root.addEventListener('mousedown', onDragStart);
    this.root.addEventListener('mousemove', onDragMove);
    this.root.addEventListener('mouseup', onDragEnd);
    this.root.addEventListener('dblclick', onDoubleClick);

    return () => {
      this.root.removeEventListener('mousedown', onDragStart);
      this.root.removeEventListener('mousemove', onDragMove);
      this.root.removeEventListener('mouseup', onDragEnd);
      this.root.addEventListener('dblclick', onDoubleClick);
    };
  }

  private registerWheelListeners() {
    const eventHandler: EventHandler<WheelEvent> = evt => {
      this.onInteraction({
        type: 'zoom',
        payload: {
          delta: evt.deltaY,
        },
      });
    };

    this.root.addEventListener('wheel', eventHandler);
    return () => this.root.removeEventListener('wheel', eventHandler);
  }

  private registerMenuListeners() {
    const eventHandler: EventHandler<MouseEvent> = evt => {
      evt.preventDefault();
    };

    this.root.addEventListener('contextmenu', eventHandler);
    return () => this.root.removeEventListener('contextmenu', eventHandler);
  }

  public dispose() {
    for (const unregister of this.unregisterHandlers) {
      unregister();
    }
  }
}
