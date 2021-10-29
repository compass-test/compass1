import React, { useMemo } from 'react';

import uniqBy from 'lodash/uniqBy';

import { AlertFragment } from '../../../../__generated__/graphql';

import { AlertRow } from './alert-row';
import { Container } from './styled';

export interface Props {
  alerts: AlertFragment[];
}

export const AlertListPopup = ({ alerts }: Props) => {
  const uniqueOpsgenieAlerts = useMemo(
    () => uniqBy(alerts, (alert) => alert.opsgenieAlertId),
    [alerts],
  );

  return (
    <Container>
      {uniqueOpsgenieAlerts.map((alert, index) => (
        <AlertRow key={alert.opsgenieAlertId ?? index} alert={alert} />
      ))}
    </Container>
  );
};
