import { Camera } from '../model/models/Camera';
import { Interaction } from '../model/models/Interaction';

export type EventHandler<T> = (this: HTMLCanvasElement, event: T) => void;

export class InteractionHandler {
  public constructor(
    protected root: HTMLCanvasElement,
    protected camera: Camera,
    protected onInteraction: (interaction: Interaction) => void,
  ) {}

  public register(): VoidFunction {
    throw new Error('BaseInteraction.register needs implementation');
  }
}
