import { connect, MapStateToProps } from 'react-redux';

import { getConnectionState } from '../../../state/confluence/connected-space/selectors';
import { State } from '../../../state/types';

import SpaceConnectionTracker from './index';
import { StateProps, OwnProps } from './types';

const mapStateToProps: MapStateToProps<StateProps, OwnProps, State> = (
  state,
) => ({
  connectionState: getConnectionState(state),
});

export default connect<StateProps, {}, OwnProps, State>(mapStateToProps)(
  SpaceConnectionTracker,
);
