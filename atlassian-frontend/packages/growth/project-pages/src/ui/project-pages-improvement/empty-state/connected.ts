import { connect, Dispatch, MapStateToProps } from 'react-redux';
import { State } from '../../../state/types';
import { redirectToConfluenceTemplateDeepLink } from '../../../state/actions';
import EmptyState from './index';
import { DispatchProps, StateProps, OwnProps } from './types';
import { getOrigin } from '../../../state/context/selectors';

const mapStateToProps: MapStateToProps<StateProps, OwnProps, State> = (
  state: State,
) => ({
  origin: getOrigin(state),
});

export default connect<StateProps, DispatchProps, OwnProps, State>(
  mapStateToProps,
  (dispatch: Dispatch<State>) => ({
    openTemplateSelectSideBar: () =>
      dispatch(
        redirectToConfluenceTemplateDeepLink(null, false, undefined, true),
      ),
  }),
)(EmptyState);
