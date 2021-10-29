import React from 'react';

import { toISODateString } from '../../../../common/utils';

import { LegendContainer, LegendItem, LegendText } from './styled';

interface LegendColorBoxProps {
  color: string;
}
const LegendColorBox = ({ color }: LegendColorBoxProps) => {
  const rectSize = 20;
  return (
    <svg width={rectSize} height={rectSize}>
      <rect
        fill={color}
        stroke={color}
        width={rectSize}
        height={rectSize}
        rx={4}
      />
    </svg>
  );
};

export interface Props {
  baseDate: Date;
  baseColor: string;
  comparisonDate: Date;
  comparisionColor: string;
}

export const Legend = ({
  baseDate,
  baseColor,
  comparisonDate,
  comparisionColor,
}: Props) => {
  return (
    <LegendContainer>
      <LegendItem>
        <LegendColorBox color={baseColor} />
        <LegendText>{toISODateString(baseDate)}</LegendText>
      </LegendItem>
      <LegendItem>
        <LegendColorBox color={comparisionColor} />
        <LegendText>{toISODateString(comparisonDate)}</LegendText>
      </LegendItem>
    </LegendContainer>
  );
};
