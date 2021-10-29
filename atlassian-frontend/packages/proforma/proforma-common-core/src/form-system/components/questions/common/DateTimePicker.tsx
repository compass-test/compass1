import React from 'react';

import { isMobile } from 'react-device-detect';
import styled from 'styled-components';

import { DatePicker, TimePicker } from '@atlaskit/datetime-picker';
import { DEFAULT_LOCALE } from '@atlassian/proforma-translations';

import { DatePickerMobile } from '../mobile/DatePickerMobile';
import { TimePickerMobile } from '../mobile/TimePickerMobile';

import { darkSelectStyles } from './commonStyles';
import { times } from './dayTimes';
import { invalidFieldContainerStyles } from './questionWrappers';

interface DateTimePickerProps {
  dateValue?: string;
  timeValue?: string;
  onDateChange?: (value: string) => void;
  onTimeChange?: (value: string) => void;
  datePlaceholder?: string;
  timePlaceholder?: string;
  isInvalid?: boolean;
  dark?: boolean;
  locale?: string;
}

export const DateTimePicker: React.FC<DateTimePickerProps> = ({
  dateValue,
  timeValue,
  onDateChange,
  onTimeChange,
  datePlaceholder,
  timePlaceholder,
  isInvalid,
  dark,
  locale,
}) => {
  return (
    <DateTimePickerContainer isInvalid={isInvalid}>
      {isMobile ? (
        <DatePickerMobile dateValue={dateValue} onChange={onDateChange} />
      ) : (
        <DatePicker
          value={dateValue}
          onChange={onDateChange}
          placeholder={datePlaceholder}
          selectProps={dark ? { styles: darkSelectStyles } : undefined}
          locale={locale || DEFAULT_LOCALE}
        />
      )}
      {isMobile ? (
        <TimePickerMobile timeValue={timeValue} onChange={onTimeChange} />
      ) : (
        <TimePicker
          value={timeValue}
          onChange={onTimeChange}
          placeholder={timePlaceholder}
          timeIsEditable
          times={times}
          selectProps={dark ? { styles: darkSelectStyles } : undefined}
          locale={locale || DEFAULT_LOCALE}
        />
      )}
    </DateTimePickerContainer>
  );
};

export const DateTimePickerContainer = styled.div<{ isInvalid?: boolean }>`
  display: flex;

  > div {
    width: 50%;
  }

  ${props => props.isInvalid && invalidFieldContainerStyles}
`;
