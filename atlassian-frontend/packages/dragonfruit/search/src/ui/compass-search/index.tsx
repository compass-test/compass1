import React, { useState } from 'react';

import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import { fireUIAnalytics } from '@atlassian/analytics-bridge';
import {
  ConfluenceClientsProvider,
  CrossProductSearchDialog,
  Products,
} from '@atlassian/compass-search-dialog';

export const ComponentSearch = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { createAnalyticsEvent } = useAnalyticsEvents();

  const onOpen = () => {
    fireUIAnalytics(
      createAnalyticsEvent({
        action: 'opened',
        actionSubject: 'searchDialogPreQueryScreen',
      }),
    );
    setIsExpanded(true);
  };

  const onClose = () => {
    fireUIAnalytics(
      createAnalyticsEvent({
        action: 'closed',
        actionSubject: 'searchDialogPreQueryScreen',
      }),
    );
    setIsExpanded(false);
  };

  // We don't use any of this config, so these values do not matter.
  // We'll have to do a decent chunk of tearing out code to remove this entirely.
  const confluenceConfig = {
    aggregatorUrl: 'https://pug.jira-dev.com/gateway/api/xpsearch-aggregator',
    baseUrl: '',
    collaborationGraphUrl: '/gateway/api/collaboration',
    isUserAnonymous: false,
    siteUrl: '',
    cloudId: '',
  };

  return (
    // TODO: remove this provider, we don't need any of the existing clients.
    <ConfluenceClientsProvider config={confluenceConfig}>
      <CrossProductSearchDialog
        isExpanded={isExpanded}
        onOpen={onOpen}
        onClose={onClose}
        doProductPermissionsCheck={false}
        products={[Products.compass]}
        // We should change this to be an optional prop.
        // It allows us to hook into navigation actions?, e.g for analytics.
        onNavigate={() => {}}
        // user={user}
      />
    </ConfluenceClientsProvider>
  );
};

export default ComponentSearch;
