import React, { FC } from 'react';

import styled from 'styled-components';

import { invalidFieldContainerStyles } from '../common/questionWrappers';

import { EditDate } from './EditDate';
import { EditTime } from './EditTime';

type EditDateTimeProps = {
  id: string;
  dateValue?: string;
  timeValue?: string;
  isInvalid: boolean;
  onDateChange?: (value: string) => void;
  onTimeChange?: (value: string) => void;
};

export const EditDateTime: FC<EditDateTimeProps> = ({
  id,
  dateValue,
  timeValue,
  isInvalid,
  onDateChange,
  onTimeChange,
}: EditDateTimeProps) => {
  return (
    <DateTimePickerContainer isInvalid={isInvalid}>
      <EditDate
        id={id}
        value={dateValue}
        isInvalid={false}
        onChange={onDateChange}
      />
      <EditTime
        id={id + '-time'}
        value={timeValue}
        isInvalid={false}
        onChange={onTimeChange}
      />
    </DateTimePickerContainer>
  );
};

const DateTimePickerContainer = styled.div<{ isInvalid?: boolean }>`
  display: flex;

  > div {
    width: 50%;
  }

  ${props => props.isInvalid && invalidFieldContainerStyles}
`;
