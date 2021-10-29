import { StepFunction } from '../../types';
import { AuthorMetadata, TeamMetadata } from '../../../getPrsInRelease';
import { SlackClient } from '../../clients/slack';

interface StepSendMessagesOpts {
  currRelease: string;
  authors: AuthorMetadata;
  teams: TeamMetadata;
  client: SlackClient;
}
export type StepSendMessages = StepFunction<StepSendMessagesOpts>;
