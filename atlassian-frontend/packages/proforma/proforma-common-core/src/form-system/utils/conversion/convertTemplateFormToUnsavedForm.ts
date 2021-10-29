import {
  FormAnswers,
  FormQuestions,
  FormState,
  FormStatus,
  FormVisibility,
  TemplateForm,
  UnsavedForm,
} from '../../models/Form';

export function convertTemplateFormToUnsavedForm(
  templateForm: TemplateForm,
): UnsavedForm {
  const convertedForm: UnsavedForm = {
    id: undefined,
    updated: templateForm.updated,
    design: templateForm.design,
    ...(templateForm.publish && { publish: templateForm.publish }),
    state: createStateFromTemplateForm(templateForm),
  };

  return convertedForm;
}

function createStateFromTemplateForm(templateForm: TemplateForm): FormState {
  return {
    visibility: FormVisibility.Internal,
    status: FormStatus.Open,
    answers: populateDefaultAnswers(templateForm.design.questions),
  };
}

function populateDefaultAnswers(questions: FormQuestions): FormAnswers {
  const formAnswers: FormAnswers = {};

  Object.keys(questions).forEach(key => {
    const question = questions[key];

    if (question.defaultAnswer) {
      formAnswers[key] = question.defaultAnswer;
    }
  });

  return formAnswers;
}
