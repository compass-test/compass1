import styled from 'styled-components';

import { R400 } from '@atlaskit/theme/colors';

const noPointerEvents = `
  > div {
    pointer-events: none;
  }
`;

const disabledStyles = `
  > div {
    border-style: dashed;
    border-color: #DFE1E6;
    border-radius: 3px;
    border-width: 2px;
    background-color: white;
    cursor: default;
    pointer-events: none;
  }

  * {
    color: #172B4D !important;
    cursor: default;
  }

  label {
    cursor: default;
    > div {
      color: white
    }
  }
`;

const textFieldDisabledStyles = `
  min-height: 36px;
  border-style: dashed;
  border-color: #DFE1E6;
  border-radius: 3px;
  border-width: 2px;
  background-color: white;
  cursor: default;

  > div {
    padding: 8px 6px;
    line-height: normal
  }
`;

const choiceDisabledStyles = `
  > div {
    border-style: dashed;
    border-color: #DFE1E6;
    border-radius: 3px;
    border-width: 2px;
    background-color: white;
    cursor: default;
    pointer-events: none;
  }
`;

const choiceInvalidStyles = `
  > div {
    border-style: dashed;
    border-color: #FF5630;
    border-radius: 3px;
    border-width: 2px;
    cursor: default;
  }
`;

export const invalidFieldContainerStyles = `
  border-style: solid;
  border-color: ${R400};
  border-radius: 3px;
  border-width: 2px;
  cursor: default;
`;

export const FieldDisabledWrapper = styled.div`
  ${disabledStyles}
  ${noPointerEvents}
`;

export const ChoiceFieldWrapper = styled('div')<{
  isDisabled: boolean;
  isInvalid?: boolean;
}>`
  ${props => props.isDisabled && choiceDisabledStyles}
  ${props => props.isInvalid && choiceInvalidStyles}
`;

export const TextfieldDisabledWrapper = styled.div`
  ${textFieldDisabledStyles}
`;

export const ShortTextFieldWrapper = styled('div')<{ isDisabled: boolean }>`
  max-width: 240px;
  ${props => props.isDisabled && textFieldDisabledStyles}
`;

export const ChoicePlaceholder = styled.div`
  margin: 40px;
`;

export const LabelWrapper = styled.div`
  label {
    > div {
      padding: 0px;
      margin-top: 12px;
      margin-bottom: 4px;
      font-size: 14px;
    }
  }
`;

export const ErrorWrapper = styled.div`
  height: 16px;
  margin-top: 4px;
`;
