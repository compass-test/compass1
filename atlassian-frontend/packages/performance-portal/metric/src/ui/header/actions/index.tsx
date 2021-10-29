import React from 'react';

import { useMetricPageState } from '../../../common/utils/metric-page-state';

import { ConfigureMenu } from './configure-menu';
import { Owner } from './owner-team';
import { SlackChannel } from './slack-channel';
import { ActionsContainer } from './styled';

export const Actions = () => {
  const [state] = useMetricPageState();

  return (
    <ActionsContainer>
      {state.metric?.owner && <Owner owner={state.metric.owner} />}
      {state.metric?.slackChannel && (
        <SlackChannel channelName={state.metric.slackChannel} />
      )}
      <ConfigureMenu />
    </ActionsContainer>
  );
};
