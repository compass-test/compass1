import React, { ReactNode } from 'react';

import isUndefined from 'lodash/isUndefined';
import omitBy from 'lodash/omitBy';

import { AnalyticsContext } from '@atlaskit/analytics-next';

import { ContextualAnalyticsData } from '../../types';

export interface Props extends ContextualAnalyticsData {
  children: ReactNode;
}

export const extractContextualData = (
  props: Props,
): ContextualAnalyticsData => {
  const { children, sourceName, sourceType, ...rest } = props;
  const source =
    sourceName && sourceType ? `${sourceName}${sourceType}` : undefined;

  return omitBy(
    {
      source,
      ...rest,
    },
    isUndefined,
  );
};

export const ContextWrapper = (props: Props) => {
  const data: ContextualAnalyticsData = extractContextualData(props);

  return (
    <AnalyticsContext data={data}>
      <>{props.children}</>
    </AnalyticsContext>
  );
};
