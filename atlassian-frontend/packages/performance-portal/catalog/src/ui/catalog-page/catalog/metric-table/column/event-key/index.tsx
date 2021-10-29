import React, { useCallback } from 'react';

import { graphql } from 'react-relay';
import { useFragment } from 'react-relay/hooks';

import { EventKey } from '@atlassian/performance-portal-common';

import type { eventKey_metric$key } from './__generated__/eventKey_metric.graphql';

interface Props {
  metric: eventKey_metric$key;
}
export const EventKeyColumn = (props: Props) => {
  const blockCallback = useCallback((e) => e.stopPropagation(), []);

  const data = useFragment(
    graphql`
      fragment eventKey_metric on BrowserMetric {
        eventKey
      }
    `,
    props.metric,
  );
  return (
    <span onClick={blockCallback}>
      <EventKey eventKey={data.eventKey ?? ''} />
    </span>
  );
};
