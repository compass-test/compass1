import React from 'react';

import AnalyticsCard, { IconCardBody } from '../src';

export default function EmptyAnalyticsCard() {
  const noDataDetails = {
    verb: 'performed',
    noun: 'searches',
  };
  return (
    <div style={{ padding: 50, width: 400 }}>
      <AnalyticsCard
        data-testid="analytics-card"
        title="Trending searches"
        href="#"
      >
        <IconCardBody content={[]} noDataDetails={noDataDetails} />
      </AnalyticsCard>
    </div>
  );
}
