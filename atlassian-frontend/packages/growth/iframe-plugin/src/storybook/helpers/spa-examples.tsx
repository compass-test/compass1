import React, { Component, Fragment } from 'react';

import { AnalyticsContext, AnalyticsListener } from '@atlaskit/analytics-next';

// @ts-ignore
import EventEmitter from 'eventemitter3';

// eslint-disable-next-line import/no-extraneous-dependencies
import Button from '@atlaskit/button/custom-theme-button';
import { withSpaChildClient } from '../..';
import withAnalyticsEvents, {
  WithAnalyticsEventsProps,
} from '@atlaskit/analytics-next/withAnalyticsEvents';

class ViewTrackerBase extends Component<WithAnalyticsEventsProps> {
  componentDidMount() {
    this.props.createAnalyticsEvent!({
      eventType: 'screen',
      name: 'screenName',
      attributes: { foo: 'bar' },
    }).fire('*');
  }

  render() {
    return null;
  }
}

const ViewTracker = withAnalyticsEvents()(ViewTrackerBase);

export const SimpleAppWithAnalytics = withSpaChildClient(
  ({ postMessage, postAnalyticsEvent, spaIsReady }) => (
    <AnalyticsListener
      channel="*"
      onEvent={(analyticsEvent) => postAnalyticsEvent(analyticsEvent)}
    >
      <AnalyticsContext data={{ foo: 'bar' }}>
        <AnalyticsContext data={{ example: 'handle-event' }}>
          <Fragment>
            <ViewTracker />
            <Button
              onClick={() =>
                postMessage({
                  type: 'CLOSE',
                })
              }
            >
              Close
            </Button>
            <Button
              onClick={() =>
                postMessage({
                  type: 'SOME_ACTION',
                  route: 'confluence',
                })
              }
            >
              Route
            </Button>
            <Button onClick={() => spaIsReady()}>Ready</Button>
          </Fragment>
        </AnalyticsContext>
      </AnalyticsContext>
    </AnalyticsListener>
  ),
);
