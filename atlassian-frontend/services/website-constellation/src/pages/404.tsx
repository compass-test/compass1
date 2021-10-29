import React from 'react';
import Layout, {
  SpanAllContent,
} from '@atlaskit/gatsby-theme-brisk/src/components/layout';
import Button from '@atlaskit/button';
import {
  ContextualAnalyticsData,
  SCREEN,
  FireScreenAnalytics,
} from '@atlassian/analytics-bridge';
import EmptyState from '@atlaskit/empty-state';
import notFoundImage from '../images/404.png';

const browser = typeof window !== 'undefined' && window;
const primaryAction = <Button href="/">Head home</Button>;

const pageDescription = `They say that all roads lead to Rome.
  But we've lost our way, so let's try going home.`;

const props = {
  header: "Looks like we're off the beaten track",
  description: pageDescription,
  imageUrl: notFoundImage,
  maxImageWidth: 448,
  maxImageHeight: 320,
  primaryAction,
};

const Page404: React.ComponentType = () => {
  return (
    browser && (
      <ContextualAnalyticsData sourceType={SCREEN} sourceName="notFound">
        <FireScreenAnalytics />
        <Layout>
          <SpanAllContent>
            <EmptyState {...props} />
          </SpanAllContent>
        </Layout>
      </ContextualAnalyticsData>
    )
  );
};

export default Page404;
