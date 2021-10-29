import React, { useMemo } from 'react';

import uniqBy from 'lodash/uniqBy';
import { graphql, useFragment } from 'react-relay';

import type { alertListPopupFragment$key } from './__generated__/alertListPopupFragment.graphql';
import { AlertRow } from './alert-row';
import { Container } from './styled';

export interface Props {
  data: alertListPopupFragment$key;
}

export const AlertListPopup = (props: Props) => {
  const alerts = useFragment<alertListPopupFragment$key>(
    graphql`
      fragment alertListPopupFragment on Alert @relay(plural: true) {
        opsgenieAlertId
        ...alertRowFragment
      }
    `,
    props.data,
  );

  const uniqueOpsgenieAlerts = useMemo(
    () => uniqBy(alerts, (alert) => alert.opsgenieAlertId),
    [alerts],
  );

  return (
    <Container>
      {uniqueOpsgenieAlerts.map((alert, index) => (
        <AlertRow key={alert.opsgenieAlertId ?? index} data={alert} />
      ))}
    </Container>
  );
};
