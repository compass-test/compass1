export type PipelineResponsePayload = {
  build_number: string;
};

export const ADMIN_TEAM = 'AFP: Monorepo';

type Team = {
  'directly-responsible-individual': string;
  contributors: Array<string>;
};

export type TeamsResponsePayload = {
  [ADMIN_TEAM]: Team;
  [team: string]: Team | undefined;
};
