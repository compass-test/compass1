import styled from 'styled-components';

import {
  DN100,
  DN30,
  DN300,
  DN600,
  N0,
  N200,
  N500,
  N60,
} from '@atlaskit/theme/colors';
import { themed } from '@atlaskit/theme/components';
import { gridSize } from '@atlaskit/theme/constants';
import { h300 } from '@atlaskit/theme/typography';

const todayColor = themed({
  light: N500,
  dark: DN600,
});
const todayNumberColor = themed({
  light: N0,
  dark: DN30,
});
const pastTextColor = themed({
  light: N60,
  dark: DN100,
});
const textColor = themed({
  light: N200,
  dark: DN300,
});
const DAY_NUMBER_SIZE = gridSize() * 2.75;

export const DayContainer = styled.div`
  ${h300}
  display: flex;
  margin-top: 0;
`;
DayContainer.displayName = 'DayContainer';

export const DayText = styled.div<{ isPast: boolean; isToday: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => {
    if (props.isToday) {
      return todayColor;
    }
    if (props.isPast) {
      return pastTextColor;
    }
    return textColor;
  }};
  height: ${DAY_NUMBER_SIZE}px;

  &::after {
    content: '\\00a0';
  }
`;
DayText.displayName = 'DayText';

export const DayNumber = styled.div<{ isPast: boolean; isToday: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => {
    if (props.isToday) {
      return todayNumberColor;
    }
    if (props.isPast) {
      return pastTextColor;
    }
    return textColor;
  }};
  background-color: ${(props) => (props.isToday ? todayColor : 'transparent')};
  border-radius: ${(props) =>
    props.isToday ? `${DAY_NUMBER_SIZE / 2}px` : '0'};
  width: ${(props) => (props.isToday ? `${DAY_NUMBER_SIZE}px` : 'auto')};
  height: ${DAY_NUMBER_SIZE}px;
`;
DayNumber.displayName = 'DayNumber';
