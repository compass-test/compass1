import React from 'react';

import Lozenge from '@atlaskit/lozenge';
import { EventKey } from '@atlassian/performance-portal-common';

import { useMetricPageState } from '../../../common/utils/metric-page-state';

import {
  EventKeyWrapper,
  H2,
  Header,
  LabelGroup,
  TitleWrapper,
} from './styled';

export const MetricInfo = () => {
  const [state] = useMetricPageState();

  return (
    <Header>
      <TitleWrapper>
        <H2>{state.metric?.name}</H2>
      </TitleWrapper>
      <EventKeyWrapper>
        {state.metric?.eventKey && (
          <EventKey eventKey={state.metric?.eventKey} />
        )}
      </EventKeyWrapper>
      <LabelGroup>
        <Lozenge appearance={'default'}>{state.metric?.product}</Lozenge>
        <Lozenge appearance={'default'}>{state.metric?.eventType}</Lozenge>
      </LabelGroup>
    </Header>
  );
};
