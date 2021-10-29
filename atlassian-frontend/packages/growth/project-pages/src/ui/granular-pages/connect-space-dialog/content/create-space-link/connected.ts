import { connect } from 'react-redux';

import { State } from '../../../../../state/types';
import { isConnectingSpace } from '../../../../../state/ui/connect-space/selectors';

import CreateSpaceLink from './index';

export default connect(
  (state: State) => ({
    isConnectingSpace: isConnectingSpace(state),
  }),
  {},
)(CreateSpaceLink);
