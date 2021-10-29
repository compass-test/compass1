import React from 'react';

const AnalyticsChannelContext = React.createContext<{ channel?: string }>(
  undefined!,
);

export default AnalyticsChannelContext;
