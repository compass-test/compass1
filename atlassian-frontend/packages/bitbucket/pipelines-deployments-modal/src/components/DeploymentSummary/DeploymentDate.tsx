import React from 'react';

import Tooltip from '@atlaskit/tooltip';

import { absoluteTime, relativeTime } from '../../utils/formatDates';

type Props = {
  date: string;
  className?: string;
};

const DeploymentDate: React.FC<Props> = ({ date, className }) => {
  return (
    <div className={className}>
      <Tooltip content={absoluteTime(date, true)} position="bottom">
        <div>{relativeTime(date)}</div>
      </Tooltip>
    </div>
  );
};

export default React.memo(DeploymentDate);
