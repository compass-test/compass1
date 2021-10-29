import React from 'react';

import TrashIllustration from './assets/TrashIllustration';
import { EmptyScreenWrapper } from './styled';

type Props = {};

const MetricsExpiredScreen: React.FC<Props> = () => {
  return (
    <EmptyScreenWrapper data-testid="metrics-expired-screen">
      <div>
        <TrashIllustration />
        <h3>Metrics have expired</h3>
        <p>Metrics are stored for 90 days</p>
      </div>
    </EmptyScreenWrapper>
  );
};

export default React.memo(MetricsExpiredScreen);
