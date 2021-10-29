import styled from 'styled-components';

import {
  DN200,
  DN30,
  DN300,
  DN600,
  N0,
  N100,
  N200,
  N500,
} from '@atlaskit/theme/colors';
import { themed } from '@atlaskit/theme/components';
import { gridSize } from '@atlaskit/theme/constants';
import { h300, h500 } from '@atlaskit/theme/typography';

const dayTextColor = themed({
  light: N100,
  dark: DN200,
});

const todayColor = themed({
  light: N500,
  dark: DN600,
});
const numberColor = themed({
  light: N200,
  dark: DN300,
});

const todayNumberColor = themed({
  light: N0,
  dark: DN30,
});
const DAY_NUMBER_SIZE = gridSize() * 5;

export const DayText = styled.div`
  ${h300}
  color: ${dayTextColor};
  margin-top: 0;
`;
DayText.displayName = 'DayText';

export const GridDayContainer = styled.div<{ isPast: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: ${(props) => (props.isPast ? 0.57 : 1)};
`;
GridDayContainer.displayName = 'GridDayContainer';

export const GridDayNumber = styled.div<{ isToday: boolean }>`
  ${h500}
  margin-top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.isToday ? todayNumberColor : numberColor)};
  background-color: ${(props) => (props.isToday ? todayColor : 'transparent')};
  border-radius: ${(props) =>
    props.isToday ? `${DAY_NUMBER_SIZE / 2}px` : '0'};
  width: ${DAY_NUMBER_SIZE}px;
  height: ${DAY_NUMBER_SIZE}px;
  white-space: nowrap;
`;
GridDayNumber.displayName = 'GridDayNumber';
