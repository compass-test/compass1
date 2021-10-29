import { CompassComponentType } from '@atlassian/dragonfruit-graphql';

export type ComponentOption = {
  label: string;
  value: string;
  type: CompassComponentType;
  description: string | null | undefined;
  ownerId: string | null | undefined;
  isManaged: boolean;
};

export type TeamComponentGroup = {
  rightColumnLabel: string;
  leftColumnLabel: string;
  options: ComponentOption[];
};

export type TeamComponentSearchResult = {
  search: (input: string) => Promise<TeamComponentGroup[]>;
};
