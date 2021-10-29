import { StateListener, StateListenerConfig } from '../StateListener';
import { Camera } from '../models/Camera';
import { Interaction } from '../models/Interaction';
import { Vector2 } from '../../common/math/Vector2';
import { RenderEventListener } from '../../view/renderers/Renderer';

export class CameraStateListener implements StateListener<Camera> {
  public config: StateListenerConfig<Camera> = {
    listensTo: ['pan', 'zoom'],
  };

  constructor(private state: Camera, private view: RenderEventListener) {}

  public init(): void {}

  public update(interaction: Interaction): Camera {
    switch (interaction.type) {
      case 'pan':
        this.state.updatePosition(
          new Vector2(
            interaction.payload.position.x,
            interaction.payload.position.y,
          ),
        );

        this.view.viewportUpdate(this.state);

        break;

      case 'zoom':
        this.state.updateScale(interaction.payload.delta);

        this.view.viewportUpdate(this.state);
        break;
    }

    return this.state;
  }
}
