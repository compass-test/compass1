import { connect, Dispatch } from 'react-redux';

import { changeSpaceName, createConfluenceSpace } from '../../../state/actions';
import { getSuggestedKey } from '../../../state/context/selectors';
import { State } from '../../../state/types';
import {
  getCreateSpaceDialogErrorState,
  getUserEnteredSpaceName,
  isCreatingSpace,
  isGeneratingKey,
  isUserEnteredSpaceNameInvalid,
} from '../../../state/ui/create-space/selectors';

import Footer from './index';
import { StateProps, DispatchProps, OwnProps } from './types';

export const mapStateToProps = (state: State) => ({
  isCreatingSpace: isCreatingSpace(state),
  isGeneratingKey: isGeneratingKey(state),
  suggestedKey: getSuggestedKey(state),
  userEnteredSpaceName: getUserEnteredSpaceName(state),
  userEnteredSpaceNameInvalid: isUserEnteredSpaceNameInvalid(state),
  errorState: getCreateSpaceDialogErrorState(state),
});

export const mapDispatchToProps = (dispatch: Dispatch<State>) => ({
  onSpaceNameChanged: (value: any) => dispatch(changeSpaceName(value)),
  onCreate: () => dispatch(createConfluenceSpace()),
});

export default connect<StateProps, DispatchProps, OwnProps, State>(
  mapStateToProps,
  mapDispatchToProps,
)(Footer);
