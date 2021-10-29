import React, { memo } from 'react';

import { N70 } from '@atlaskit/theme/colors';
import {
  getDiffData,
  isNumber,
  NOT_APPLICABLE,
} from '@atlassian/performance-portal-common';

import { AlignLeft, DiffText, IconContainer, NonBreakingText } from './styled';

interface MetricDiffProps {
  value: number | undefined;
  valueToCompareAgainst: number | undefined;
  unit?: string;
  highlightChange?: boolean;
  mode?: MetricDiffConfig;
}

export enum MetricDiffConfig {
  PERCENTAGE_AND_ABSOLUTE,
  ABSOLUTE,
  PERCENTAGE,
}

export const MetricDiff = memo(
  ({
    value,
    valueToCompareAgainst,
    unit = 'ms',
    highlightChange = true,
    mode = MetricDiffConfig.PERCENTAGE_AND_ABSOLUTE,
  }: MetricDiffProps) => {
    if (!isNumber(value) || !isNumber(valueToCompareAgainst)) {
      return (
        <AlignLeft>
          <DiffText>{NOT_APPLICABLE}</DiffText>
        </AlignLeft>
      );
    }

    const {
      absoluteDiff,
      percentageDiff,
      absoluteDiffStr,
      percentageDiffStr,
      color,
      Icon,
    } = getDiffData(value, valueToCompareAgainst, unit);

    const primaryColor = highlightChange ? color : N70;

    const content =
      absoluteDiff !== null &&
      percentageDiff !== null &&
      mode === MetricDiffConfig.PERCENTAGE_AND_ABSOLUTE ? (
        <>
          <IconContainer primaryColor={primaryColor}>
            <Icon size={'medium'} primaryColor={primaryColor} />
            <NonBreakingText>{percentageDiffStr}</NonBreakingText>
          </IconContainer>
          <DiffText>{absoluteDiffStr}</DiffText>
        </>
      ) : (
        <>
          <IconContainer primaryColor={primaryColor}>
            <Icon size={'medium'} primaryColor={primaryColor} />
            <NonBreakingText>
              {mode === MetricDiffConfig.PERCENTAGE
                ? percentageDiffStr
                : absoluteDiffStr}
            </NonBreakingText>
          </IconContainer>
        </>
      );

    return (
      <AlignLeft>
        {absoluteDiff !== null && percentageDiff !== null ? (
          content
        ) : (
          <IconContainer primaryColor={primaryColor}>
            <Icon size={'medium'} primaryColor={primaryColor} />
            <span>{NOT_APPLICABLE}</span>
          </IconContainer>
        )}
      </AlignLeft>
    );
  },
);
