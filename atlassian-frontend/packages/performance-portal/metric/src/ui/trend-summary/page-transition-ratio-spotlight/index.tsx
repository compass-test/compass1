import React from 'react';

import { N70 } from '@atlaskit/theme/colors';
import {
  EqualIcon,
  getDiffColor,
  getDiffIcon,
  NOT_APPLICABLE,
  roundNumber,
} from '@atlassian/performance-portal-common';

import {
  DiffAbsolute,
  DiffNumbers,
  DiffPercentage,
  NotApplicable,
  Spotlight,
} from '../../../common/ui/spotlight';

import { PageTransitionRatioSpotlightProps } from './types';

const getFormattedPercent = (value: number) => roundNumber(value * 100);

export const PageTransitionRatioSpotlight = React.memo(
  ({
    valueBefore,
    valueAfter,
    unit,
    loading,
    error,
  }: PageTransitionRatioSpotlightProps) => {
    let content: string | JSX.Element = '';
    let color = N70;
    let Icon = EqualIcon;
    if (error) {
      content = 'Error when fetching data';
    } else if (valueAfter === undefined) {
      content = <NotApplicable>{NOT_APPLICABLE}</NotApplicable>;
    } else if (valueBefore === undefined) {
      content = (
        <DiffPercentage>{getFormattedPercent(valueAfter)}%</DiffPercentage>
      );
    } else {
      const diff = valueAfter - valueBefore;
      content = (
        <>
          <DiffPercentage>{getFormattedPercent(valueAfter)}%</DiffPercentage>
          <DiffAbsolute>{getFormattedPercent(diff || 0)}%</DiffAbsolute>
        </>
      );
      Icon = getDiffIcon(valueAfter - valueBefore);
      color = getDiffColor(valueBefore - valueAfter, 0, 2);
    }

    return (
      <Spotlight
        primaryColor={color}
        label="SPA transition ratio WoW"
        unit={unit}
        Icon={Icon}
        loading={loading}
      >
        <DiffNumbers>{content}</DiffNumbers>
      </Spotlight>
    );
  },
);
