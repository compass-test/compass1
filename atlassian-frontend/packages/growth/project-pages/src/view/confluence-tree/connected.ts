import { connect } from 'react-redux';

import { showError } from '../../state/actions';
import {
  getBlueprintsState,
  getProjectSpaceKey,
  getProjectSpacePageId,
  getProjectPageLinkedId,
} from '../../state/confluence/connected-space/selectors';
import { getCloudId } from '../../state/context/selectors';
import { getProjectPagesContent } from '../../state/ui/selectors';
import { getLocale } from '../../state/context/selectors';

import { State } from '../../state/types';
import { StateProps, OwnProps } from './types';

import ConfluenceTree from './index';

export default connect<StateProps, {}, OwnProps, State>((state: State) => ({
  cloudId: getCloudId(state),
  contentId: getProjectPageLinkedId(state) || getProjectSpacePageId(state),
  spaceKey: getProjectSpaceKey(state),
  onError: () => showError(),
  permissionState: getBlueprintsState(state),
  projectPagesContent: getProjectPagesContent(state),
  locale: getLocale(state),
}))(ConfluenceTree);
