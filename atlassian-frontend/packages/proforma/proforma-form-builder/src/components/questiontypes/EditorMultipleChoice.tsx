import React from 'react';

import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import styled from 'styled-components';

import { Checkbox } from '@atlaskit/checkbox';
import SectionMessage from '@atlaskit/section-message';
import Textfield from '@atlaskit/textfield';
import {
  ChoiceMessage,
  ChoicePlaceholder,
  EditChoiceMessage,
  IntlChoiceMessages,
  IntlEditChoiceMessages,
} from '@atlassian/proforma-common-core/form-system';
import { QuestionParameters } from '@atlassian/proforma-common-core/form-system-models';
import {
  isInsightChoiceApi,
  JiraField,
} from '@atlassian/proforma-common-core/jira-common-models';

import { ChoiceQuestionStyles } from './styles';

interface EditorMultipleChoiceProps extends QuestionParameters {
  jiraFieldDetails?: JiraField;
}

export const EditorMultipleChoice = injectIntl(
  ({
    defaultAnswer,
    choices,
    jiraField,
    dcId,
    jiraFieldDetails,
    intl,
  }: EditorMultipleChoiceProps & InjectedIntlProps) => {
    const otherChoice = choices && choices.find(choice => choice.other);
    const showOtherChoice = !jiraField && !dcId && otherChoice;

    const isInsightQuestion =
      !!jiraField &&
      jiraFieldDetails?.choiceApi &&
      isInsightChoiceApi(jiraFieldDetails.choiceApi);
    const displayInsightChoicesLimitMsg =
      isInsightQuestion && jiraFieldDetails?.hasMoreChoices;

    return (
      <ChoiceQuestionStyles>
        {choices && choices.length ? (
          choices.map(choice => {
            if (!choice.other) {
              return (
                <Checkbox
                  label={choice.label}
                  value={choice.id}
                  key={choice.id}
                  isChecked={
                    defaultAnswer && defaultAnswer.choices
                      ? defaultAnswer.choices.findIndex(
                          (defaultChoice: string) =>
                            defaultChoice === choice.id,
                        ) >= 0
                      : false
                  }
                />
              );
            }
          })
        ) : (
          <ChoicePlaceholder />
        )}
        {showOtherChoice && (
          <>
            <Checkbox
              label={intl.formatMessage(
                IntlChoiceMessages[ChoiceMessage.OtherPlaceholder],
              )}
              value="0"
              key="0"
              isChecked={
                otherChoice && defaultAnswer && defaultAnswer.choices
                  ? defaultAnswer.choices.findIndex((defaultChoice: string) => {
                      return defaultChoice === otherChoice.id;
                    }) >= 0
                  : false
              }
            />
            <OtherDiv>
              <Textfield
                width="small"
                placeholder={intl.formatMessage(
                  IntlEditChoiceMessages[
                    EditChoiceMessage.NewOptionPlaceholder
                  ],
                )}
              />
            </OtherDiv>
          </>
        )}
        {displayInsightChoicesLimitMsg && (
          <SectionMessage appearance="warning">
            <FormattedMessage
              {...IntlChoiceMessages[ChoiceMessage.InsightChoicesLimitMsg]}
            />
          </SectionMessage>
        )}
      </ChoiceQuestionStyles>
    );
  },
);

const OtherDiv = styled.div`
  margin-left: 28px;
`;
