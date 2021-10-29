import { FormStore } from '../stores/FormStore';
import { QuestionStore } from '../stores/QuestionStore';

export interface RenderQuestionProps {
  questionStore: QuestionStore;
  view: boolean;
  formStore: FormStore;
}

export interface QuestionProps extends RenderQuestionProps {
  id: string;
  revisionToken: string;
}
