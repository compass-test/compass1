import React, { useEffect, useState } from 'react';

import { Draggable } from 'react-beautiful-dnd';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import styled from 'styled-components';

import CustomThemeButton from '@atlaskit/button/custom-theme-button';
import { ThemeProps, ThemeTokens } from '@atlaskit/button/types';
import DragHandlerIcon from '@atlaskit/icon/glyph/drag-handler';
import EditorCloseIcon from '@atlaskit/icon/glyph/editor/close';
import Textfield from '@atlaskit/textfield';
import { N30, N70 } from '@atlaskit/theme/colors';
import { QuestionParametersChoice } from '@atlassian/proforma-common-core/form-system-models';

import { ChoiceMessage, IntlChoiceMessages } from './ChoiceMessages.intl';

interface SidebarChoiceProps {
  index: number;
  choice: QuestionParametersChoice;
  onChange: (choice: QuestionParametersChoice) => void;
  onDelete: (choice: QuestionParametersChoice) => void;
}

/**
 * A normal, editable choice in the choice editor in the form builder.
 */
export const SidebarChoice = injectIntl(
  ({
    index,
    choice,
    onChange,
    onDelete,
    intl,
  }: SidebarChoiceProps & InjectedIntlProps) => {
    const { id, other } = choice;

    const [label, setLabel] = useState(choice.label);

    // A debounce that only updates the label after 250ms have passed.
    // This prevents the (relatively slow) update of the form builder from occurring on every keypress.
    useEffect(() => {
      if (choice.label !== label) {
        const timeoutId = setTimeout(() => onChange(choice), 250);
        return () => clearTimeout(timeoutId);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [label]);

    return (
      <Draggable draggableId={id} index={index}>
        {provided => (
          <ChoiceDiv innerRef={provided.innerRef} {...provided.draggableProps}>
            <div {...provided.dragHandleProps}>
              <DragHandlerIcon label="Move" primaryColor={N70} size="medium" />
            </div>
            <Textfield
              name="choice"
              placeholder={intl.formatMessage(
                IntlChoiceMessages[ChoiceMessage.LabelPlaceholder],
              )}
              value={label}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setLabel(e.target.value)
              }
              elemAfterInput={
                <CustomThemeButton
                  appearance="subtle"
                  theme={deleteButtonTheme}
                  onClick={() => onDelete({ id, label, other })}
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
        )}
      </Draggable>
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
  padding: 0;
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
