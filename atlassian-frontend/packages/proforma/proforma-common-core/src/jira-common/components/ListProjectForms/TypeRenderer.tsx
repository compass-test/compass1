import { RequestType, TicketType } from '../../models/ProjectForm';

import { ListProjectFormsMessage } from './ListProjectFormsMessages.intl';

export interface TypeRenderer {
  filter: (t: RequestType) => boolean;
  columnName: ListProjectFormsMessage;
  groupLabel: ListProjectFormsMessage;
}

export class IssueTypeRenderer implements TypeRenderer {
  filter = (t: RequestType) => t.type === TicketType.IssueType;
  columnName = ListProjectFormsMessage.AssociatedIssueTypes;
  groupLabel = ListProjectFormsMessage.IssueTypeCount;
}

export class RequestTypeRenderer implements TypeRenderer {
  filter = (t: RequestType) => t.type === TicketType.RequestType;
  columnName = ListProjectFormsMessage.AssociatedRequestTypes;
  groupLabel = ListProjectFormsMessage.RequestTypeCount;
}
