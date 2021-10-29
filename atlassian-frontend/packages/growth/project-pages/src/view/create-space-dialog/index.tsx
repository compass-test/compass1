import React, { PureComponent } from 'react';
import { ModalFooter, ModalHeader, ModalBody } from '@atlaskit/modal-dialog';
import styled from 'styled-components';

import extendModalDialogWithAnalytics from '../common/modal-dialog-with-analytics';
import {
  connectUIAnalytics,
  AnalyticsSource,
  ScreenTypes,
} from '../../common/analytics/util';

import ViewTracker from '../../common/analytics/view-tracker';
import { OwnProps, StateProps, Props } from './types';

const FullWidthContainer = styled.div`
  width: 100%;
`;

class CreateSpaceDialog extends PureComponent<Props> {
  static defaultProps = {
    ModalDialog: null,
  };

  ModalDialogImpl: any;

  constructor(props: Props) {
    super(props);
    const { ModalDialog } = props;
    this.ModalDialogImpl = extendModalDialogWithAnalytics(
      'createSpaceModal',
      ModalDialog as any,
    );
  }

  onDismissed = (_: any, analyticsEvent: any) => {
    const { onCancel, onDismiss } = this.props;
    onCancel && onCancel();
    onDismiss(analyticsEvent);
  };

  render() {
    const {
      Header,
      Content,
      Footer,
      isOpen,
      onCancel,
      onOpenComplete,
    } = this.props;

    // eslint-disable-next-line no-undef
    if (__SERVER__) {
      return null;
    }
    return (
      isOpen && (
        <this.ModalDialogImpl
          onOpenComplete={onOpenComplete}
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
              <Footer onCancel={onCancel} />
            </FullWidthContainer>
          </ModalFooter>
          <ViewTracker />
        </this.ModalDialogImpl>
      )
    );
  }
}

export default AnalyticsSource<OwnProps & StateProps>(
  'createSpace',
  ScreenTypes.MODAL,
)(
  connectUIAnalytics<OwnProps & StateProps>({
    onDismiss: 'dismissed',
  })(CreateSpaceDialog),
);
