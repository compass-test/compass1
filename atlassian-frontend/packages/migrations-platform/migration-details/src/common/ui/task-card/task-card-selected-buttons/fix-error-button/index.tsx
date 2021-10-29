import React, { FC } from 'react';

import { AnalyticsButton } from '@atlassian/mpt-elements';

export type Props = {
  onClick: () => void;
  text?: string;
};

const FixErrorButton: FC<Props> = ({ onClick, text }) => {
  return (
    <AnalyticsButton
      analyticsId="migrationTaskFixErrorButton"
      testId="buttonFixError"
      onClick={onClick}
    >
      {text}
    </AnalyticsButton>
  );
};

export default FixErrorButton;
