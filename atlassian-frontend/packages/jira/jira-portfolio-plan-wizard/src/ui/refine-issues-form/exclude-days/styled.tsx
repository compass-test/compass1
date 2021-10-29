import React from 'react';

import styled from 'styled-components';

import Textfield, { TextFieldProps } from '@atlaskit/textfield';

// This is a workaround because React.memo does not play well with styled-components
const StyledComponentsTextField = (props: TextFieldProps) => {
  return <Textfield {...props} />;
};

export const NumberTextField = styled<TextFieldProps>(
  StyledComponentsTextField,
)`
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
`;
