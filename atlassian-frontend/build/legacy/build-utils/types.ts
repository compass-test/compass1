import * as bolt from 'bolt';

export type DependencyMap = Required<bolt.PackageJSON>['dependencies'];

/** TODO: Improve this type after https://hello.atlassian.net/wiki/spaces/~hobweger/pages/668331437/RFC+atlassian-frontend+package+categories+and+.jsons */
export interface AFPackageJson extends bolt.PackageJSON {
  // Required version
  version: string;
  atlassian?: AtlassianConfig;
  'atlaskit:src'?: string;
  /** Custom entry points. A map of entry names (starting with ./) to source paths (also starting with ./) */
  'af:exports'?: Record<string, string>;
  'af:services'?: ServiceConfig;
  stricter?: StricterConfig;
  [key: string]: unknown;
}

export type AFPackage = bolt.Package<AFPackageJson>;

export type AFPackageWithRelativeDir = AFPackage & { relativeDir: string };

export type DeploymentConfig = {
  env: string | string[];
  // Use of customPipeline requires AFP approval
  customPipeline?: string;
};

export type GlobalServiceConfig = {
  serviceName: string;
  deployOnDependencies?:
    | { type: 'direct' }
    | { type: 'transitive'; depth?: number }
    | { type: 'explicit'; dependencies: Array<string> };
  slackChannelId?: string;
};

export type ServiceConfig = GlobalServiceConfig & {
  // Declaring each deployment type will opt-in to using it
  master?: {
    continuous?: DeploymentConfig;
  };
  branch?: DeploymentConfig;
};

export type StricterConfig = {
  'no-unused-dependencies'?: {
    exclude?: string[];
  };
};

export type BranchDeployManifest = {
  [pkgName: string]: { tarFile: string };
};

export type ReleaseModel = 'scheduled' | 'continuous';

export type TeamsJson = {
  [teamName: string]: {
    contributors: string[];
    'directly-responsible-individual': string;
    slack: string;
    project: string;
    primaryReleaseModel?: ReleaseModel;
  };
};

/** Converts required args to optional if they have a default
 * Example: export type UserFlags = Default<Flags, keyof typeof defaultFlags>;
 */
export type Default<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type AtlassianConfig = {
  team?: string;
  website?: {
    name: string;
    deprecated?: string;
  };
  releaseModel: ReleaseModel;
  /** Whether the package is using the deprecated way of exposing entry points using auto generation */
  deprecatedAutoEntryPoints?: boolean;
  /** Whether the product integrator and product CI will be skipped */
  disableProductCI?: boolean;
};

export type ExampleConfig = {
  testExamples?: string[];
  exampleDependencies?: string[];
};
