import { connect } from 'react-redux';

import {
  setSelectedSpace,
  showCreateSpaceDialog,
} from '../../../../state/actions';

import CreateSpaceLink from './create-space-link/connected';
import SpacePicker from './space-picker/connected';
import Content from './index';

export default connect(
  () => ({
    SpacePicker,
    CreateSpaceLink,
  }),
  (dispatch: (arg0: any) => void) => ({
    onSpaceSelected: (value: any) => dispatch(setSelectedSpace(value)),
    onCreateSpace: () => dispatch(showCreateSpaceDialog()),
  }),
)(Content as any);
