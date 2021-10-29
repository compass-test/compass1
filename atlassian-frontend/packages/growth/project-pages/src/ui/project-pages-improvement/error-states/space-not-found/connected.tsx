import { connect, MapDispatchToProps, Dispatch } from 'react-redux';
import { State } from '../../../../state/types';
import {
  fetchConfluenceSpaces,
  showConnectSpaceDialog,
} from '../../../../state/actions';
import SpaceNotFound from './index';
import { DispatchProps } from './types';

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = (
  dispatch: Dispatch<State>,
) => ({
  showConnectSpaceDialog: () => {
    dispatch(showConnectSpaceDialog());
    dispatch(fetchConfluenceSpaces());
  },
});

export default connect<{}, DispatchProps, {}, State>(
  null,
  mapDispatchToProps,
)(SpaceNotFound);
