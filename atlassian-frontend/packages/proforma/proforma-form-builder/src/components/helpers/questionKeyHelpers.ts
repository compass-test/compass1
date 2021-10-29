import { FormQuestions } from '@atlassian/proforma-common-core/form-system-models';

export function getQuestionKeys(questions: FormQuestions): Map<string, string> {
  const m = new Map<string, string>();
  Object.entries(questions).forEach(t => {
    if (t[1].questionKey) {
      m.set(t[0], t[1].questionKey);
    }
  });
  return m;
}

export function isDuplicateQuestionKey(
  questionId: string,
  questionKey: string,
  questionKeys: Map<string, string>,
): boolean {
  return questionKey
    ? Array.from(questionKeys).findIndex(t => {
        return t[0] !== questionId && t[1] === questionKey;
      }) >= 0
    : false;
}

export function getUniqueQuestionKey(
  questionId: string,
  questionKey: string,
  questionKeys: Map<string, string>,
): string {
  let duplicateCount = 1;
  let newQuestionKey = `${questionKey}-${duplicateCount}`;

  while (isDuplicateQuestionKey(questionId, newQuestionKey, questionKeys)) {
    duplicateCount += 1;
    newQuestionKey = `${questionKey}-${duplicateCount}`;
  }

  return newQuestionKey;
}
