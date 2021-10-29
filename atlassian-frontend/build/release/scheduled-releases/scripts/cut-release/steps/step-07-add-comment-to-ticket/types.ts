import { StepFunction } from '../../types';
import { JiraClient } from '../../clients/jira';

interface StepAddCommentToTicketOpts {
  currRelease: string;
  channelUrl: string;
  client: JiraClient;
}
export type StepAddCommentToTicket = StepFunction<StepAddCommentToTicketOpts>;
