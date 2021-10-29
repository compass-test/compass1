import React from 'react';

import format from 'date-fns/format';

import { AlertFragment } from '../../../../../__generated__/graphql';

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
  alert: AlertFragment;
}

export const AlertRow = ({ alert }: Props) => {
  return (
    <Container>
      <Line1>
        <Line1Left>
          {alert.priority && <OpsgeniePriority priority={alert.priority} />}
          <Title
            href={`https://atlassian.app.opsgenie.com/alert/detail/${alert.opsgenieAlertId}/details`}
            target="_blank"
          >
            {alert.title}
          </Title>
        </Line1Left>
        <Line1Right>
          <OpsgenieStatus
            status={alert.status}
            acknowledged={alert.acknowledged}
            snoozed={alert.snoozed}
          />
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
