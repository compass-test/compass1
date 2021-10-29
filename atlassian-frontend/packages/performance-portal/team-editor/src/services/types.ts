import { TeamType } from '../types';

export type TeamByIdQueryVariables = {
  id: string;
};

export type TeamByIdQueryResponse = {
  team: TeamType;
};

export type CreateTeamMutationVariables = {
  input: {
    id: string;
    displayName: string;
  };
};

export type CreateTeamMutationResponse = {
  success: boolean;
  team: TeamType;
};

export type UpdateTeamMutationVariables = {
  input: {
    id: string;
    patch: {
      displayName: string;
    };
  };
};

export type UpdateTeamMutationResponse = {
  success: boolean;
  team: TeamType;
};

export type CreateUpdateTeamArgs = {
  id: string;
  teamName: string;
};
