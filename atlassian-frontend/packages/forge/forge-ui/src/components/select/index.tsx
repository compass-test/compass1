/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { Fragment, lazy } from 'react';
import { gridSize } from '@atlaskit/theme/constants';
import {
  SelectProps,
  Rendered,
  AKOption,
  OptionProps,
} from '@atlassian/forge-ui-types';
import { PortalConsumer } from '../../context';
import { Props } from '..';

const AKFormField = lazy(() => import('@atlaskit/form/Field'));
const AKSelect = lazy(() => import('@atlaskit/select'));
const AKErrorMessage = lazy(() =>
  import('@atlaskit/form').then((module) => ({ default: module.ErrorMessage })),
);

const AKHelperMessage = lazy(() =>
  import('@atlaskit/form').then((module) => ({
    default: module.HelperMessage,
  })),
);

interface AKSelectProps {
  options: AKOption[];
  defaultValue?: AKOption | AKOption[];
}

const validate = (value: any) => (!value ? 'EMPTY' : undefined);

const Select: React.FunctionComponent<
  Omit<Rendered<SelectProps>, 'children'> & AKSelectProps
> = ({
  options,
  isMulti,
  defaultValue,
  label,
  name,
  description,
  isRequired,
  placeholder,
}) => {
  return (
    <PortalConsumer>
      {(portal) => (
        <div
          css={css`
            max-width: 100%;
            width: ${gridSize() * 40}px;
          `}
        >
          <AKFormField
            defaultValue={defaultValue}
            label={label}
            name={name}
            isRequired={isRequired}
            validate={isRequired ? validate : undefined}
          >
            {({ fieldProps, error }: { fieldProps: any; error?: string }) => (
              <Fragment>
                <AKSelect
                  {...fieldProps}
                  isMulti={isMulti}
                  menuPortalTarget={portal}
                  options={options}
                  placeholder={placeholder}
                  validationState={error ? 'error' : 'default'}
                />
                {error === 'EMPTY' && (
                  <AKErrorMessage>This field is required.</AKErrorMessage>
                )}
                {description && (
                  <AKHelperMessage>{description}</AKHelperMessage>
                )}
              </Fragment>
            )}
          </AKFormField>
        </div>
      )}
    </PortalConsumer>
  );
};

const SelectFn: React.FunctionComponent<Props> = ({ props, children }) => {
  const {
    description,
    label,
    name,
    isMulti,
    placeholder,
    isRequired,
  } = props as SelectProps;

  let defaultValue: AKOption[] = [];
  const options: AKOption[] = children
    .map((child) => {
      const { props, type } = child;

      if (type === 'Option') {
        const { defaultSelected, label, value } = props as OptionProps;
        const option = { label, value };

        if (defaultSelected) {
          if (isMulti) {
            defaultValue.push(option);
          } else {
            defaultValue = [option];
          }
        }
        return option;
      }
    })
    .filter((option): option is AKOption => typeof option !== 'undefined');

  const formattedDefaultValue = isMulti ? defaultValue : defaultValue[0];

  return (
    <Select
      label={label}
      name={name}
      options={options}
      isMulti={isMulti}
      isRequired={isRequired}
      defaultValue={formattedDefaultValue}
      description={description}
      placeholder={placeholder}
    />
  );
};

export { Select, SelectFn };
