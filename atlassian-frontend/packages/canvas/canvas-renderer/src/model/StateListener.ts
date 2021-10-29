import { Interaction } from './models/Interaction';

export interface StateListenerConfig<State> {
  listensTo: Interaction['type'][];
}

export interface StateListener<State> {
  config: StateListenerConfig<State>;
  update(interaction: Interaction): State;
  init(): void;
}
