import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';

import { showError } from '../../state/actions';
import {
  getBlueprintsState,
  getProjectSpaceKey,
  getProjectSpacePageId,
  getProjectPageLinkedId,
  getProjectSpacePageTitleHasBeenFetched,
} from '../../state/confluence/connected-space/selectors';
import { OK as PERMISSION_OK } from '../../state/confluence/connected-space/types';
import { getProjectPagesContent } from '../../state/ui/selectors';
import {
  CONFTREE_ACCESS_LOADING,
  CONFTREE_NO_ACCESS_TEASER,
} from '../../state/ui/types';

import { State } from '../../state/types';
import {
  StateProps,
  OwnProps,
  DispatchProps,
  Props as MergedProps,
} from './types';

import { PageTree } from './index';

const mapStateToProps: MapStateToProps<StateProps, OwnProps, State> = (
  state: State,
) => ({
  spaceKey: getProjectSpaceKey(state),
  contentId: getProjectPageLinkedId(state) || getProjectSpacePageId(state),
  permissionState: getBlueprintsState(state),
  projectPagesContent: getProjectPagesContent(state),
  projectSpacePageTitleHasBeenFetched: getProjectSpacePageTitleHasBeenFetched(
    state,
  ),
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = (
  dispatch,
) => ({
  onError: () => dispatch(showError()),
});

export default connect<StateProps, DispatchProps, OwnProps, MergedProps, State>(
  mapStateToProps,
  mapDispatchToProps,
  (
    {
      permissionState,
      projectPagesContent,
      projectSpacePageTitleHasBeenFetched,
      contentId,
      spaceKey,
    },
    dispatchProps,
    ownProps,
  ) => {
    const shouldPopulateDataFields =
      ![CONFTREE_NO_ACCESS_TEASER, CONFTREE_ACCESS_LOADING].includes(
        projectPagesContent,
      ) && projectSpacePageTitleHasBeenFetched;
    return {
      contentId: shouldPopulateDataFields ? contentId : null,
      spaceKey: shouldPopulateDataFields ? spaceKey : null,
      readOnly: permissionState !== PERMISSION_OK,
      ...dispatchProps,
      ...ownProps,
    };
  },
)(PageTree);
