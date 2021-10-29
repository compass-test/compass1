import React from 'react';

import { N100, N90 } from '@atlaskit/theme/colors';
import {
  getDiffData,
  NOT_APPLICABLE,
} from '@atlassian/performance-portal-common';

import {
  Container,
  DiffText,
  IconContainer,
  NotApplicable,
  PercentageDiffText,
} from './styled';

interface TooltipDiffProps {
  selectedValue: number | undefined;
  hoveredValue: number | undefined;
  unit?: string;
  shouldUseColoredIcons?: boolean;
}

export const TooltipDiff = ({
  selectedValue,
  hoveredValue,
  unit = 'ms',
  shouldUseColoredIcons = true,
}: TooltipDiffProps) => {
  const {
    absoluteDiff,
    percentageDiff,
    absoluteDiffStr,
    percentageDiffStr,
    color,
    Icon,
  } = getDiffData(selectedValue, hoveredValue, unit);

  const diffIconColor = shouldUseColoredIcons ? color : N90;
  const diffTextColor = shouldUseColoredIcons ? color : N100;

  return (
    <Container>
      {absoluteDiff !== null && percentageDiff !== null ? (
        <>
          <IconContainer>
            <Icon size="small" primaryColor={diffIconColor} />
            <PercentageDiffText color={diffTextColor}>
              {percentageDiffStr}
            </PercentageDiffText>
          </IconContainer>
          <DiffText>{absoluteDiffStr}</DiffText>
        </>
      ) : (
        <IconContainer>
          <Icon size="small" primaryColor={diffIconColor} />
          <NotApplicable>{NOT_APPLICABLE}</NotApplicable>
        </IconContainer>
      )}
    </Container>
  );
};
