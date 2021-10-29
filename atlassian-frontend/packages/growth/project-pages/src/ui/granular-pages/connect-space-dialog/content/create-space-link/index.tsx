import React, { PureComponent } from 'react';
import { injectIntl, IntlShape, InjectedIntlProps } from 'react-intl';
import styled from 'styled-components';
import Button from '@atlaskit/button/custom-theme-button';
import { gridSize } from '@atlaskit/theme/constants';
import UIAnalyticsEvent from '@atlaskit/analytics-next/UIAnalyticsEvent';
import messages from './messages';

const Container = styled.div`
  margin-top: ${gridSize}px;
`;

type Props = {
  intl: IntlShape;
  onCreateSpace: (analyticsEvent: UIAnalyticsEvent) => void;
  isConnectingSpace: boolean;
};

class CreateSpaceLink extends PureComponent<Props & InjectedIntlProps> {
  render() {
    const {
      intl: { formatMessage },
    } = this.props;
    const { onCreateSpace, isConnectingSpace } = this.props;

    return (
      <Container>
        <Button
          spacing="none"
          appearance="link"
          onClick={(event, analyticsEvent) => onCreateSpace(analyticsEvent)}
          isDisabled={isConnectingSpace}
        >
          {formatMessage(messages.linkText)}
        </Button>
      </Container>
    );
  }
}

export default injectIntl(CreateSpaceLink);
