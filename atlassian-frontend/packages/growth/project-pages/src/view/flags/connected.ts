import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';

import { dismissError, dismissSuccessFlag } from '../../state/actions';
import {
  getConnectedSpaceName,
  getIsConnectedToPage,
  getCustomFlagDescription,
  getCustomFlagTitle,
  isThereAnError,
  successfullyConnectedSpace,
} from '../../state/flags/selectors';
import { State } from '../../state/types';
import { StateProps, DispatchProps, OwnProps } from './types';
import Flags from './index';

const mapStateToProps: MapStateToProps<StateProps, OwnProps, State> = (
  state: State,
) => ({
  hasErrors: isThereAnError(state),
  showSuccessFlag: successfullyConnectedSpace(state),
  connectedSpaceOrPageName: getConnectedSpaceName(state),
  isConnectedToPage: getIsConnectedToPage(state),
  title: getCustomFlagTitle(state),
  description: getCustomFlagDescription(state),
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = (
  dispatch,
) => ({
  onErrorDismiss: () => dispatch(dismissError()),
  onSuccessDismiss: () => dispatch(dismissSuccessFlag()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Flags);
