import { connect, Dispatch } from 'react-redux';

import {
  connectConfluenceSpace,
  fetchConfluenceSpaces,
  hideConnectSpaceDialog,
} from '../../../state/actions';
import { State } from '../../../state/types';
import {
  getConnectSpaceDialogErrorState,
  isConnectingSpace,
  isSubmitAllowed,
} from '../../../state/ui/connect-space/selectors';

import Footer from './index';
import { StateProps, OwnProps, DispatchProps } from './types';

const mapStateToProps = (state: State) => ({
  errorState: getConnectSpaceDialogErrorState(state),
  isSubmitAllowed: isSubmitAllowed(state),
  isSubmitting: isConnectingSpace(state),
});

const mapDispatchToProps = (dispatch: Dispatch<State>) => ({
  onFetch: () => dispatch(fetchConfluenceSpaces()),
  onConnect: () => dispatch(connectConfluenceSpace()),
  onCancel: () => dispatch(hideConnectSpaceDialog()),
});

export default connect<StateProps, DispatchProps, OwnProps, State>(
  mapStateToProps,
  mapDispatchToProps,
)(Footer);
