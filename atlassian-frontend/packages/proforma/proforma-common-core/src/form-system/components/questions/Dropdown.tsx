import React from 'react';

import { observer } from 'mobx-react';
import { InjectedIntlProps, injectIntl } from 'react-intl';

import { OptionsType, ValueType } from '@atlaskit/select';

import { usePfFlags } from '../../../jira-common/context/FlagsContext';
import { InsightChoiceApiType } from '../../../jira-common/models/ChoiceApis';
import { debounce } from '../../../jira-common/utils/CommonUtils';
import { SelectOption, toSelectOption } from '../../models/SelectOption';
import { QuestionProps } from '../QuestionProps';

import { EditDropdown } from './edit/EditDropdown';
import { ViewDropdown } from './view/ViewDropdown';

export const Dropdown = injectIntl(
  observer(
    ({
      id,
      questionStore,
      view,
      formStore,
      intl,
    }: QuestionProps & InjectedIntlProps) => {
      const flags = usePfFlags();

      const availableOptions = questionStore.availableOptions(intl);
      const currentChoiceId = questionStore.currentAnswer?.choices?.length
        ? questionStore.currentAnswer.choices[0]
        : undefined;
      const currentOption = availableOptions.find(
        choice => choice.value === currentChoiceId,
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
          <ViewDropdown
            id={id}
            options={availableOptions}
            value={currentOption}
            hasOtherOption={hasOtherChoice}
            otherOptionText={questionStore.currentAnswer.text}
          />
        );
      }

      const loadChoices = questionStore.isInsightQuestion
        ? debounce(
            (
              inputValue: string,
              callback: (options: OptionsType<SelectOption>) => void,
            ): void => {
              formStore
                .loadChoices(questionStore.id, inputValue)
                .then(_ =>
                  callback(
                    questionStore.currentAndSearchChoices.map(toSelectOption),
                  ),
                );
            },
            500,
          )
        : undefined;
      const onChange = (value: ValueType<SelectOption>): void => {
        const selectedChoiceId = value?.value;
        const newChoiceIds = selectedChoiceId ? [selectedChoiceId] : [];
        questionStore.setAnswer({
          text:
            hasOtherChoice && selectedChoiceId === questionStore.otherChoiceId
              ? questionStore.currentAnswer.text
              : '',
          choices: newChoiceIds,
        });
        if (questionStore.isInsightQuestion) {
          questionStore.setInsightAnswers(newChoiceIds);
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
        <EditDropdown
          id={id}
          options={availableOptions}
          value={currentOption}
          loadOptions={loadChoices}
          onChange={onChange}
          hasOtherOption={hasOtherChoice}
          otherOptionSelected={otherChoiceSelected}
          otherOptionText={questionStore.currentAnswer.text}
          onOtherOptionTextChange={onOtherChoiceTextChange}
        />
      );
    },
  ),
);
