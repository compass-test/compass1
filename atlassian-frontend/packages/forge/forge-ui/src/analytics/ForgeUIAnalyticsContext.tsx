import React from 'react';
import { AnalyticsContext } from '@atlaskit/analytics-next';
import { extensionIdToAnalyticsAttributes } from './extensionIdToAnalyticsAttributes';

export const ForgeUIExtensionAnalyticsContext = ({
  extensionId,
  localId,
  children,
}: {
  extensionId: string;
  children: React.ReactNode;
  localId: string;
}) => {
  return (
    <AnalyticsContext
      data={{
        forgeUIAttributes: {
          localId,
          ...extensionIdToAnalyticsAttributes(extensionId),
        },
      }}
    >
      {children}
    </AnalyticsContext>
  );
};
