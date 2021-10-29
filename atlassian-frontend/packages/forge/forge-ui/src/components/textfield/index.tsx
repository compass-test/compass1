/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { lazy, Fragment } from 'react';
import { gridSize } from '@atlaskit/theme/constants';
import { FieldChildrenProps, TextFieldProps } from '@atlassian/forge-ui-types';
import { Props } from '..';
import { makeValidate } from './validators';

const AKTextField = lazy(() => import('@atlaskit/textfield'));
const AKErrorMessage = lazy(() =>
  import('@atlaskit/form').then((module) => ({ default: module.ErrorMessage })),
);
const AKField = React.lazy(() =>
  import('@atlaskit/form').then((module) => ({ default: module.Field })),
);
const AKHelperMessage = React.lazy(() =>
  import('@atlaskit/form').then((module) => ({
    default: module.HelperMessage,
  })),
);

const isValidType = (type: string) => {
  return (
    type === 'text' || type === 'number' || type === 'email' || type === 'tel'
  );
};

function TextField({
  type = 'text',
  name,
  label,
  description, // description about the field
  placeholder,
  isRequired = false,
  defaultValue = '',
  testId,
  autoComplete,
}: TextFieldProps & { testId?: string }) {
  const validate = makeValidate(isRequired, type);

  // WARNING: for <input type=number> and React, native validation is strange, use type text
  const fieldType = !isValidType(type) || type === 'number' ? 'text' : type;

  return (
    <div
      css={css`
        max-width: 100%;
        width: ${gridSize() * 40}px;
      `}
    >
      <AKField
        name={name}
        label={label}
        defaultValue={defaultValue}
        isRequired={isRequired}
        validate={validate}
      >
        {({ fieldProps }: FieldChildrenProps) => {
          const { isInvalid, value } = fieldProps;
          const error = isInvalid ? validate(value) : null;
          return (
            <Fragment>
              <AKTextField
                type={fieldType}
                testId={testId}
                placeholder={placeholder}
                autoComplete={autoComplete}
                {...fieldProps}
              />
              {error ? <AKErrorMessage>{error}</AKErrorMessage> : null}
              {description ? (
                <AKHelperMessage>{description}</AKHelperMessage>
              ) : null}
            </Fragment>
          );
        }}
      </AKField>
    </div>
  );
}

export default TextField;

export const TextFieldFn: React.FunctionComponent<Props> = ({ props }) => {
  const {
    name,
    label,
    type,
    description,
    defaultValue,
    isRequired,
    placeholder,
    autoComplete,
  } = props as TextFieldProps;
  return (
    <TextField
      type={type}
      name={name}
      label={label}
      defaultValue={defaultValue}
      isRequired={isRequired}
      description={description}
      placeholder={placeholder}
      autoComplete={autoComplete}
    />
  );
};
