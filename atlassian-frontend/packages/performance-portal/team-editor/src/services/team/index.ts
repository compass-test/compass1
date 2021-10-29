import { gql, useMutation, useQuery } from '@apollo/client';

import { TeamType } from '../../types';
import {
  CreateTeamMutationResponse,
  CreateTeamMutationVariables,
  CreateUpdateTeamArgs,
  TeamByIdQueryResponse,
  TeamByIdQueryVariables,
  UpdateTeamMutationResponse,
  UpdateTeamMutationVariables,
} from '../types';

const teamByIdQuery = gql`
  query getTeamById($id: String!) {
    team(id: $id) {
      id
      teamName
    }
  }
`;

const createTeamMutation = gql`
  mutation createTeam($input: CreateTempHardcodedTeamInfoInput!) {
    createTempHardcodedTeamInfo(input: $input) {
      success
      errors {
        message
      }
      team {
        id
        teamName
      }
    }
  }
`;

const updateTeamMutation = gql`
  mutation updateTeam($input: UpdateTempHardcodedTeamInfoInput!) {
    updateTempHardcodedTeamInfo(input: $input) {
      success
      errors {
        message
      }
      team {
        id
        teamName
      }
    }
  }
`;

export const useTeamQuery = (id?: string): [boolean, TeamType | null] => {
  const { loading, data } = useQuery<
    TeamByIdQueryResponse,
    TeamByIdQueryVariables
  >(teamByIdQuery, {
    skip: !id,
    // @ts-ignore
    variables: { id },
  });

  if (!data?.team) {
    return [loading, null];
  }

  return [loading, data.team];
};

export const useTeamMutation = () => {
  const [createTeam] = useMutation<
    CreateTeamMutationResponse,
    CreateTeamMutationVariables
  >(createTeamMutation, {
    refetchQueries: ['getTeamById'],
  });

  const [updateTeam] = useMutation<
    UpdateTeamMutationResponse,
    UpdateTeamMutationVariables
  >(updateTeamMutation);

  const createHelper = ({ id, teamName }: CreateUpdateTeamArgs) => {
    return createTeam({
      variables: {
        input: { id, displayName: teamName },
      },
    });
  };

  const updateHelper = ({ id, teamName }: CreateUpdateTeamArgs) => {
    return updateTeam({
      variables: {
        input: {
          id,
          patch: {
            displayName: teamName,
          },
        },
      },
    });
  };

  return {
    createTeam: createHelper,
    updateTeam: updateHelper,
  };
};
