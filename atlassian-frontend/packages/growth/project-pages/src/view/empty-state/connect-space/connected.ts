import { connect } from 'react-redux';
import {
  fetchConfluenceSpaces,
  showConnectSpaceDialog,
} from '../../../state/actions';
import ConnectSpace from './index';
import { DispatchProps, OwnProps } from './types';

export default connect<{}, DispatchProps, OwnProps>(null, (dispatch) => ({
  showConnectSpaceDialog: () => {
    dispatch(showConnectSpaceDialog());
    dispatch(fetchConfluenceSpaces());
  },
}))(ConnectSpace);
