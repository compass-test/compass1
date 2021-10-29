import React from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';
import styled from 'styled-components';

import CustomThemeButton from '@atlaskit/button/custom-theme-button';
import { ThemeProps, ThemeTokens } from '@atlaskit/button/types';
import EditorCloseIcon from '@atlaskit/icon/glyph/editor/close';
import Textfield from '@atlaskit/textfield';
import { N30, N70 } from '@atlaskit/theme/colors';

import { ChoiceMessage, IntlChoiceMessages } from './ChoiceMessages.intl';

interface OtherChoiceProps {
  onDelete: () => void;
}

/**
 * The 'other' special case choice in the choice editor in the form builder.
 */
export const OtherChoice = injectIntl(
  ({ onDelete, intl }: OtherChoiceProps & InjectedIntlProps) => {
    return (
      <ChoiceDiv>
        <Textfield
          name="choice"
          placeholder={intl.formatMessage(
            IntlChoiceMessages[ChoiceMessage.LabelPlaceholder],
          )}
          value="Other..."
          readOnly={true}
          elemAfterInput={
            <CustomThemeButton
              appearance="subtle"
              theme={deleteButtonTheme}
              onClick={onDelete}
            >
              <EditorCloseIcon
                label="Delete"
                primaryColor={N70}
                size="medium"
              />
            </CustomThemeButton>
          }
        />
      </ChoiceDiv>
    );
  },
);

const ChoiceDiv = styled.div`
  background-color: ${N30};
  border-radius: 3px;
  border-style: none;
  border-width: 0;
  align-items: center;
  display: flex;
  padding: 0 0 0 24px;
  margin: 0 0 4px 0;
  overflow: hidden;
`;

function deleteButtonTheme(
  currentTheme: (props: ThemeProps) => ThemeTokens,
  themeProps: ThemeProps,
): ThemeTokens {
  const { buttonStyles, spinnerStyles } = currentTheme(themeProps);
  return {
    buttonStyles: {
      ...buttonStyles,
      padding: '4px 0 0 0',
    },
    spinnerStyles,
  };
}
