import React, { useMemo } from 'react';

import { Container } from './styled';
import { StatusText } from './types';
export interface Props {
  status?: Nullable<string>;
  acknowledged?: Nullable<boolean>;
  snoozed?: Nullable<boolean>;
}

export const OpsgenieStatus = ({ status, acknowledged, snoozed }: Props) => {
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
