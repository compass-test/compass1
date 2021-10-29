import React from 'react';

import { ErrorMessage, HelperMessage } from '@atlaskit/form';

import { FieldWrapper, Label, RequiredIndicator } from './styled';

export const FormField: React.SFC<{
  children?: any;
  label?: any;
  info?: any;
  error?: any;
  required?: boolean;
}> = props => {
  let label;
  if (props.label) {
    if (props.required) {
      label = (
        <Label>
          {props.label}
          <RequiredIndicator>*</RequiredIndicator>
        </Label>
      );
    } else {
      label = <Label>{props.label}</Label>;
    }
  }

  return (
    <FieldWrapper>
      {label}
      {props.children ? props.children : ''}
      {!props.error && <HelperMessage>{props.info}</HelperMessage>}
      {props.error && <ErrorMessage>{props.error}</ErrorMessage>}
    </FieldWrapper>
  );
};
