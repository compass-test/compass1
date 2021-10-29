import styled from '@emotion/styled';

import { TextFieldColors } from '@atlaskit/textfield';
import { R400, subtleHeading } from '@atlaskit/theme/colors';
import { fontFamily, fontSize, gridSize } from '@atlaskit/theme/constants';
import { headingSizes } from '@atlaskit/theme/typography';

import { FormGrid } from '../../../common/ui/FormGrid/styled';

export { FormGrid };

export const ErrorWrapper = styled.span`
  font-size: ${fontSize()}px;
`;

export const Label = styled.label`
  font-size: ${headingSizes.h200.size / fontSize()}em;
  color: ${subtleHeading};
  font-weight: 600;
  display: block;
`;

export const LabelSpan = styled.span`
  display: block;
  margin-bottom: ${gridSize() / 2}px;
`;

interface FieldProps {
  focused: boolean;
  error: boolean;
}

export const Field = styled.div<FieldProps>`
  background-color: ${({ focused, error }) =>
    error
      ? TextFieldColors.invalidRules.light[
          focused ? 'backgroundColorFocus' : 'backgroundColor'
        ]
      : TextFieldColors[focused ? 'backgroundColorFocus' : 'backgroundColor']
          .standard.light};
  border-color: ${({ focused, error }) =>
    error
      ? TextFieldColors.invalidRules.light[
          focused ? 'borderColorFocus' : 'borderColor'
        ]
      : TextFieldColors[focused ? 'borderColorFocus' : 'borderColor'].standard
          .light};
  border-radius: 3px;
  border-width: 2px;
  border-style: solid;
  box-sizing: border-box;
  transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out;
  padding: ${gridSize() + 2}px ${gridSize() - 2}px;
`;

export const inputOptions = {
  style: {
    base: {
      // this style will be used in another iframe with different base settings
      // we have to use absolute, body-styles independent units
      fontSize: `${headingSizes.h400.size}px`,
      color: TextFieldColors.textColor.light,
      fontFamily: fontFamily(),
      '::placeholder': {
        color: TextFieldColors.placeholderTextColor.light,
      },
    },
    invalid: {
      color: R400,
    },
  },
};
