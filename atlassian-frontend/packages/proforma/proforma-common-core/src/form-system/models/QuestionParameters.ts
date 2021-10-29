import { RegexPattern } from '../../jira-common/models/RegexPattern';
import { UserSearchType } from '../../jira-common/models/UserSearchType';

import { FormQuestionType } from './Form';

export interface QuestionParameters {
  type: FormQuestionType;
  id: number;
  label: string;
  description?: string;
  defaultAnswer?: QuestionParametersAnswer;
  choices?: QuestionParametersChoice[];
  validation: QuestionParametersValidation;
  users?: QuestionParametersUser[];
  jiraField?: string;
  dcId?: string;
  questionKey?: string;
  searchType?: UserSearchType;
  readOnly?: boolean;
}

export interface QuestionParametersUser {
  id: string;
  label: string;
}

export interface QuestionParametersChoice {
  id: string;
  label: string;
  other?: boolean;
}

export interface QuestionParametersValidation {
  rq?: boolean;
  mnc?: number;
  mnw?: number;
  mnn?: number;
  mnd?: string;
  mnt?: string;
  mns?: number;
  mxc?: number;
  mxw?: number;
  mxn?: number;
  mxd?: string;
  mxt?: string;
  mxs?: number;
  wh?: boolean;
  ch?: string;
  rgx?: RegexPattern;
}

export interface QuestionJiraFieldChoice {
  label: string;
  value: string;
}

export interface QuestionParametersUpdate {
  type?: FormQuestionType;
  label?: string;
  description?: string;
  defaultAnswer?: QuestionParametersAnswer;
  validation?: QuestionParametersValidation;
}

export interface QuestionParametersAnswer {
  text?: string;
  date?: string;
  time?: string;
  choices?: string[];
  users?: QuestionParametersUser[];
}
