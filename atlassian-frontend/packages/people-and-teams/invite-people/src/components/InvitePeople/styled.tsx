import React from 'react';
import styled from 'styled-components';
import { h200, h600 } from '@atlaskit/theme/typography';
import { N200, N300 } from '@atlaskit/theme/colors';
import Button, {
  CustomThemeButtonProps,
} from '@atlaskit/button/custom-theme-button';
import { gridSize } from '@atlaskit/theme/constants';

const gridSizeTimes = (n: number) => n * gridSize();

export const FieldWrapper = styled.div`
  position: relative;
  margin-top: ${gridSizeTimes(2)}px;
`;

export const InviteeListWrapper = styled(FieldWrapper)`
  z-index: 1;
`;

export const ProductSelectWrapper = styled(FieldWrapper)`
  z-index: 2;
`;

export const FormWrapper = styled.div`
  position: relative;
  max-width: ${gridSizeTimes(44.25)}px;
  margin: 0 auto;
`;

export const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const FormTitle = styled.h3`
  padding: ${gridSizeTimes(3)}px 0 2px;
  ${h600()}
`;

export const FormHeaderMenu = styled.div`
  align-self: flex-end;
`;

export const FormDescription = styled.p`
  margin-top: ${gridSizeTimes(1)}px;
`;

export const Form: any = styled.form`
  margin-top: 0;
`;

// This is a workaround because React.memo does not play well with styled-components
function StyledComponentsButton(props: CustomThemeButtonProps) {
  return <Button {...props} />;
}

export const AddMoreInvitationsButton: any = styled(StyledComponentsButton)`
  /* increase specificity to override default Button styles */
  && {
    margin-top: ${gridSizeTimes(2.25)}px;
    padding-left: 0 !important;
    height: auto !important;
    line-height: 1.5 !important;
  }
`;

interface FormFooterProps {
  align: 'left' | 'right';
}

export const FormFooter: any = styled.div`
  display: flex;
  flex-flow: ${(props: FormFooterProps) =>
    props.align === 'right' ? 'row-reverse' : 'row'};
  margin: ${gridSizeTimes(3)}px 0;

  button {
    margin-left: ${(props: FormFooterProps) =>
      props.align === 'right' ? gridSizeTimes(1.25) : '0'}px;
    margin-right: ${(props: FormFooterProps) =>
      props.align === 'right' ? '0' : gridSizeTimes(1.25)}px;
  }
`;

export const ModalCloseIconWrapper = styled.div`
  position: absolute;
  top: ${gridSizeTimes(2.5)}px;
  right: 0;
  cursor: pointer;
`;

export const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  margin: ${gridSizeTimes(10)}px;
  min-height: 302px;
  overflow-y: auto;
`;

export const Label = styled.label`
  ${h200}
`;

export const Warning = styled.span`
  font-size: 11px;
  color: ${N300};
`;

export const SubTextWrapper = styled.span`
  color: ${N300};
  font-size: 11px;
  margin-left: 8px;
  align-self: center;
`;

export const LineWithText = styled.hr`
  border: none;
  position: relative;
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  margin: 0 100px;
  line-height: 1em;
  height: 1.5em;
  ::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    background-color: ${N200};
    height: 1px;
  }
  ::after {
    content: attr(data-content);
    display: inline-block;
    position: relative;
    padding: 0 10px;
    color: ${N200};
    background-color: #fff;
    line-height: 1.5em;
  }
`;
