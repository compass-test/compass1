/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { lazy } from 'react';
import {
  CheckboxGroupProps,
  Rendered,
  CheckboxOption,
  CheckboxProps,
} from '@atlassian/forge-ui-types';
import { Props } from '..';

const AKCheckbox = React.lazy(() =>
  import('@atlaskit/checkbox').then((module) => ({ default: module.Checkbox })),
);

const AKCheckboxField = React.lazy(() =>
  import('@atlaskit/form').then((module) => ({
    default: module.CheckboxField,
  })),
);
const Fieldset = React.lazy(() =>
  import('@atlaskit/form').then((module) => ({ default: module.Fieldset })),
);

const AKHelperMessage = lazy(() =>
  import('@atlaskit/form').then((module) => ({
    default: module.HelperMessage,
  })),
);

interface AKCheckboxGroupProps {
  options: CheckboxOption[];
}

const CheckboxGroup: React.FunctionComponent<
  Omit<Rendered<CheckboxGroupProps>, 'children'> & AKCheckboxGroupProps
> = ({ options, label, name, description }) => {
  return (
    <Fieldset legend={label}>
      {description && <AKHelperMessage>{description}</AKHelperMessage>}
      {options.map((option: CheckboxOption) => {
        const { key, label, value, defaultChecked, isRequired } = option;
        return (
          <AKCheckboxField
            key={key}
            value={value}
            defaultIsChecked={defaultChecked}
            name={name}
          >
            {({ fieldProps }: { fieldProps: any }) => (
              <div
                css={css`
                  line-height: 20px;
                `}
              >
                <AKCheckbox
                  {...fieldProps}
                  label={label}
                  isRequired={isRequired}
                />
              </div>
            )}
          </AKCheckboxField>
        );
      })}
    </Fieldset>
  );
};

// NOTE: use `label` instead
interface DeprecatedProps {
  legend: string;
  name: string;
}

const CheckboxGroupFn: React.FunctionComponent<Props> = ({
  props: propsAny,
  children,
}) => {
  const { name, description } = propsAny as CheckboxGroupProps;
  const props = propsAny as CheckboxGroupProps | DeprecatedProps;

  // NOTE: legend is deprecated
  const label = 'legend' in props ? props.legend : props.label;
  const options = children
    .filter(({ type }) => type === 'Checkbox')
    .map((child) => {
      const { key, props } = child;
      const {
        label,
        value,
        defaultChecked,
        isRequired,
      } = props as CheckboxProps;

      return {
        key,
        label,
        value,
        defaultChecked,
        isRequired,
      } as CheckboxOption;
    });

  return (
    <CheckboxGroup
      label={label}
      name={name}
      options={options}
      description={description}
    />
  );
};

export { CheckboxGroup, CheckboxGroupFn };
