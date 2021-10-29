import React from 'react';

import format from 'date-fns/format';
import { graphql, useFragment } from 'react-relay';

import type { alertRowFragment$key } from './__generated__/alertRowFragment.graphql';
import { OpsgeniePriority } from './opsgenie-priority';
import { OpsgenieStatus } from './opsgenie-status';
import {
  AlertSentAt,
  Container,
  Line1,
  Line1Left,
  Line1Right,
  Title,
} from './styled';

export interface Props {
  data: alertRowFragment$key;
}

export const AlertRow = (props: Props) => {
  const alert = useFragment<alertRowFragment$key>(
    graphql`
      fragment alertRowFragment on Alert {
        priority
        opsgenieAlertId
        title
        sentAt
        ...opsgeniePriorityFragment
        ...opsgenieStatusFragment
      }
    `,
    props.data,
  );
  return (
    <Container>
      <Line1>
        <Line1Left>
          {alert.priority && <OpsgeniePriority data={alert} />}
          <Title
            href={`https://atlassian.app.opsgenie.com/alert/detail/${alert.opsgenieAlertId}/details`}
            target="_blank"
          >
            {alert.title}
          </Title>
        </Line1Left>
        <Line1Right>
          <OpsgenieStatus data={alert} />
        </Line1Right>
      </Line1>
      {alert.sentAt && (
        <AlertSentAt>
          Sent at {format(new Date(alert.sentAt), 'yyyy-MM-dd HH:mm (zzzz)')}
        </AlertSentAt>
      )}
    </Container>
  );
};
