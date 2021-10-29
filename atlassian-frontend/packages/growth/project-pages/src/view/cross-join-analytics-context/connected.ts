import { connect, MapStateToProps } from 'react-redux';
import { getAccessRequestCapability } from '../../state/confluence/access-request-capabilities/selectors';
import {
  getConfluenceEdition,
  getJswEdition,
  isSpaceConnected,
} from '../../state/confluence/connected-space/selectors';
import { OwnProps, StateProps } from './types';
import { State } from '../../state/types';
import View from './index';

const mapStateToProps: MapStateToProps<StateProps, OwnProps, State> = (
  state: State,
): StateProps => ({
  accessRequestCapability: getAccessRequestCapability(state),
  isSpaceConnected: isSpaceConnected(state),
  confluenceEdition: getConfluenceEdition(state),
  jswEdition: getJswEdition(state),
});

export default connect<StateProps, {}, OwnProps, State>(mapStateToProps)(View);
