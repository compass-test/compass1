import React from 'react';

import styled from 'styled-components';

import Icon from '@atlaskit/icon';

import { FailedStatusIcon } from './FailedStatusIcon';
import { InProgressStatusIcon } from './InProgressStatusIcon';
import { PausedStatusIcon } from './PausedStatusIcon';
import { StoppedStatusIcon } from './StoppedStatusIcon';
import { SuccessStatusIcon } from './SuccessStatusIcon';

const StatusIconWrapper = styled.span`
  display: flex;
  align-items: center;
  svg {
    width: 16px;
    height: 16px;
    margin: 0 8px 0 5px;
  }
`;

type StatusIconProps = {
  iconName: string;
  iconText: string;
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
};

const StaticStatusIcon: React.FC<StatusIconProps> = (props) => {
  const glyph = statusIcons[props.iconName];

  return (
    <StatusIconWrapper>
      <Icon {...props} glyph={glyph} label="" />
      <span>{props.iconText}</span>
    </StatusIconWrapper>
  );
};

export default StaticStatusIcon;
