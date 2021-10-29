import React, { useState } from 'react';

import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import styled from 'styled-components';

import CustomThemeButton from '@atlaskit/button/custom-theme-button';
import Button from '@atlaskit/button/standard-button';
import { ThemeProps, ThemeTokens } from '@atlaskit/button/types';
import EditorAddIcon from '@atlaskit/icon/glyph/editor/add';
import Textfield from '@atlaskit/textfield';
import { N70 } from '@atlaskit/theme/colors';
import { QuestionParametersChoice } from '@atlassian/proforma-common-core/form-system-models';

import {
  IntlQuestionSidebarMessages,
  QuestionSidebarMessage,
} from '../QuestionSidebarMessages.intl';

import { OtherChoice } from './OtherChoice';
import { SidebarChoice } from './SidebarChoice';

interface SidebarChoicesProps {
  choices: QuestionParametersChoice[];
  onChange: (choices: QuestionParametersChoice[]) => void;
}

/**
 * Finds the maximum ID in use on current choices so that any new IDs generated don't conflict with existing IDs.
 * IDs are strings; they may be string representations of numbers, or they may be text strings with no numeric value.
 * In the latter case the maximum ID will be 0.
 */
const findChoiceMaxId: (
  choices: QuestionParametersChoice[],
) => number = choices => {
  return choices.reduce((previousMaxId, choice) => {
    const numericChoiceId = parseInt(choice.id, 10);
    if (!Number.isNaN(numericChoiceId)) {
      return numericChoiceId > previousMaxId ? numericChoiceId : previousMaxId;
    }
    return previousMaxId;
  }, 0);
};

/**
 * Choice editor for the form builder.
 */
export const SidebarChoices = injectIntl(
  ({
    choices: initialChoices,
    onChange,
    intl,
  }: SidebarChoicesProps & InjectedIntlProps) => {
    const [maxId, setMaxId] = useState(findChoiceMaxId(initialChoices));
    const [choices, setChoices] = useState(initialChoices);
    const [newLabel, setNewLabel] = useState('');

    function reorderChoices(result: DropResult) {
      if (!result.destination) {
        return;
      }

      if (result.destination.index === result.source.index) {
        return;
      }

      // Remove other choice from list
      const choicesWithoutOther = choices.filter(choice => !choice.other);

      // Reorder list of choices without taking into account the other choice
      const mutableChoices = Array.from(choicesWithoutOther);
      const [removed] = mutableChoices.splice(result.source.index, 1);
      mutableChoices.splice(result.destination.index, 0, removed);

      // Add the other choice back to the end of the list of choices
      if (choicesWithoutOther.length !== choices.length) {
        mutableChoices.push({ id: '0', label: 'Other...', other: true });
      }

      setChoices(mutableChoices);
      onChange(mutableChoices);
    }

    function updateLabel(choice: QuestionParametersChoice) {
      const updatedChoices = choices.map(existingChoice => {
        if (existingChoice.id === choice.id) {
          return {
            id: existingChoice.id,
            label: choice.label,
            other: existingChoice.other,
          };
        } else {
          return existingChoice;
        }
      });
      setChoices(updatedChoices);
      onChange(updatedChoices);
    }

    function addChoice() {
      if (newLabel.trim().length > 0) {
        const newId = maxId + 1;
        setMaxId(newId);

        const updatedChoices = [
          ...choices.filter(choice => !choice.other),
          { id: `${newId}`, label: newLabel.trim(), other: false },
          ...choices.filter(choice => choice.other),
        ];

        setChoices(updatedChoices);
        onChange(updatedChoices);

        setNewLabel('');
      }
    }

    function deleteChoice(choice: QuestionParametersChoice) {
      const updatedChoices = choices.filter(
        existingChoice => existingChoice.id !== choice.id,
      );

      setChoices(updatedChoices);
      onChange(updatedChoices);
    }

    function addOtherChoice() {
      const updatedChoices = [
        ...choices,
        { id: '0', label: 'Other...', other: true },
      ];

      setChoices(updatedChoices);
      onChange(updatedChoices);
    }

    function deleteOther() {
      const updatedChoices = choices.filter(choice => !choice.other);

      setChoices(updatedChoices);
      onChange(updatedChoices);
    }

    function newChoiceKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
      if (event.key === 'Enter') {
        addChoice();
      }
    }

    const hasOtherChoice = choices.findIndex(choice => choice.other) >= 0;

    const choicesWithoutOther = choices.filter(choice => !choice.other);

    return (
      <OuterDiv>
        <DragDropContext onDragEnd={reorderChoices}>
          <Droppable droppableId="list">
            {provided => (
              <InnerDiv
                innerRef={provided.innerRef}
                {...provided.droppableProps}
              >
                {choicesWithoutOther.map((choice, index) => {
                  return (
                    <SidebarChoice
                      key={choice.id}
                      index={index}
                      choice={choice}
                      onChange={updateLabel}
                      onDelete={deleteChoice}
                    />
                  );
                })}
                {provided.placeholder}
              </InnerDiv>
            )}
          </Droppable>
        </DragDropContext>
        {hasOtherChoice && <OtherChoice onDelete={deleteOther} />}
        <NewChoiceDiv1>
          <CustomThemeButton
            theme={plainButtonTheme}
            spacing="none"
            onClick={addChoice}
          >
            <EditorAddIcon label="Add" primaryColor={N70} size="medium" />
          </CustomThemeButton>
          <Textfield
            name="newchoice"
            placeholder={intl.formatMessage(
              IntlQuestionSidebarMessages[
                QuestionSidebarMessage.NewChoicePlaceholder
              ],
            )}
            value={newLabel}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewLabel(e.target.value)
            }
            onKeyUp={newChoiceKeyUp}
          />
        </NewChoiceDiv1>
        <NewChoiceDiv2>
          <Button appearance="subtle" spacing="none" onClick={addChoice}>
            <FormattedMessage
              {...IntlQuestionSidebarMessages[QuestionSidebarMessage.AddChoice]}
            />
          </Button>
          {!hasOtherChoice && (
            <>
              &nbsp;
              <FormattedMessage
                {...IntlQuestionSidebarMessages[
                  QuestionSidebarMessage.ChoiceOr
                ]}
              />
              &nbsp;
              <Button
                appearance="subtle"
                spacing="none"
                onClick={addOtherChoice}
              >
                <FormattedMessage
                  {...IntlQuestionSidebarMessages[
                    QuestionSidebarMessage.AddOther
                  ]}
                />
              </Button>
            </>
          )}
        </NewChoiceDiv2>
      </OuterDiv>
    );
  },
);

const OuterDiv = styled.div`
  padding: 8px 0 0 0;
}
`;

const InnerDiv = styled.div`
  align-items: center;
}
`;

const NewChoiceDiv1 = styled.div`
  border-radius: 3px;
  border-style: none;
  border-width: 0;
  align-items: center;
  display: flex;
  margin: 0 0 4px 0;
`;

const NewChoiceDiv2 = styled.div`
  align-items: center;
  display: flex;
  padding: 0 0 0 32px;
  margin: 0 0 4px 0;
`;

function plainButtonTheme(
  currentTheme: (props: ThemeProps) => ThemeTokens,
  themeProps: ThemeProps,
): ThemeTokens {
  const { buttonStyles, spinnerStyles } = currentTheme(themeProps);
  return {
    buttonStyles: {
      ...buttonStyles,
      padding: '0',
      ...(themeProps.state !== 'hover' && { backgroundColor: 'transparent' }),
    },
    spinnerStyles,
  };
}
