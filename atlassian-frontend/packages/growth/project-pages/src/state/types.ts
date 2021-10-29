import { ConfluenceState } from './confluence/types';
import { ContextState } from './context/types';
import { FlagsState } from './flags/types';
import { ProjectState } from './project/types';
import { UIState } from './ui/types';
import { ExternalState } from './external/types';
import { FeatureFlagsState } from './feature-flags/types';

export interface State {
  confluence: ConfluenceState;
  context: ContextState;
  external: ExternalState;
  project: ProjectState;
  ui: UIState;
  flags: FlagsState;
  featureFlags: FeatureFlagsState;
}
