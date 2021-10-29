import { StateListener, StateListenerConfig } from '../StateListener';
import { Interaction } from './Interaction';
import { BoardElement, Sticky } from './Element';
import { RenderEventListener } from '../../view/renderers/Renderer';

export interface BoardState {
  elements: { [id: string]: BoardElement };
  draggingElementId?: string | null;
}

// TODO - replace this with actual ID provider
const emojis = ['✨', '⚡️', '🐢', '🚀'];
const randmoji = () => emojis[Math.round(Math.random() * (emojis.length - 1))];
const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export class BoardStateListener implements StateListener<BoardState> {
  public config: StateListenerConfig<BoardState> = {
    listensTo: ['drag-start', 'drag', 'drag-end', 'dbl-click'],
  };

  private readonly state: BoardState;
  public constructor(
    initialState: BoardState,
    private view: RenderEventListener,
  ) {
    this.state = initialState;
  }

  public init(): void {
    this.view.init(Object.values(this.state.elements));
  }

  update(interaction: Interaction): BoardState {
    switch (interaction.type) {
      case 'drag-start': {
        this.state.draggingElementId =
          Object.keys(this.state.elements).find(
            elementId =>
              interaction.payload &&
              this.state.elements[elementId].intersects(
                interaction.payload.position,
              ),
          ) || null;
        break;
      }
      case 'drag': {
        if (this.state.draggingElementId && interaction.payload) {
          this.state.elements[this.state.draggingElementId].setLocation(
            interaction.payload.position,
          );
          this.view.moveElement(
            this.state.elements[this.state.draggingElementId],
          );
        }
        break;
      }
      case 'drag-end': {
        this.state.draggingElementId = null;
        break;
      }
      case 'dbl-click': {
        const position = interaction.payload?.position;

        if (position) {
          const elementCount = Object.keys(this.state.elements).length;

          const newElement = new Sticky({
            id: String(uuidv4()),
            ...position,
            zIndex: elementCount,
            text: `${elementCount} - ${randmoji()}`,
          });
          this.state.elements[newElement.id] = newElement;
          this.view.addElement(newElement);
        }

        break;
      }
    }
    return this.state;
  }
}
