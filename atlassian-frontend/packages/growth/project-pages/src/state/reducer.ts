import { combineReducers } from 'redux';

import confluence from './confluence/reducer';
import context from './context/reducer';
import external from './external/reducer';
import featureFlags from './feature-flags/reducer';
import flags from './flags/reducer';
import project from './project/reducer';
import ui from './ui/reducer';

export default combineReducers({
  confluence,
  context,
  external,
  project,
  ui,
  flags,
  featureFlags,
});
