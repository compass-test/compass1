import { combineReducers } from 'redux';

import connectedSpace from './connected-space/reducer';
import spaces from './spaces/reducer';
import user from './user/reducer';
import accessRequestCapabilities from './access-request-capabilities/reducer';
import collaborators from './collaborators/reducer';

export default combineReducers({
  connectedSpace,
  spaces,
  user,
  accessRequestCapabilities,
  collaborators,
});
