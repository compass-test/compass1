/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { lazy, Fragment } from 'react';
import {
  FieldChildrenProps,
  RadioGroupProps,
  Rendered,
  RadioOption,
  RadioProps,
} from '@atlassian/forge-ui-types';
import { Props } from '..';

const Field = React.lazy(() =>
  import('@atlaskit/form').then((module) => ({ default: module.Field })),
);
const AkRadioGroup = React.lazy(() => import('@atlaskit/radio/RadioGroup'));

const AKHelperMessage = lazy(() =>
  import('@atlaskit/form').then((module) => ({
    default: module.HelperMessage,
  })),
);

interface AKRadioGroupProps {
  options: RadioOption[];
  defaultValue?: string;
}

const RadioGroup: React.FunctionComponent<
  Omit<Rendered<RadioGroupProps>, 'children'> & AKRadioGroupProps
> = ({ options, defaultValue, isRequired, label, description, name }) => {
  return (
    <Field
      defaultValue={defaultValue}
      isRequired={isRequired}
      label={label}
      name={name}
    >
      {({ fieldProps }: FieldChildrenProps) => (
        <Fragment>
          {description && <AKHelperMessage>{description}</AKHelperMessage>}
          <div
            css={css`
              line-height: 20px;
            `}
          >
            <AkRadioGroup {...fieldProps} options={options} />
          </div>
        </Fragment>
      )}
    </Field>
  );
};

const RadioGroupFn: React.FunctionComponent<Props> = ({ props, children }) => {
  const { label, name, isRequired, description } = props as RadioGroupProps;

  let defaultValue;
  const options: RadioOption[] = children
    .map((child) => {
      const { props, type } = child;
      if (type === 'Radio') {
        const { label, value, defaultChecked } = props as RadioProps;
        if (defaultChecked) {
          defaultValue = value;
        }

        return {
          name,
          label,
          value,
        };
      }
    })
    .filter((option): option is RadioOption => typeof option !== 'undefined');

  return (
    <RadioGroup
      label={label}
      name={name}
      options={options}
      defaultValue={defaultValue}
      description={description}
      isRequired={isRequired}
    />
  );
};

export { RadioGroup, RadioGroupFn };
