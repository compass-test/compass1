import React, { useCallback, useEffect, useState } from 'react';

import formatDistanceStrict from 'date-fns/formatDistanceStrict';

import RefreshIcon from '@atlaskit/icon/glyph/refresh';

import { isPartialDayAggregation } from '../../../utils';

import { LastUpdatedString } from './styled';
interface Props {
  dataDateTime: string;
  aggregatedAt: Date;
}
export const TooltipLastUpdatedSection = ({
  dataDateTime,
  aggregatedAt,
}: Props) => {
  const calculateLastUpdatedString = useCallback(() => {
    if (
      aggregatedAt &&
      isPartialDayAggregation(new Date(dataDateTime), aggregatedAt)
    ) {
      return formatDistanceStrict(new Date(), aggregatedAt, {
        addSuffix: true,
      });
    }
    return null;
  }, [aggregatedAt, dataDateTime]);

  const [lastUpdatedString, setLastUpdatedString] = useState(
    calculateLastUpdatedString(),
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setLastUpdatedString(calculateLastUpdatedString());
    }, 2000);

    return () => clearInterval(timer);
  });

  if (!lastUpdatedString) {
    return null;
  }
  return (
    <LastUpdatedString>
      <RefreshIcon label="Updated" size="small" />
      {lastUpdatedString}
    </LastUpdatedString>
  );
};
