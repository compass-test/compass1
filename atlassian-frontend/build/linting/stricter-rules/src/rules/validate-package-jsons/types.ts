import { AFPackage } from '@atlaskit/build-utils/types';

interface PackageJsonValidator {
  (pkg: AFPackage, workspaces: AFPackage[]): string | undefined;
}

export type PackageJsonValidators = PackageJsonValidator[];
