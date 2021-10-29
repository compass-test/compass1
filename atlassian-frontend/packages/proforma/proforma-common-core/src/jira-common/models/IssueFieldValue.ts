import { ChoiceApi } from '../../form-system/stores/ChoiceApi';

import { JiraFieldChoice } from './JiraFieldChoice';
import { UserPickerUser } from './UserPickerUser';

export interface IssueFieldValue {
  text?: string;
  date?: string;
  time?: string;
  choiceApi?: ChoiceApi;
  choices?: JiraFieldChoice[];
  users?: UserPickerUser[];
}
