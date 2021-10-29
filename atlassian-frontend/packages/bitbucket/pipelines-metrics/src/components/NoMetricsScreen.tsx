import React from 'react';

import Button from '@atlaskit/button';

import SearchErrorIllustration from './assets/SearchErrorIllustration';
import { EmptyScreenWrapper } from './styled';

type Props = {};

const NoMetricsScreen: React.FC<Props> = () => {
  return (
    <EmptyScreenWrapper data-testid="no-metrics-screen">
      <div>
        <SearchErrorIllustration />
        <h3>No metrics found</h3>
        <p>This step does not have any Memory or CPU usage metrics</p>
        <br />
        <Button
          appearance="subtle-link"
          spacing="none"
          href="https://support.atlassian.com/bitbucket-cloud/docs/step-metrics-troubleshooting/"
          target="_blank"
          rel="nofollow"
        >
          Learn more
        </Button>
      </div>
    </EmptyScreenWrapper>
  );
};

export default React.memo(NoMetricsScreen);
