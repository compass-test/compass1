import { connect, MapStateToProps } from 'react-redux';
import { State } from '../../../state/types';
import { isConnectSpaceDialogOpen } from '../../../state/ui/connect-space/selectors';

import Content from './content/connected';
import Footer from './footer/connected';
import Header from './header/connected';
import Dialog from './index';

import { StateProps, OwnProps } from '../../../view/connect-space-dialog/types';

const mapStateToProps: MapStateToProps<StateProps, OwnProps, State> = (
  state: State,
) => ({
  Header,
  Content,
  Footer,
  isOpen: isConnectSpaceDialogOpen(state),
});

export default connect(mapStateToProps)(Dialog);
