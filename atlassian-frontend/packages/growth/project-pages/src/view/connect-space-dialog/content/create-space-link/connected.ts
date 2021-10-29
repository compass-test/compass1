import { connect } from 'react-redux';

import { State } from '../../../../state/types';
import { isConnectingSpace } from '../../../../state/ui/connect-space/selectors';

import CreateSpaceLink from './index';
import { OwnProps, StateProps } from './types';

const mapStateToProps = (state: State) => ({
  isConnectingSpace: isConnectingSpace(state),
});

export default connect<StateProps, {}, OwnProps, State>(mapStateToProps)(
  CreateSpaceLink,
);
