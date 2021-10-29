import React from 'react';

import Icon from '@atlaskit/icon';
import Tooltip from '@atlaskit/tooltip';

import { DefaultStatusIcon } from './icons/DefaultStatusIcon';
import { FailedStatusIcon } from './icons/FailedStatusIcon';
import { HaltedStatusIcon } from './icons/HaltedStatusIcon';
import { InProgressStatusIcon } from './icons/InProgressStatusIcon';
import { PausedStatusIcon } from './icons/PausedStatusIcon';
import { RedeployStatusIcon } from './icons/RedeployStatusIcon';
import { RerunStatusIcon } from './icons/RerunStatusIcon';
import { StoppedStatusIcon } from './icons/StoppedStatusIcon';
import { SuccessStatusIcon } from './icons/SuccessStatusIcon';
import defaultStatuses from './statuses';
import * as styles from './styled';

const icons = {
  PENDING: 'default',
  READY: 'building',
  IN_PROGRESS: 'building',
  PULLING_IMAGES: 'building',
  UPLOADING_ARTIFACTS: 'building',
  UPLOADING_CACHES: 'building',
  PARSING_TEST_RESULTS: 'building',
  DOWNLOADING_ARTIFACTS: 'building',
  DOWNLOADING_CACHES: 'building',
  COMPLETING_LOGS: 'building',
  CLONING: 'building',
  RUNNING: 'building',
  PAUSED: 'paused',
  HALTED: 'halted',
  ERROR: 'failed',
  SYSTEM_ERROR: 'failed',
  USER_ERROR: 'failed',
  FAILED: 'failed',
  FAILED_REDEPLOY: 'failed_redeploy',
  REDEPLOY: 'redeploy',
  RERUN: 'rerun',
  SUCCESSFUL: 'success',
  STOPPED: 'stopped',
  SKIPPED: 'stopped',
  NOT_RUN: 'default',
  UNDEPLOYED: 'success',
  fail: 'failed',
  complete: 'success',
  default: 'default',
};

export type StatusIconProps = {
  status: string;
  statuses?: any;
  icon?: any;
  className?: string;
  isLabelHidden?: boolean;
  tooltipContent?: any;
};

type Statuses = {
  [key: string]: any;
};

const statusIcons: Statuses = {
  success: SuccessStatusIcon,
  failed: FailedStatusIcon,
  stopped: StoppedStatusIcon,
  paused: PausedStatusIcon,
  building: InProgressStatusIcon,
  halted: HaltedStatusIcon,
  redeploy: RedeployStatusIcon,
  failed_redeploy: RedeployStatusIcon,
  rerun: RerunStatusIcon,
  default: DefaultStatusIcon,
};

const StatusIcon = ({
  status,
  statuses = defaultStatuses,
  icon = icons,
  className = '',
  isLabelHidden,
  tooltipContent,
}: StatusIconProps) => {
  return status ? (
    <styles.Wrapper
      data-state={icon[status || '']}
      data-test={`status-${icon[status || '']}`}
      className={className}
    >
      {tooltipContent ? (
        <Tooltip content={tooltipContent} position="right" tag="span">
          <Icon glyph={statusIcons[icon[status]]} label={statuses[status]} />
        </Tooltip>
      ) : (
        <Icon glyph={statusIcons[icon[status]]} label={statuses[status]} />
      )}
      {!isLabelHidden ? statuses[status || ''] : null}
    </styles.Wrapper>
  ) : null;
};

export default StatusIcon;
