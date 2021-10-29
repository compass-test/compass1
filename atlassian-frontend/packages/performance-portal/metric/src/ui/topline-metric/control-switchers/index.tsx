import React, { useCallback } from 'react';

import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import Button, { ButtonGroup } from '@atlaskit/button';
import { sendUIEvent } from '@atlassian/performance-portal-analytics';

import { PageLoadToplineType } from '../../../__generated__/graphql';
import { toplineDateRanges } from '../../../common/constants';
import { ToplineDateRange } from '../../../common/types';
import { useToplineTypeParam } from '../../../common/utils/metric-page-param';

import {
  ControlSwitcherContainer,
  DateRangeContainer,
  ToplineTypeSwitcherContainer,
} from './styled';

export interface Prop {
  selectedDateRange: ToplineDateRange['value'];
  onDateRangeChange: (value: ToplineDateRange['value']) => void;
}
export const ControlSwitchers = ({
  onDateRangeChange,
  selectedDateRange,
}: Prop) => {
  const [toplineType, setToplineType] = useToplineTypeParam();
  const { createAnalyticsEvent } = useAnalyticsEvents();

  const handleToplineTypeChange = useCallback(
    (type: PageLoadToplineType) => () => {
      setToplineType(type);

      const analyticsEvent = createAnalyticsEvent({
        action: 'clicked',
        actionSubject: 'toplineMetricSwitch',
        source: 'metric',
        attributes: {
          type,
        },
      });
      sendUIEvent(analyticsEvent);
    },
    [setToplineType, createAnalyticsEvent],
  );

  const handleDateRangeChange = (value: number) => () => {
    onDateRangeChange(value);

    const analyticsEvent = createAnalyticsEvent({
      action: 'clicked',
      actionSubject: 'dateRangeSwitch',
      source: 'metric',
      attributes: {
        dateRange: value,
      },
    });
    sendUIEvent(analyticsEvent);
  };

  return (
    <ControlSwitcherContainer>
      <ToplineTypeSwitcherContainer>
        <ButtonGroup>
          {Object.values(PageLoadToplineType).map((type) => (
            <Button
              key={type}
              isSelected={toplineType === type}
              onClick={handleToplineTypeChange(type)}
            >
              {type}
            </Button>
          ))}
        </ButtonGroup>
      </ToplineTypeSwitcherContainer>
      <DateRangeContainer>
        <ButtonGroup>
          {toplineDateRanges.map((dateRange) => (
            <Button
              key={dateRange.label}
              isSelected={selectedDateRange === dateRange.value}
              onClick={handleDateRangeChange(dateRange.value)}
            >
              {dateRange.label}
            </Button>
          ))}
        </ButtonGroup>
      </DateRangeContainer>
    </ControlSwitcherContainer>
  );
};
