import React from 'react';

import { observer } from 'mobx-react';
import { InjectedIntlProps, injectIntl } from 'react-intl';

import { OptionsType } from '@atlaskit/select';

import { usePfFlags } from '../../../jira-common/context/FlagsContext';
import { InsightChoiceApiType } from '../../../jira-common/models/ChoiceApis';
import { debounce } from '../../../jira-common/utils/CommonUtils';
import { SelectOption, toSelectOption } from '../../models/SelectOption';
import { QuestionProps } from '../QuestionProps';

import { EditDropdownMultiselect } from './edit/EditDropdownMultiselect';
import { ViewDropdownMultiselect } from './view/ViewDropdownMultiselect';

export const DropdownMultiselect = injectIntl(
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
          <ViewDropdownMultiselect
            id={id}
            options={availableOptions}
            value={currentOptions}
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
      const otherChoiceSelected =
        hasOtherChoice &&
        currentOptions.some(
          option => option.value === questionStore.otherChoiceId,
        );
      const onChange = (value: OptionsType<SelectOption>): void => {
        const newChoiceIds = value.map(option => option.value);
        questionStore.setAnswer({
          text: otherChoiceSelected ? questionStore.currentAnswer.text : '',
          choices: newChoiceIds,
        });
        if (questionStore.isInsightQuestion) {
          questionStore.setInsightAnswers(newChoiceIds);
        }
      };
      const onOtherChoiceTextChange = (
        event: React.ChangeEvent<HTMLInputElement>,
      ): void => {
        questionStore.setAnswer({
          text: event.target.value,
          choices: questionStore.currentAnswer.choices,
        });
      };

      return (
        <EditDropdownMultiselect
          id={id}
          options={availableOptions}
          value={currentOptions}
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
