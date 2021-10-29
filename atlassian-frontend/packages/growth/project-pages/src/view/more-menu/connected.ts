import { connect, Dispatch, MapDispatchToProps } from 'react-redux';

import {
  fetchConfluenceSpaces,
  showConnectSpaceDialog,
} from '../../state/actions';
import { isSpaceConnected } from '../../state/confluence/connected-space/selectors';
import { getCloudId } from '../../state/context/selectors';
import { State } from '../../state/types';
import { StateProps, DispatchProps, OwnProps } from './types';
import MoreMenu from './index';

const mapStateToProps = (state: State) => ({
  isSpaceConnected: isSpaceConnected(state),
  cloudId: getCloudId(state),
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = (
  dispatch: Dispatch<State>,
) => ({
  triggerConnectToSpace: () => {
    dispatch(showConnectSpaceDialog());
    dispatch(fetchConfluenceSpaces());
  },
});

export default connect<StateProps, DispatchProps, OwnProps, State>(
  mapStateToProps,
  mapDispatchToProps,
)(MoreMenu as any);
