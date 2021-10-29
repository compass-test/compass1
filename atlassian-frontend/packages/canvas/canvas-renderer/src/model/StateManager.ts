import { Interaction } from './models/Interaction';
import { StateListener } from './StateListener';

export class StateManager {
  public constructor(
    stateListeners: StateListener<any>[], // TODO fix
    private listeners: Record<
      Interaction['type'],
      StateListener<any>[] // TODO fix
    > = {
      drag: [],
      'drag-start': [],
      'drag-end': [],
      pan: [],
      zoom: [],
      insert: [],
      convert: [],
      connect: [],
      'dbl-click': [],
    },
  ) {
    for (const listener of stateListeners) {
      listener.config.listensTo.forEach(interactionType => {
        this.listeners[interactionType].push(listener);
      });
    }
  }

  public init() {
    Object.values(this.listeners)
      .flat()
      .forEach(listener => listener.init());
  }

  public update = (interaction: Interaction) => {
    this.listeners[interaction.type].forEach(listener =>
      listener.update(interaction),
    );
  };

  public dispose() {
    // TODO add a dispose method.
  }
}
