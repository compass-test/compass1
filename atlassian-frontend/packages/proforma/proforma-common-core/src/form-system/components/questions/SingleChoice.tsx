import React from 'react';

import { observer } from 'mobx-react';
import { InjectedIntlProps, injectIntl } from 'react-intl';

import { usePfFlags } from '../../../jira-common/context/FlagsContext';
import { InsightChoiceApiType } from '../../../jira-common/models/ChoiceApis';
import { QuestionProps } from '../QuestionProps';

import { ChoiceMessage, IntlChoiceMessages } from './ChoiceMessages.intl';
import { EditSingleChoice } from './edit/EditSingleChoice';
import { ViewSingleChoice } from './view/ViewSingleChoice';

export const SingleChoice = injectIntl(
  observer(
    ({ id, questionStore, view, intl }: QuestionProps & InjectedIntlProps) => {
      const flags = usePfFlags();

      const availableOptions = questionStore.availableOptions(intl);
      const currentChoiceId = questionStore.currentAnswer?.choices?.length
        ? questionStore.currentAnswer.choices[0]
        : undefined;
      const currentOption = availableOptions.find(
        option => option.value === currentChoiceId,
      );
      const hasOtherChoice = !!questionStore.otherChoiceId;

      // The ReadOnlyQuestions flag is referenced here so that this is removed when the feature flag is permanently enabled:
      const isReadOnlyInsightQuestion =
        !flags.ReadOnlyQuestions &&
        questionStore.choiceApi.api === InsightChoiceApiType.Readonly;

      if (
        view ||
        isReadOnlyInsightQuestion ||
        (flags.ReadOnlyQuestions && questionStore.formQuestion.readOnly)
      ) {
        return (
          <ViewSingleChoice
            id={id}
            options={availableOptions}
            value={currentOption}
            hasOtherOption={hasOtherChoice}
            otherOptionText={questionStore.currentAnswer.text}
          />
        );
      }

      const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const selectedChoiceId = event.target.value;
        const newChoiceId = selectedChoiceId ? [selectedChoiceId] : [];
        questionStore.setAnswer({
          text:
            hasOtherChoice && selectedChoiceId === questionStore.otherChoiceId
              ? questionStore.currentAnswer.text
              : '',
          choices: newChoiceId,
        });
        if (questionStore.isInsightQuestion) {
          questionStore.setInsightAnswers(newChoiceId);
        }
      };
      const otherChoiceSelected =
        hasOtherChoice && currentChoiceId === questionStore.otherChoiceId;
      const onOtherChoiceTextChange = (
        event: React.ChangeEvent<HTMLInputElement>,
      ): void => {
        questionStore.setAnswer({
          text: event.target.value,
          choices: questionStore.currentAnswer.choices,
        });
      };

      return (
        <EditSingleChoice
          id={id}
          options={availableOptions}
          value={currentOption}
          isInvalid={!!questionStore.validationErrors}
          onChange={onChange}
          hasOtherOption={hasOtherChoice}
          otherOptionSelected={otherChoiceSelected}
          otherOptionText={questionStore.currentAnswer.text}
          onOtherOptionTextChange={onOtherChoiceTextChange}
          warningMessage={
            (questionStore.isInsightQuestion &&
              questionStore.hasMoreChoices &&
              IntlChoiceMessages[ChoiceMessage.InsightChoicesLimitMsg]) ||
            undefined
          }
        />
      );
    },
  ),
);
