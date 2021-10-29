import { connect, Dispatch } from 'react-redux';

import {
  setSelectedSpace,
  showCreateSpaceDialog,
} from '../../../state/actions';
import { State } from '../../../state/types';
import { SpacesData } from '../../../state/confluence/spaces/types';
import Content from './index';
import { OwnProps, DispatchProps } from './types';

const mapDispatchToProps = (dispatch: Dispatch<State>) => ({
  onSpaceSelected: (value: SpacesData) => dispatch(setSelectedSpace(value)),
  onCreateSpace: () => dispatch(showCreateSpaceDialog()),
});

export default connect<{}, DispatchProps, OwnProps>(
  null,
  mapDispatchToProps,
)(Content);
