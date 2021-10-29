import { Release } from '../../../db/entities/Release';

export type FindAllParams = {
  size?: number;
  page: number;
  withPullRequests?: boolean;
};

export type FoundRelease = Pick<
  Release,
  'name' | 'createdDate' | 'pullRequests'
>;

export type FindAllResults = { releases: FoundRelease[]; found: number };
