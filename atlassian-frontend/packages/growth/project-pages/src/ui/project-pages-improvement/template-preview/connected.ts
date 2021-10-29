import { connect } from 'react-redux';
import {
  showXflowDialogError,
  checkProductsLicenceState,
} from '../../../state/actions';
import TemplatePreview from './index';
import { TemplatePreviewDispatchProps } from './types';

export default connect<{}, TemplatePreviewDispatchProps>(null, (dispatch) => ({
  onOpenCrossFlowError: () => dispatch(showXflowDialogError()),
  onSuccessfulCrossFlowExpansion: () => dispatch(checkProductsLicenceState()),
}))(TemplatePreview);
