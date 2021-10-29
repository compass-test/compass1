import React from 'react';

import AnalyticsButton, { AnalyticsButtonProps } from './AnalyticsButton';

type Props = AnalyticsButtonProps;

const ContinueButton = (props: Props) => (
  <AnalyticsButton
    {...props}
    appearance="primary"
    testId="footer-continue-button"
  />
);

ContinueButton.defaultProps = {
  autoFocus: false,
  isDisabled: false,
};

export default ContinueButton;
