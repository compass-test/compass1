import React from 'react';

import { MetricsDropdown } from '../../../common/ui/controls/metrics-dropdown';
import { PageLoadTypePicker } from '../../../common/ui/controls/page-load-type-picker';
import { PercentilePicker } from '../../../common/ui/controls/percentile-picker';
import { ResolutionSwitcher } from '../../../common/ui/controls/resolution-switcher';
import { ControlsWrapper } from '../../../common/ui/controls/styled';

import { WeekPicker } from './week-picker';

export const Controls = () => {
  return (
    <ControlsWrapper>
      <ResolutionSwitcher />
      <WeekPicker />
      <PercentilePicker />
      <PageLoadTypePicker />
      <MetricsDropdown />
    </ControlsWrapper>
  );
};
