import {
  connect,
  Dispatch,
  MapDispatchToProps,
  MapStateToProps,
} from 'react-redux';
import { State } from '../../../state/types';

import {
  redirectToConfluenceTemplateDeepLink,
  showError,
} from '../../../state/actions';

import PostExpand from './index';
import { DispatchProps, OwnProps, StateProps } from './types';
import { areTemplatesEnabled } from '../../../state/ui/blueprints/selectors';
import {
  getBlueprints,
  getProjectPageLinkedId,
  getProjectSpaceKey,
  getProjectSpacePageId,
} from '../../../state/confluence/connected-space/selectors';
import {
  getProjectPagesContent,
  isSpaceOrPageHomePageNull,
} from '../../../state/ui/selectors';
import {
  getOrigin,
  getAccountId,
  getCloudId,
} from '../../../state/context/selectors';
import { getAccessRequestCapability } from '../../../state/confluence/access-request-capabilities/selectors';
import { getProject } from '../../../state/project/selectors';
import { doesUserHaveConfluenceAccess } from '../../../state/confluence/user/selectors';

const mapStateToProps: MapStateToProps<StateProps, OwnProps, State> = (
  state: State,
): StateProps => ({
  blueprints: getBlueprints(state),
  areTemplatesEnabled:
    areTemplatesEnabled(state) && !isSpaceOrPageHomePageNull(state),
  projectPagesContent: getProjectPagesContent(state),
  origin: getOrigin(state),
  accessRequestCapability: getAccessRequestCapability(state),
  project: getProject(state),
  spaceKey: getProjectSpaceKey(state),
  contentId: getProjectPageLinkedId(state) || getProjectSpacePageId(state),
  cloudId: getCloudId(state),
  accountId: getAccountId(state),
  isPostJoin: doesUserHaveConfluenceAccess(state) || false,
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = (
  dispatch: Dispatch<State>,
) => ({
  redirectToConfluenceTemplate: (
    templateId: string | null | undefined,
    skipHowToUse: boolean,
    pageTitle?: string,
  ) =>
    dispatch(
      redirectToConfluenceTemplateDeepLink(templateId, skipHowToUse, pageTitle),
    ),
  showError: () => dispatch(showError()),
});

export default connect<StateProps, DispatchProps, OwnProps, State>(
  mapStateToProps,
  mapDispatchToProps,
)(PostExpand);
