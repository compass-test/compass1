/* eslint-disable @typescript-eslint/no-use-before-define */
import { FormQuestion, FormQuestions, TemplateForm } from '../../models/Form';

/**
 * Given a template form, remove unneeded data
 * - Remove question choices on linked fields
 * - Remove unused properties on ReadOnly questions
 * @param templateForm
 */
export function cleanupTemplateForm(templateForm: TemplateForm): TemplateForm {
  const updatedQuestions: FormQuestions = {};

  Object.keys(templateForm.design.questions).map(questionId => {
    const question = templateForm.design.questions[questionId];
    let cleanedQuestion = question;

    if (question.readOnly) {
      cleanedQuestion = removeNonReadOnlyProperties(cleanedQuestion);
    }

    if (question.jiraField || question.dcId) {
      cleanedQuestion = removeQuestionChoices(cleanedQuestion);
    }

    updatedQuestions[questionId] = cleanedQuestion;
  });

  return {
    ...templateForm,
    design: {
      ...templateForm.design,
      questions: updatedQuestions,
    },
  };
}

/**
 * Given a form question remove all non properties not relevant to a readOnly question.
 * @param question
 */
function removeNonReadOnlyProperties(question: FormQuestion): FormQuestion {
  return {
    ...question,
    validation: {},
    searchType: undefined,
  };
}

/**
 * Given a form question remove all choices.
 * @param question
 */
export function removeQuestionChoices(question: FormQuestion): FormQuestion {
  return {
    ...question,
    choices: undefined,
  };
}
