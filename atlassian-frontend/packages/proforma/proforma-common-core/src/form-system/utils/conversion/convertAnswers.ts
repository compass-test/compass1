import { FormAnswer, FormAnswers, FormQuestionType } from '../../models/Form';
import { QuestionStore } from '../../stores/QuestionStore';

export const convertAnswers = (questions: QuestionStore[]): FormAnswers => {
  const answersMap = {};
  questions.forEach(question => {
    // @ts-ignore
    answersMap[question.id.toString()] = getFormAnswer(question);
  });
  return answersMap;
};

function getFormAnswer(question: QuestionStore): FormAnswer {
  switch (question.formQuestion.type) {
    case FormQuestionType.TextShort:
    case FormQuestionType.TextLong:
    case FormQuestionType.TextParagraph:
    case FormQuestionType.TextEmail:
    case FormQuestionType.TextUrl:
    case FormQuestionType.Number:
      return { text: question.currentAnswer || null };
    case FormQuestionType.DateTime:
      return {
        date: question.currentAnswer.date || null,
        time: question.currentAnswer.time || null,
      };
    case FormQuestionType.Date:
      return { date: question.currentAnswer || null };
    case FormQuestionType.Time:
      return { time: question.currentAnswer || null };
    case FormQuestionType.ChoiceSingle:
    case FormQuestionType.ChoiceMultiple:
    case FormQuestionType.ChoiceDropdown:
    case FormQuestionType.ChoiceDropdownMultiple:
      return {
        text: question.currentAnswer.text,
        choices: question.currentAnswer.choices,
      };
    case FormQuestionType.UserSingle:
    case FormQuestionType.UserMultiple:
      return { users: question.currentAnswer };
    default:
      return { text: question.currentAnswer };
  }
}
