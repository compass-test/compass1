import React, { FC, memo, useEffect, useState } from 'react';

import { DateSource, FormattedMessage, FormattedRelative } from 'react-intl';

import { messages } from './messages';

export type Props = {
  // Date to format relative
  date: DateSource;
};

const MINUTE = 60 * 1000;

const TimeAgo: FC<Props> = ({ date }) => {
  const currentTimeInMilliseconds = new Date().getTime();
  const timeInMilliseconds = new Date(date).getTime();
  const differenceInSeconds = currentTimeInMilliseconds - timeInMilliseconds;
  const isDifferenceInSecondsDefault =
    differenceInSeconds > 0 && differenceInSeconds < MINUTE; // not future date and difference is less than a minute

  const [isDifferenceInSeconds, setIsDifferenceInSeconds] = useState<boolean>(
    isDifferenceInSecondsDefault,
  );

  useEffect(() => {
    if (isDifferenceInSeconds) {
      const interval = setTimeout(() => {
        setIsDifferenceInSeconds(false);
      }, MINUTE);
      return () => {
        clearTimeout(interval);
      };
    }
  }, [isDifferenceInSeconds]);

  if (isDifferenceInSeconds) {
    return <FormattedMessage {...messages.justNow} />;
  }

  return (
    <FormattedRelative value={date} style="numeric" updateInterval={MINUTE} />
  );
};

export default memo(TimeAgo);
