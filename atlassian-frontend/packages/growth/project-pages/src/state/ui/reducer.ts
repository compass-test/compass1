import { combineReducers } from 'redux';

import blueprints from './blueprints/reducer';
import connectSpaceDialog from './connect-space/reducer';
import createSpaceDialog from './create-space/reducer';

export default combineReducers({
  blueprints,
  connectSpaceDialog,
  createSpaceDialog,
});
