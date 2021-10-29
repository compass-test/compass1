import React, { PureComponent } from 'react';
import { ModalFooter, ModalHeader, ModalBody } from '@atlaskit/modal-dialog';
import styled from 'styled-components';
import { OwnProps, StateProps, Props } from './types';

import extendModalDialogWithAnalytics from '../common/modal-dialog-with-analytics';
import {
  AnalyticsSource,
  ScreenTypes,
  connectUIAnalytics,
} from '../../common/analytics/util';
import ViewTracker from '../../common/analytics/view-tracker';

const FullWidthContainer = styled.div`
  width: 100%;
`;

class ConnectSpaceDialog extends PureComponent<Props> {
  static defaultProps = {
    ModalDialog: null,
  };
  ModalDialogImpl: any;

  constructor(props: Props) {
    super(props);
    const { ModalDialog } = props;
    this.ModalDialogImpl = extendModalDialogWithAnalytics(
      'connectSpaceModal',
      ModalDialog as React.ComponentClass<any>,
    );
  }

  onDismissed = (_: any, analyticsEvent: any) => {
    const { onCancel, onDismiss } = this.props;
    onCancel && onCancel();
    onDismiss(analyticsEvent);
  };

  render() {
    const { Header, Content, Footer, isOpen } = this.props;
    // eslint-disable-next-line no-undef
    if (__SERVER__) {
      return null;
    }
    return (
      isOpen && (
        <form>
          <this.ModalDialogImpl
            width={'small'}
            shouldCloseOnEscapePress
            onClose={this.onDismissed}
          >
            <ModalHeader>
              <FullWidthContainer>
                <Header />
              </FullWidthContainer>
            </ModalHeader>
            <ModalBody>
              <Content />
            </ModalBody>
            <ModalFooter>
              <FullWidthContainer>
                <Footer />
              </FullWidthContainer>
            </ModalFooter>
            <ViewTracker />
          </this.ModalDialogImpl>
        </form>
      )
    );
  }
}

export default AnalyticsSource<OwnProps & StateProps>(
  'connectSpace',
  ScreenTypes.MODAL,
)(
  connectUIAnalytics<OwnProps & StateProps>({
    onDismiss: 'dismissed',
  })(ConnectSpaceDialog),
);
