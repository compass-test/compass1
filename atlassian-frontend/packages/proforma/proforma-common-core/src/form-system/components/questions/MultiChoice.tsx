import React from 'react';

import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { InjectedIntlProps, injectIntl } from 'react-intl';

import { usePfFlags } from '../../../jira-common/context/FlagsContext';
import { InsightChoiceApiType } from '../../../jira-common/models/ChoiceApis';
import { QuestionProps } from '../QuestionProps';

import { ChoiceMessage, IntlChoiceMessages } from './ChoiceMessages.intl';
import { EditMultiChoice } from './edit/EditMultiChoice';
import { ViewMultiChoice } from './view/ViewMultiChoice';

export const MultiChoice = injectIntl(
  observer(
    ({ id, questionStore, view, intl }: QuestionProps & InjectedIntlProps) => {
      const flags = usePfFlags();

      const availableOptions = questionStore.availableOptions(intl);
      const currentOptions = availableOptions.filter(option =>
        questionStore.currentAnswer.choices.includes(option.value),
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
          <ViewMultiChoice
            id={id}
            options={availableOptions}
            value={currentOptions}
            hasOtherOption={hasOtherChoice}
            otherOptionText={questionStore.currentAnswer.text}
          />
        );
      }

      const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const newChoiceId = event.target.value;
        let newChoiceIds = [...toJS(questionStore.currentAnswer.choices)];
        if (newChoiceIds.includes(newChoiceId)) {
          newChoiceIds = newChoiceIds.filter(
            choiceId => choiceId !== newChoiceId,
          );
        } else {
          newChoiceIds.push(newChoiceId);
        }
        questionStore.setAnswer({
          text:
            hasOtherChoice &&
            newChoiceIds.some(
              choiceId => choiceId === questionStore.otherChoiceId,
            )
              ? questionStore.currentAnswer.text
              : '',
          choices: newChoiceIds,
        });
        if (questionStore.isInsightQuestion) {
          questionStore.setInsightAnswers(newChoiceIds);
        }
      };
      const otherChoiceSelected =
        hasOtherChoice &&
        currentOptions.some(
          option => option.value === questionStore.otherChoiceId,
        );
      const onOtherChoiceTextChange = (
        event: React.ChangeEvent<HTMLInputElement>,
      ): void => {
        questionStore.setAnswer({
          text: event.target.value,
          choices: questionStore.currentAnswer.choices,
        });
      };

      return (
        <EditMultiChoice
          id={id}
          options={availableOptions}
          value={currentOptions}
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
