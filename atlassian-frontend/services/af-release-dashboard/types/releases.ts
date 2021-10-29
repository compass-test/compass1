import { PrMetadata } from '@atlaskit/scheduled-releases/scripts/getPrsInRelease';

export type Release = {
  name: string;
  pullRequests: PrMetadata[];
};
