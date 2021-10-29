import React, { useCallback } from 'react';

import { graphql, useFragment } from 'react-relay';

import Button from '@atlaskit/button';

import type { metricName_metric$key } from './__generated__/metricName_metric.graphql';
import { StyledLink } from './styled';

interface Props {
  metric: metricName_metric$key;
}
export const MetricNameColumn = (props: Props) => {
  const blockCallback = useCallback((e) => e.stopPropagation(), []);

  const data = useFragment(
    graphql`
      fragment metricName_metric on Metric {
        name
        ... on BrowserMetric {
          eventKey
        }
      }
    `,
    props.metric,
  );
  return (
    <StyledLink to={`/metric/${data.eventKey}/`} onClick={blockCallback}>
      <Button appearance="link">{data.name}</Button>
    </StyledLink>
  );
};
