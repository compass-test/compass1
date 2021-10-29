import AkModalDialog from '@atlaskit/modal-dialog';
import { ComponentClass } from 'react-redux';
import { ComponentWithAnalytics } from '../../common/analytics/util';

export default (name: string, Component: ComponentClass<any>) =>
  ComponentWithAnalytics(name, {
    onClose: 'closed',
  })(Component || AkModalDialog);
