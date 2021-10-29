import { connect, MapStateToProps } from 'react-redux';
import { View } from './index';
import { State } from '../../state/types';
import { StateProps, OwnProps } from './types';
import { getIsConnectedToPage } from '../../state/confluence/connected-space/selectors';

const mapStateToProps: MapStateToProps<StateProps, OwnProps, State> = (
  state,
) => ({
  isConnectedToPage: getIsConnectedToPage(state),
});

export default connect(mapStateToProps)(View);
