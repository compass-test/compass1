import React from 'react';

import { MetricsDropdown } from '../../../common/ui/controls/metrics-dropdown';
import { PageLoadTypePicker } from '../../../common/ui/controls/page-load-type-picker';
import { PercentilePicker } from '../../../common/ui/controls/percentile-picker';
import { ResolutionSwitcher } from '../../../common/ui/controls/resolution-switcher';
import { ControlsWrapper } from '../../../common/ui/controls/styled';

import { DatePicker } from './date-picker';

export const Controls = ({ isLoading }: { isLoading: boolean }) => (
  <ControlsWrapper>
    <ResolutionSwitcher />
    <DatePicker isLoading={isLoading} />
    <PercentilePicker />
    <PageLoadTypePicker />
    <MetricsDropdown />
  </ControlsWrapper>
);
