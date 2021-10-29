/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';
import { FieldChildrenProps, RangeProps } from '@atlassian/forge-ui-types';
import { Props } from '..';
// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { gridSize } from '@atlaskit/theme';

const AKRange = React.lazy(() => import('@atlaskit/range'));
const AKField = React.lazy(() =>
  import('@atlaskit/form').then((module) => ({
    default: module.Field,
  })),
);

const Range: React.FunctionComponent<RangeProps & { testId?: string }> = ({
  defaultValue,
  min = 0,
  max = 100,
  step = 1,
  label,
  name,
  testId,
}) => {
  return (
    <div
      css={css`
        max-width: 100%;
        width: ${gridSize() * 40}px;
      `}
    >
      <AKField name={name} label={label} defaultValue={defaultValue || min}>
        {({ fieldProps }: FieldChildrenProps) => {
          // todo - Remove the need to pluck isInvalid and isRequired from fieldProps. Requires https://product-fabric.atlassian.net/browse/DST-656?atlOrigin=eyJpIjoiMzhhNzE5MzlhYjMxNGU4ZmJhMzZiODVkMjIwYTkzN2IiLCJwIjoiamlyYS1zbGFjay1pbnQifQ
          const { isInvalid, isRequired, ...restrictedFieldProps } = fieldProps;
          return (
            <AKRange
              min={min}
              max={max}
              step={step}
              testId={testId}
              {...restrictedFieldProps}
            />
          );
        }}
      </AKField>
    </div>
  );
};

export default Range;

export const RangeFn: React.FunctionComponent<Props> = ({ props }) => {
  return <Range {...(props as RangeProps)} />;
};
