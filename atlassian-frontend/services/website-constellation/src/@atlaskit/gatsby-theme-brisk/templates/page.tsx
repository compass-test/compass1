import React from 'react';
import ActualPageTemplate from '@atlaskit/gatsby-theme-brisk/src/templates/page';
import {
  ContextualAnalyticsData,
  SCREEN,
  FireScreenAnalytics,
} from '@atlassian/analytics-bridge';
import { normalizeSourceName } from '../../../utils/analytics';

const PageTemplate = (props: any) => {
  // We assume the page name will be the one in the URL.
  // We can potentially change this later to use frontmatter as well if needed.
  const parts = props.uri.split('/');
  const sourceName = normalizeSourceName(parts[parts.length - 1]);

  return (
    <ContextualAnalyticsData
      sourceType={SCREEN}
      sourceName="content"
      attributes={{ name: sourceName, context: 'mdx' }}
    >
      <FireScreenAnalytics key={sourceName} />
      <ActualPageTemplate {...props} />
    </ContextualAnalyticsData>
  );
};

export default PageTemplate;
