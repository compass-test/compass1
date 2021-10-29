import {
  connect,
  Dispatch,
  MapDispatchToProps,
  MapStateToProps,
} from 'react-redux';
import CrossJoin from './index';
import { State } from '../../state/types';
import { StateProps, OwnProps, DispatchProps } from './types';
import {
  fetchConfluenceAccessRequestCapabilities,
  fetchConfluenceCollaborators,
} from '../../state/actions';
import { getAccessRequestCapability } from '../../state/confluence/access-request-capabilities/selectors';
import { getConnectedSpace } from '../../state/confluence/connected-space/selectors';
import {
  getOrigin,
  getCloudId,
  getAccountId,
} from '../../state/context/selectors';
import { getCollaborators } from '../../state/confluence/collaborators/selectors';
import { getProject } from '../../state/project/selectors';

const mapStateToProps: MapStateToProps<StateProps, OwnProps, State> = (
  state: State,
): StateProps => ({
  connectedSpace: getConnectedSpace(state),
  accessRequestCapability: getAccessRequestCapability(state),
  origin: getOrigin(state),
  collaborators: getCollaborators(state),
  project: getProject(state),
  cloudId: getCloudId(state),
  accountId: getAccountId(state),
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = (
  dispatch: Dispatch<State>,
) => ({
  triggerConfluenceAccessRequestCheck: () =>
    dispatch(fetchConfluenceAccessRequestCapabilities()),
  triggerFetchConfluenceCollaborators: () =>
    dispatch(fetchConfluenceCollaborators()),
});

export default connect<StateProps, DispatchProps, OwnProps, State>(
  mapStateToProps,
  mapDispatchToProps,
)(CrossJoin);
