import {
  choiceQuestionTypes,
  FormQuestionType,
  textQuestionTypes,
} from '../models/Form';

export function isChoiceQuestionType(questionType: FormQuestionType): boolean {
  return choiceQuestionTypes.includes(questionType);
}

export function isTextQuestionType(questionType: FormQuestionType): boolean {
  return textQuestionTypes.includes(questionType);
}
