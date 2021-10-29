/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { lazy, Fragment } from 'react';
import { gridSize } from '@atlaskit/theme/constants';
import { TextAreaProps } from '@atlassian/forge-ui-types';
import { Props } from '..';

const AkFormField = React.lazy(() =>
  import('@atlaskit/form').then((module) => ({ default: module.Field })),
);
const AKTextArea = React.lazy(() => import('@atlaskit/textarea'));
const AKErrorMessage = lazy(() =>
  import('@atlaskit/form').then((module) => ({ default: module.ErrorMessage })),
);
const AKHelperMessage = lazy(() =>
  import('@atlaskit/form').then((module) => ({
    default: module.HelperMessage,
  })),
);

const validate = (value: any) => (!value ? 'EMPTY' : undefined);

const TextArea: React.FunctionComponent<TextAreaProps> = (props) => (
  <div
    css={css`
      max-width: 100%;
      width: ${gridSize() * 60}px;
    `}
  >
    <AkFormField
      name={props.name}
      label={props.label}
      defaultValue={props.defaultValue}
      isRequired={props.isRequired}
      validate={props.isRequired ? validate : undefined}
    >
      {({ fieldProps, error }: { fieldProps: any; error?: string }) => (
        <Fragment>
          <AKTextArea
            {...fieldProps}
            appearance="standard"
            resize="smart"
            minimumRows={2}
            isMonospaced={props.isMonospaced}
            placeholder={props.placeholder}
            spellCheck={props.spellCheck}
          />
          {error === 'EMPTY' && (
            <AKErrorMessage>This field is required.</AKErrorMessage>
          )}
          {props.description && (
            <AKHelperMessage>{props.description}</AKHelperMessage>
          )}
        </Fragment>
      )}
    </AkFormField>
  </div>
);

export default TextArea;

export const TextAreaFn: React.FunctionComponent<Props> = ({ props }) => {
  const {
    name,
    label,
    defaultValue,
    isMonospaced,
    isRequired,
    description,
    placeholder,
    spellCheck,
  } = props as TextAreaProps;
  return (
    <TextArea
      name={name}
      label={label}
      defaultValue={defaultValue}
      isMonospaced={isMonospaced}
      isRequired={isRequired}
      placeholder={placeholder}
      description={description}
      spellCheck={spellCheck}
    />
  );
};
