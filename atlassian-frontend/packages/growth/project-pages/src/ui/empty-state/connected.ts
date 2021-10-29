import { connect, MapStateToProps } from 'react-redux';
import { State } from '../../state/types';
import EmptyState from './index';
import { StateProps, OwnProps } from './types';
import {
  getProjectSpaceKey,
  getProjectSpacePageId,
  getProjectPageLinkedId,
} from '../../state/confluence/connected-space/selectors';

const mapStateToProps: MapStateToProps<StateProps, OwnProps, State> = (
  state: State,
) => ({
  spaceKey: getProjectSpaceKey(state),
  contentId: getProjectPageLinkedId(state) || getProjectSpacePageId(state),
});

export default connect<StateProps, {}, OwnProps, State>(mapStateToProps)(
  EmptyState,
);
