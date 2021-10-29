import {
  connect,
  Dispatch,
  MapStateToProps,
  MapDispatchToProps,
} from 'react-redux';

import {
  checkProductsLicenceState,
  fetchConfluenceSpaces,
  hideConnectSpaceDialog,
  showConnectSpaceDialog,
  showError,
} from '../state/actions';
import {
  getAccountId,
  getCloudId,
  getConfluenceState,
  getOrigin,
} from '../state/context/selectors';
import { State } from '../state/types';
import { getProjectPagesContent, getIsPostExpand } from '../state/ui/selectors';
import { isThereATemplatesUIError } from '../state/ui/blueprints/selectors';
import { getProjectSpaceKey } from '../state/confluence/connected-space/selectors';

import ConnectSpaceDialog from './connect-space-dialog/connected';
import CreateSpaceDialog from './create-space-dialog/connected';
import GranularConnectSpaceDialog from '../ui/granular-pages/connect-space-dialog/connected';
import GranularMoreMenu from '../ui/granular-pages/more-menu/connected';
import ConfluenceActivating from './empty-state/confluence-activating';
import ConnectSpace from './empty-state/connect-space/connected';
import ServerError from './empty-state/server-error';
import Flags from './flags/connected';
import MoreMenu from './more-menu/connected';
import PagesHeading from './pages-heading';
import View from './index';
import { StateProps, OwnProps, DispatchProps } from './types';
import { getProject } from '../state/project/selectors';

const mapStateToProps: MapStateToProps<StateProps, OwnProps, State> = (
  state: State,
  { hasConfluence }: OwnProps,
): StateProps => ({
  ConnectSpaceDialog,
  CreateSpaceDialog,
  GranularConnectSpaceDialog,
  GranularMoreMenu,
  ConnectSpace,
  ServerError,
  ConfluenceActivating,
  PagesHeading,
  Flags,
  MoreMenu,
  projectPagesContent: getProjectPagesContent(state),
  confluenceState: getConfluenceState(state),
  isPostExpand: getIsPostExpand(state, hasConfluence),
  isThereATemplatesUIError: isThereATemplatesUIError(state),
  origin: getOrigin(state),
  cloudId: getCloudId(state),
  project: getProject(state),
  projectSpaceKey: getProjectSpaceKey(state),
  projectSpacePageTitleHasBeenFetched:
    state.confluence.connectedSpace.projectSpacePageTitleHasBeenFetched,
  accountId: getAccountId(state),
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = (
  dispatch: Dispatch<State>,
) => ({
  triggerProductsLicenceCheck: () => dispatch(checkProductsLicenceState()),
  triggerShowConnectSpaceDialog: () => {
    dispatch(showConnectSpaceDialog());
    dispatch(fetchConfluenceSpaces());
  },
  triggerHideConnectSpaceDialog: () => dispatch(hideConnectSpaceDialog()),
  triggerErrorFlag: () => dispatch(showError()),
});

export default connect<StateProps, DispatchProps, OwnProps, State>(
  mapStateToProps,
  mapDispatchToProps,
)(View);
