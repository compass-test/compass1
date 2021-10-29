import {
  connect,
  Dispatch,
  MapDispatchToProps,
  MapStateToProps,
} from 'react-redux';
import {
  isSpaceConnected,
  getProjectPageLinkedId,
  getProjectSpacePageId,
  getConnectedSpaceOrPageTitle,
  getConnectedSpaceOrPageUrl,
  getIsConnectedToPage,
  getProjectSpaceIcon,
} from '../../../state/confluence/connected-space/selectors';
import { State } from '../../../state/types';
import {
  showConnectSpaceDialog,
  fetchConnectedSpaceOrPageTitle,
} from '../../../state/actions';
import { StateProps, DispatchProps, OwnProps } from './types';
import MoreMenu from './index';

const mapStateToProps: MapStateToProps<StateProps, OwnProps, State> = (
  state: State,
) => ({
  isSpaceConnected: isSpaceConnected(state),
  spaceOrPageId: getProjectPageLinkedId(state) || getProjectSpacePageId(state),
  spaceOrPageTitle: getConnectedSpaceOrPageTitle(state),
  spaceOrPageLink: getConnectedSpaceOrPageUrl(state),
  isConnectedToPage: getIsConnectedToPage(state),
  spaceIcon: getProjectSpaceIcon(state),
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = (
  dispatch: Dispatch<State>,
) => ({
  triggerShowConnectSpaceDialog: () => {
    dispatch(showConnectSpaceDialog());
  },
  triggerFetchConnectedSpacePageTitle: () =>
    dispatch(fetchConnectedSpaceOrPageTitle()),
});

export default connect<StateProps, DispatchProps, OwnProps, State>(
  mapStateToProps,
  mapDispatchToProps,
)(MoreMenu);
