import { CompassComponentType } from '@atlassian/dragonfruit-graphql';

export type ComponentOption = {
  label: string;
  type: CompassComponentType;
  isManaged: boolean;
  teamName?: string | null;
  teamAvatarUrl?: string | null;
};
