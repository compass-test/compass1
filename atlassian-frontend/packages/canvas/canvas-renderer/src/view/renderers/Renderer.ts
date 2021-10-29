import { BoardElement } from '../../model/models/Element';
import { Camera } from '../../model/models/Camera';

export interface RenderEventListener {
  init(elements: BoardElement[]): void;
  moveElement(element: BoardElement): void;
  addElement(element: BoardElement): void;
  viewportUpdate(camera: Camera): void;
  render(): void;
}

export interface Renderer extends Partial<RenderEventListener> {
  render(): void;
}
