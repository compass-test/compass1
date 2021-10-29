import React, { useCallback } from 'react';

import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import Button, { ButtonGroup } from '@atlaskit/button';
import { sendUIEvent } from '@atlassian/performance-portal-analytics';

import { toplineDateRanges } from '../../../common/constants';
import { ToplineDateRange } from '../../../common/types';
import { usePageParam } from '../../../services/url-query-param';

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
  const [topLineType, setTopLineType] = usePageParam('topLineType');
  const { createAnalyticsEvent } = useAnalyticsEvents();

  const handleToplineTypeChange = useCallback(
    (type: string) => () => {
      setTopLineType(type);

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
    [setTopLineType, createAnalyticsEvent],
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
          {['TTI', 'FMP'].map((type) => (
            <Button
              key={type}
              isSelected={topLineType === type}
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
