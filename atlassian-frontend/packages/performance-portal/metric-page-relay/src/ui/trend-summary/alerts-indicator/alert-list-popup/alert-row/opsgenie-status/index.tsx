import React, { useMemo } from 'react';

import { graphql, useFragment } from 'react-relay';

import type { opsgenieStatusFragment$key } from './__generated__/opsgenieStatusFragment.graphql';
import { Container } from './styled';
import { StatusText } from './types';
export interface Props {
  data: opsgenieStatusFragment$key;
}

export const OpsgenieStatus = (props: Props) => {
  const { status, acknowledged, snoozed } = useFragment<
    opsgenieStatusFragment$key
  >(
    graphql`
      fragment opsgenieStatusFragment on Alert {
        status
        acknowledged
        snoozed
      }
    `,
    props.data,
  );
  const statusText = useMemo(() => {
    if (status === 'open') {
      if (snoozed) {
        return StatusText.SNOOZED;
      }
      if (acknowledged) {
        return StatusText.ACKNOWLEDGED;
      }
      return StatusText.OPEN;
    }
    return StatusText.CLOSED;
  }, [status, acknowledged, snoozed]);

  return <Container statusText={statusText}>{statusText}</Container>;
};
