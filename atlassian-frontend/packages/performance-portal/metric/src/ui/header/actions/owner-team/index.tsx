import React, { useCallback, useMemo } from 'react';

import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import Button from '@atlaskit/button';
import PeopleGroupIcon from '@atlaskit/icon/glyph/people-group';
import { sendUIEvent } from '@atlassian/performance-portal-analytics';

import { Maybe } from '../../../../__generated__/graphql';

export interface Props {
  owner:
    | { __typename: 'Staff'; id: string; fullName?: Maybe<string> }
    | { __typename: 'Team'; id: string; teamName?: Maybe<string> };
}

export const Owner = ({ owner }: Props) => {
  const { createAnalyticsEvent } = useAnalyticsEvents();

  const ownerType = owner?.__typename;

  const ownerName = useMemo(() => {
    if (owner?.__typename === 'Staff') {
      return owner.fullName;
    }
    if (owner?.__typename === 'Team') {
      return owner.teamName;
    }
    return undefined;
  }, [owner]);

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
        ownerType === 'Team'
          ? `https://hello.atlassian.net/wiki/people/team/${owner?.id}`
          : `https://hello.atlassian.net/wiki/people/${owner?.id}`
      }
      target="_blank"
      onClick={onClick}
      iconBefore={<PeopleGroupIcon label={ownerName ?? ''} />}
    >
      {ownerName}
    </Button>
  );
};
