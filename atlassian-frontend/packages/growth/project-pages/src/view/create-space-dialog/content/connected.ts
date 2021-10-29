import { connect, Dispatch } from 'react-redux';

import { changeSpaceName, createConfluenceSpace } from '../../../state/actions';
import { State } from '../../../state/types';
import {
  getUserEnteredSpaceName,
  isCreatingSpace,
  isUserEnteredSpaceNameInvalid,
} from '../../../state/ui/create-space/selectors';

import Content from './index';
import { StateProps, DispatchProps, OwnProps } from './types';

const mapStateToProps = (state: State) => ({
  spaceNameInvalid: isUserEnteredSpaceNameInvalid(state),
  userEnteredSpaceName: getUserEnteredSpaceName(state),
  isCreatingSpace: isCreatingSpace(state),
});

const mapDispatchToProps = (dispatch: Dispatch<State>) => ({
  onSpaceNameChanged: (value: string) => dispatch(changeSpaceName(value)),
  onCreate: () => dispatch(createConfluenceSpace()),
});

export default connect<StateProps, DispatchProps, OwnProps, State>(
  mapStateToProps,
  mapDispatchToProps,
)(Content);
