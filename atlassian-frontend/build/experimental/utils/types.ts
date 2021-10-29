import { AFPackageJson } from '@atlaskit/build-utils/types';

export type RepoPackage = {
  name: string;
  dir: string;
  relativeDir: string;
  config: AFPackageJson;
};

// Re-export these types until we move the rest of the build/legacy/build-utils files into build/experimental/utils
export type { AFPackageJson };
