import React from 'react';

import DownloadIllustration from './assets/DownloadIllustration';
import { EmptyScreenWrapper } from './styled';

type Props = {};

const WaitingForMetrics: React.FC<Props> = () => {
  return (
    <EmptyScreenWrapper data-testid="waiting-for-metrics-screen">
      <div>
        <DownloadIllustration />
        <h3>Memory and CPU usage for this step will appear here</h3>
        <p>Check back in a while to view metrics</p>
      </div>
    </EmptyScreenWrapper>
  );
};

export default React.memo(WaitingForMetrics);
