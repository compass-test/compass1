import React, { useCallback, useState } from 'react';

import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import Button from '@atlaskit/button';
import ChevronDownIcon from '@atlaskit/icon/glyph/chevron-down';
import Popup from '@atlaskit/popup';
import Spinner from '@atlaskit/spinner';
import { sendUIEvent } from '@atlassian/performance-portal-analytics';

import { useFilters } from '../../../../services/filters';

import { Calendar, CalendarProps } from './calendar';

export const DatePicker = ({ isLoading }: { isLoading: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [state, actions] = useFilters();
  const { createAnalyticsEvent } = useAnalyticsEvents();

  const handleCalendarPopupClick = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);

  const closePopup = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const handleCalendarSelect = useCallback<CalendarProps['onSelect']>(
    (e) => {
      if (e.iso) {
        actions.setDailyReportDate(e.iso);
        setIsOpen(false);

        const analyticsEvent = createAnalyticsEvent({
          action: 'clicked',
          actionSubject: 'datePicker',
          source: 'reports',
          attributes: {
            type: 'day',
          },
        });
        sendUIEvent(analyticsEvent);
      }
    },
    [actions, createAnalyticsEvent],
  );

  return (
    <Popup
      isOpen={isOpen}
      placement="bottom-start"
      onClose={closePopup}
      content={() => <Calendar onSelect={handleCalendarSelect} />}
      trigger={(triggerProps) => (
        <Button
          {...triggerProps}
          isDisabled={isLoading}
          isSelected={isOpen}
          onClick={handleCalendarPopupClick}
          iconAfter={
            isLoading ? <Spinner /> : <ChevronDownIcon label="Choose date" />
          }
        >
          <span>date: </span>
          <span>
            {state.dailyReport.isSet ? state.dailyReport.date : 'latest day'}
          </span>
        </Button>
      )}
    />
  );
};
