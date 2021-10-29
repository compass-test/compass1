import React from 'react';

import AnalyticsButton from './AnalyticsButton';

type Props = {
  onClick: React.MouseEventHandler;
};

const BackButton = ({ onClick }: Props) => (
  <AnalyticsButton
    analyticsId="backButton"
    testId="footer-back-button"
    appearance="subtle"
    onClick={onClick}
  >
    Back
  </AnalyticsButton>
);

export default BackButton;
