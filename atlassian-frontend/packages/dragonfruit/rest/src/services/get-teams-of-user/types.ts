import { FetchableServiceState } from '@atlassian/dragonfruit-utils';

import type { TeamDetails } from '../../types';
export type TeamsOfUserResponse = {
  entities: TeamDetails[];
  cursor: string;
};

export type TeamsOfUser = FetchableServiceState<TeamsOfUserResponse>;
