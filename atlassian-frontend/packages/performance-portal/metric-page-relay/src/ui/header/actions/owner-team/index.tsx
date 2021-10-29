import React, { useCallback, useMemo } from 'react';

import { graphql, useFragment } from 'react-relay';

import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import Button from '@atlaskit/button';
import PeopleGroupIcon from '@atlaskit/icon/glyph/people-group';
import { sendUIEvent } from '@atlassian/performance-portal-analytics';

import type { ownerTeamHeaderFragment$key } from './__generated__/ownerTeamHeaderFragment.graphql';

type Props = {
  data: ownerTeamHeaderFragment$key;
};

export const Owner = (props: Props) => {
  const data = useFragment(
    graphql`
      fragment ownerTeamHeaderFragment on MetricOwner {
        __typename
        ... on Staff {
          id
          fullName
        }
        ... on Team {
          id
          teamName
        }
      }
    `,
    props.data,
  );

  const ownerName = useMemo(() => {
    if (data.__typename === 'Staff') {
      return data.fullName;
    }
    if (data.__typename === 'Team') {
      return data.teamName;
    }
    return undefined;
  }, [data]);

  const { createAnalyticsEvent } = useAnalyticsEvents();

  const onClick = useCallback(() => {
    const analyticsEvent = createAnalyticsEvent({
      action: 'clicked',
      actionSubject: 'ownerLink',
      source: 'metric',
    });
    sendUIEvent(analyticsEvent);
  }, [createAnalyticsEvent]);

  return (
    <Button
      href={
        data.__typename === 'Team'
          ? `https://hello.atlassian.net/wiki/people/team/${data.id}`
          : data.__typename === 'Staff'
          ? `https://hello.atlassian.net/wiki/people/${data.id}`
          : '#'
      }
      target="_blank"
      onClick={onClick}
      iconBefore={<PeopleGroupIcon label={ownerName ?? ''} />}
    >
      {ownerName}
    </Button>
  );
};
