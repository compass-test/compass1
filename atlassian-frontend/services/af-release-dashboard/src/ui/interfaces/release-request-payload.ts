import { ReleaseStatus } from '../../db/entities/Release';
import { PullRequestEntity } from '../../db/entities/PullRequest';

export interface ReleaseRequestPayload {
  name: string;
  createdDate: string;
  status?: ReleaseStatus;
  stabilizingStatus?: string;
  releasePage?: string;
  isInConfluence?: boolean;
  isInJira?: boolean;
  isInBitbucket?: boolean;
  jiraTicket?: string;
  startDate?: string;
  dueDate?: string;
  cutDate?: string;
  releaseDate?: string;
  plannedDate?: string;
  developmentDate?: string;
  stabilizingDate?: string;
  releaseToNPMDate?: string;
  adoptedByOneProductDate?: string;
  adoptedByAllProductDate?: string;
  pullRequests: PullRequestEntity[];
}
