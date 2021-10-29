import React, { FC } from 'react';

import { observer } from 'mobx-react';

import { OptionsType, ValueType } from '@atlaskit/select';

import { usePfErrorUtils } from '../../../jira-common/context/ErrorUtilsContext';
import { usePfFlags } from '../../../jira-common/context/FlagsContext';
import { debounce } from '../../../jira-common/utils/CommonUtils';
import { FormQuestionType, FormUser } from '../../models/Form';
import { SelectOption } from '../../models/SelectOption';
import { QuestionProps } from '../QuestionProps';

import { EditUserPicker } from './edit/EditUserPicker';
import { ViewUserPicker } from './view/ViewUserPicker';

export const UserPicker: FC<QuestionProps> = observer(
  ({ id, questionStore, view, formStore }) => {
    const flags = usePfFlags();
    const errorUtils = usePfErrorUtils();

    const isMulti =
      questionStore.formQuestion.type === FormQuestionType.UserMultiple;
    const value = questionStore.currentAnswer
      ? (questionStore.currentAnswer as FormUser[]).map(item => {
          return {
            value: item.id,
            label: item.name,
          };
        })
      : null;

    if (
      view ||
      (flags.ReadOnlyQuestions && questionStore.formQuestion.readOnly)
    ) {
      return <ViewUserPicker id={id} isMulti={isMulti} value={value} />;
    }

    const loadOptions = debounce(
      (
        inputValue: string,
        callback: (options: OptionsType<SelectOption>) => void,
      ): void => {
        const input = inputValue.trim();
        if (formStore.searchUsers && input) {
          formStore
            .searchUsers(
              questionStore.formQuestion.searchType,
              questionStore.id,
              input,
            )
            .then((results: SelectOption[]) => {
              callback(results);
            })
            .catch(error => {
              errorUtils.reportError(error);
              callback([]);
            });
        } else {
          callback([]);
        }
      },
      500,
    );
    const onChange = (
      newValue: ValueType<SelectOption, typeof isMulti>,
    ): void => {
      let values: FormUser[];
      if (!newValue) {
        values = [];
      } else if (isMulti) {
        values = (newValue as SelectOption[]).map(item => {
          return {
            id: item.value,
            name: item.label,
          };
        });
      } else {
        values = [
          {
            id: (newValue as SelectOption).value,
            name: (newValue as SelectOption).label,
          },
        ];
      }
      questionStore.setAnswer(values);
    };

    return (
      <EditUserPicker
        id={id}
        isMulti={isMulti}
        value={value}
        loadOptions={loadOptions}
        onChange={onChange}
      />
    );
  },
);
