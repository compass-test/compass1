import { connect } from 'react-redux';

import { State } from '../../../../../state/types';
import {
  isConnectingSpace,
  isDisconnectedTemplatesClick,
} from '../../../../../state/ui/connect-space/selectors';

import SpacePicker from './index';
import { getCloudId } from '../../../../../state/context/selectors';

export default connect(
  (state: State) => ({
    isConnectingSpace: isConnectingSpace(state),
    isDisconnectedTemplatesClick: isDisconnectedTemplatesClick(state),
    cloudId: getCloudId(state),
  }),
  {},
)(SpacePicker);
