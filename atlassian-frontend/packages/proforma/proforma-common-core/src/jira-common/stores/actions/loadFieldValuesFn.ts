import { FormAnswer, FormStatus } from '../../../form-system/models/Form';
import { FormStore } from '../../../form-system/stores/FormStore';
import { ApiFieldValuesRequest } from '../../models/ApiFieldValuesRequest';
import { ApiFieldValuesResponse } from '../../models/ApiFieldValuesResponse';
import { isInsightChoiceApi } from '../../models/ChoiceApis';
import { IssueFieldAndForm } from '../../models/IssueFieldAndForm';

export const loadFieldValuesFn = (
  requestFieldValues: (
    request: ApiFieldValuesRequest,
  ) => Promise<ApiFieldValuesResponse>,
): ((formStore: FormStore) => () => Promise<void>) => {
  return (formStore: FormStore): (() => Promise<void>) => {
    return (): Promise<void> => {
      // Build a map of all linked Jira fields used by this form:
      const fieldsInUse = formStore.questions.reduce(
        (fieldsInUse, questionStore) => {
          if (
            formStore.status === FormStatus.Open &&
            questionStore.formQuestion.jiraField
          ) {
            fieldsInUse.push({
              fieldKey: questionStore.formQuestion.jiraField,
              formId: formStore.formId,
            });
          }
          return fieldsInUse;
        },
        [] as IssueFieldAndForm[],
      );
      if (fieldsInUse.length === 0) {
        return Promise.resolve();
      }

      return requestFieldValues({ fields: fieldsInUse }).then(fieldValues => {
        const fieldMap = new Map(Object.entries(fieldValues));
        formStore.questions.forEach(questionStore => {
          if (
            questionStore.formQuestion.jiraField &&
            fieldMap.has(questionStore.formQuestion.jiraField)
          ) {
            // The API and UI code have slightly different representations of answers, so choices and users need to be converted:
            const issueFieldValue = fieldMap.get(
              questionStore.formQuestion.jiraField,
            )!;
            const answer: FormAnswer = {
              ...(issueFieldValue.text && {
                text: issueFieldValue.text,
              }),
              ...(issueFieldValue.date && {
                date: issueFieldValue.date,
              }),
              ...(issueFieldValue.time && {
                time: issueFieldValue.time,
              }),
              ...(issueFieldValue.choices && {
                choices: issueFieldValue.choices.map(choice => choice.id),
              }),
              ...(issueFieldValue.users && {
                users: issueFieldValue.users.map(user => ({
                  id: user.userIdentifier,
                  name: user.displayName,
                })),
              }),
            };
            questionStore.setAnswerFromFieldValue(answer);
            if (
              issueFieldValue.choiceApi &&
              isInsightChoiceApi(issueFieldValue.choiceApi)
            ) {
              questionStore.setChoiceApi(issueFieldValue.choiceApi);
              questionStore.setInsightChoices(issueFieldValue.choices || []);
            }
          }
        });
      });
    };
  };
};
