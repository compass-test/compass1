import React from 'react';
import { AnalyticsContext } from '@atlaskit/analytics-next';
import { useFeatureFlags } from '../../controllers/feature-flags';

interface Props {
  children: React.ReactNode;
}

const EmbeddedPagesAnalyticsContext = ({ children }: Props) => {
  const {
    isEmbeddedPagesExperiment,
    isProjectPagesProductionisation,
  } = useFeatureFlags();
  return (
    <AnalyticsContext
      data={{
        attributes: {
          isProjectPagesProductionisation,
          isEmbeddedPagesExperiment,
          growthInitiative: 'cross-flow',
        },
      }}
    >
      {children}
    </AnalyticsContext>
  );
};

export default EmbeddedPagesAnalyticsContext;
