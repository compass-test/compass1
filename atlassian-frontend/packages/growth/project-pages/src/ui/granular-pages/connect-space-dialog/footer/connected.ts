import { connect } from 'react-redux';

import {
  connectConfluenceSpace,
  fetchConfluenceSpaces,
  hideConnectSpaceDialog,
} from '../../../../state/actions';
import { State } from '../../../../state/types';
import {
  getConnectSpaceDialogErrorState,
  isConnectingSpace,
  isSubmitAllowed,
  getSelectedSpace,
} from '../../../../state/ui/connect-space/selectors';

import Footer from './index';

export default connect(
  (state: State) => ({
    errorState: getConnectSpaceDialogErrorState(state),
    isSubmitAllowed: isSubmitAllowed(state),
    isSubmitting: isConnectingSpace(state),
    selectedSpace: getSelectedSpace(state),
  }),
  (dispatch: (arg0: any) => void) => ({
    onFetch: () => dispatch(fetchConfluenceSpaces()),
    onConnect: () => dispatch(connectConfluenceSpace()),
    onCancel: () => dispatch(hideConnectSpaceDialog()),
  }),
)(Footer as any);
