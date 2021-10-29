import React, { Component } from 'react';
import {
  withAnalyticsContext,
  withAnalyticsEvents,
} from '@atlaskit/analytics-next';
import { PAGE_EVENT_ACTION, PROJECT_PAGES_CHANNEL } from './util';
const noop = () => {};
type Props = {
  onMount: () => void;
};
class ViewTracker extends Component<Props> {
  componentDidMount() {
    this.props.onMount();
  }
  render() {
    return null;
  }
}
const ViewTrackerWithAnalytics: any = withAnalyticsContext({
  componentName: 'view-tracker',
})(
  withAnalyticsEvents({
    onMount: (createAnalyticsEvent) => {
      createAnalyticsEvent({ action: PAGE_EVENT_ACTION }).fire(
        PROJECT_PAGES_CHANNEL,
      );
    },
  })(ViewTracker as any),
);

export default () => <ViewTrackerWithAnalytics onMount={noop} />;
