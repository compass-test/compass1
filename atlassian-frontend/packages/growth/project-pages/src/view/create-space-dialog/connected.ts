import { connect, MapStateToProps } from 'react-redux';
import { State } from '../../state/types';
import { isCreateSpaceDialogOpen } from '../../state/ui/create-space/selectors';

import Content from './content/connected';
import Footer from './footer/connected';
import Header from './header/connected';
import Dialog from './index';

import { StateProps, OwnProps } from './types';

const mapStateToProps: MapStateToProps<StateProps, OwnProps, State> = (
  state: State,
) => ({
  Header,
  Content,
  Footer,
  isOpen: isCreateSpaceDialogOpen(state),
});

export default connect(mapStateToProps)(Dialog);
