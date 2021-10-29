import React from 'react';

import { graphql, useFragment } from 'react-relay';

import { useFeatureFlag } from '@atlassian/performance-portal-feature-flags';

import type { actionsMetricPageHeaderFragment$key } from './__generated__/actionsMetricPageHeaderFragment.graphql';
import { ConfigureMenu } from './configure-menu';
import { Owner } from './owner-team';
import { SlackChannel } from './slack-channel';
import { ActionsContainer } from './styled';
import { Tome } from './tome';

type Props = {
  data: actionsMetricPageHeaderFragment$key;
};

export const Actions = (props: Props) => {
  const isTomeButtonEnabled = useFeatureFlag('perf-portal-tome-button', false);
  const data = useFragment(
    graphql`
      fragment actionsMetricPageHeaderFragment on Metric {
        owner {
          ...ownerTeamHeaderFragment
        }
        ...slackChannelHeaderFragment
        ...configureMenuHeaderFragment
        ...tomeFragment
      }
    `,
    props.data,
  );

  return (
    <ActionsContainer>
      {data.owner && <Owner data={data.owner} />}
      <SlackChannel data={data} />
      {isTomeButtonEnabled && <Tome data={data} />}
      <ConfigureMenu data={data} />
    </ActionsContainer>
  );
};
