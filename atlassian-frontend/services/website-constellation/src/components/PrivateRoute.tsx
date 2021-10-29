import React from 'react';
import {
  ContextualAnalyticsData,
  SCREEN,
  FireScreenAnalytics,
} from '@atlassian/analytics-bridge';
import Button from '@atlaskit/button';
import { useLocation } from '@reach/router';
import EmptyState from '@atlaskit/empty-state';
import { SpanAllContent } from '@atlaskit/gatsby-theme-brisk/src/components/layout';
import securityImage from '../images/restricted.png';
import errorImage from '../images/404.png';

import { useSession } from '../hooks';

const msgs = {
  retry: {
    header: "We're having trouble logging you in.",
    description: 'Please try again.',
    image: errorImage,
  },
  default: {
    header: 'This page is restricted to Atlassian employees',
    description:
      'To view this page, you must be an Atlassian employee and log in with your Atlassian account. If you are logged in and still having trouble, contact the Atlassian Design System team.',
    image: securityImage,
  },
};

export default function PrivateRoute({ children }) {
  const isLoggedIn = useSession();
  const location = useLocation();

  if (typeof window === 'undefined') {
    // Render nothing on the server.
    return null;
  }

  if (!isLoggedIn) {
    const loginFailure = location.search === '?retry';
    const msgType = loginFailure ? 'retry' : 'default';
    const screenName = loginFailure ? 'loginError' : 'login';

    return (
      <ContextualAnalyticsData sourceType={SCREEN} sourceName={screenName}>
        <FireScreenAnalytics />
        <SpanAllContent>
          <EmptyState
            header={msgs[msgType].header}
            description={msgs[msgType].description}
            imageUrl={msgs[msgType].image}
            primaryAction={
              <Button
                appearance="primary"
                href={`${process.env.GATSBY_CONSTELLATION_API_ORIGIN}${process.env.GATSBY_CONSTELLATION_API_PATH}/google?redirect=${location.pathname}`}
              >
                Log in
              </Button>
            }
            tertiaryAction={
              <Button
                appearance="subtle-link"
                href="https://ecosystem.atlassian.net/servicedesk/customer/portal/24"
                target="_blank"
              >
                Contact us
              </Button>
            }
          />
        </SpanAllContent>
      </ContextualAnalyticsData>
    );
  }

  return children;
}
