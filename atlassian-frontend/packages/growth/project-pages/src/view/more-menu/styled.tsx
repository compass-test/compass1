import React from 'react';
import styled from 'styled-components';
import AkButton, {
  CustomThemeButtonProps,
} from '@atlaskit/button/custom-theme-button';

// This is a workaround because React.memo does not play well with styled-components
function StyledComponentsButton(props: CustomThemeButtonProps) {
  return <AkButton {...props} />;
}

export const Button = styled(StyledComponentsButton)`
  /* increase specificity to override default Button styles */
  && {
    min-width: 36px;
    justify-content: center;
  }
`;
