import React, { FC } from 'react';

import styled from 'styled-components';

import { N40 } from '@atlaskit/theme/colors';

type ViewDateTimeProps = {
  id: string;
  dateValue?: string;
  timeValue?: string;
};

export const ViewDateTime: FC<ViewDateTimeProps> = ({
  dateValue,
  timeValue,
}) => {
  return (
    <LongDisabledQuestionPlaceholder>
      <DateTimeQuestionSubPlaceholder>
        {dateValue}
      </DateTimeQuestionSubPlaceholder>
      <DateTimeQuestionSubPlaceholder>
        {timeValue}
      </DateTimeQuestionSubPlaceholder>
    </LongDisabledQuestionPlaceholder>
  );
};

const DateTimeQuestionSubPlaceholder = styled.div`
  width: 50%;
  padding: 10px;
`;

const LongDisabledQuestionPlaceholder = styled.div`
  border-style: dashed;
  border-color: ${N40};
  border-radius: 3px;
  border-width: 2px;
  background-color: white;
  cursor: default;
  height: 42px;
  display: flex;
  align-items: center;
`;
