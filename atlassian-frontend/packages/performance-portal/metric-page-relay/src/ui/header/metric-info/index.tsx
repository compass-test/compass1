import React from 'react';

import { graphql, useFragment } from 'react-relay';

import Lozenge from '@atlaskit/lozenge';
import { EventKey } from '@atlassian/performance-portal-common';

import type { metricInfoFragment$key } from './__generated__/metricInfoFragment.graphql';
import {
  EventKeyWrapper,
  H2,
  Header,
  LabelGroup,
  TitleWrapper,
} from './styled';

type Props = {
  data: metricInfoFragment$key;
};

export const MetricInfo = (props: Props) => {
  const data = useFragment(
    graphql`
      fragment metricInfoFragment on Metric {
        name
        product
        ... on BrowserMetric {
          eventKey
          eventType
        }
      }
    `,
    props.data,
  );

  return (
    <Header>
      <TitleWrapper>
        <H2>{data.name}</H2>
      </TitleWrapper>
      <EventKeyWrapper>
        {data.eventKey && <EventKey eventKey={data.eventKey} />}
      </EventKeyWrapper>
      <LabelGroup>
        <Lozenge appearance={'default'}>{data.product}</Lozenge>
        <Lozenge appearance={'default'}>{data.eventType}</Lozenge>
      </LabelGroup>
    </Header>
  );
};
