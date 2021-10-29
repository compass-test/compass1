/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import { ToggleProps } from '@atlassian/forge-ui-types';
import { Props } from '..';

const AKToggle = React.lazy(() =>
  import('@atlaskit/toggle').then((module) => ({
    default: module.default,
  })),
);

const AKField = React.lazy(() =>
  import('@atlaskit/form').then((module) => ({ default: module.Field })),
);

const Toggle: React.FunctionComponent<ToggleProps & { testId?: string }> = ({
  name,
  defaultChecked,
  testId,
  label,
}) => (
  <AKField defaultValue={defaultChecked} name={name}>
    {({ fieldProps }: { fieldProps: any }) => {
      const { onChange, value, ...rest } = fieldProps;
      return (
        <div css={{ display: 'flex', alignItems: 'center' }}>
          <AKToggle
            onChange={onChange}
            isChecked={value}
            size="large"
            label={label}
            testId={testId}
            {...rest}
          />
          <span css={{ cursor: 'pointer' }} onClick={() => onChange(!value)}>
            {label}
          </span>
        </div>
      );
    }}
  </AKField>
);

export default Toggle;

export const ToggleFn: React.FunctionComponent<Props> = ({ props }) => {
  const { name, label, defaultChecked } = props as ToggleProps;
  return <Toggle name={name} label={label} defaultChecked={defaultChecked} />;
};
