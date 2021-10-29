import React from 'react';
import EmptyState from '@atlaskit/empty-state';
import Layout from '@atlaskit/gatsby-theme-brisk/src/components/layout';
import Button from '@atlaskit/button';
import styled from '@emotion/styled';
import {
  ContextualAnalyticsData,
  SCREEN,
  FireScreenAnalytics,
} from '@atlassian/analytics-bridge';

const VerticallyAlignedContent = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GlobalError = () => {
  return (
    <ContextualAnalyticsData sourceType={SCREEN} sourceName="error">
      <FireScreenAnalytics />
      <Layout title="Something unexpected happened">
        <VerticallyAlignedContent>
          <EmptyState
            header="Something unexpected happened"
            description="Our team has been notified, please refresh the page and try again."
            primaryAction={
              <Button
                onClick={() => window.location.reload()}
                href={window.location.href}
              >
                Refresh
              </Button>
            }
          />
        </VerticallyAlignedContent>
      </Layout>
    </ContextualAnalyticsData>
  );
};

export default GlobalError;
