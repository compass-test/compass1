import React, { Component } from 'react';
import { ComponentWithAnalytics, fireOperationalAnalytics } from './util';

type Props = {
  onMount: () => void;
};

class MountTracker extends Component<Props> {
  componentDidMount() {
    const { onMount } = this.props;
    onMount();
  }

  render() {
    return null;
  }
}

const COMPONENT_MOUNTED_EVENT_ACTION = 'mounted';

export default (componentName: string) => {
  const MountTrackerWithAnalytics = ComponentWithAnalytics(componentName, {
    onMount: COMPONENT_MOUNTED_EVENT_ACTION,
  })(MountTracker);

  return (props: any) => (
    <MountTrackerWithAnalytics
      onMount={(analyticsEvent: any) =>
        fireOperationalAnalytics(analyticsEvent, { attributes: props })
      }
    />
  );
};
