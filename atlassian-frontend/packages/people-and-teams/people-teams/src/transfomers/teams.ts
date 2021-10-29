import { RawTeamData, Team } from '../types/team';

export function trimTeamARI(id: string = '') {
  return id.replace('ari:cloud:teams::team/', '');
}

export function trimTeamAriInObject<
  T extends { teamAri?: string; id?: string }
>(team?: T) {
  if (!team) {
    return team;
  }

  return {
    ...team,
    // In API documents of Legion, `teamAri` is mentioned as team id but `id` is actually team id in return data.
    id: trimTeamARI(team.teamAri || team.id),
  };
}

export const transformTeams = (data?: RawTeamData): Team[] => {
  if (!data || !data.entities) {
    return [];
  }

  return data.entities.map(trimTeamAriInObject) as Team[];
};
