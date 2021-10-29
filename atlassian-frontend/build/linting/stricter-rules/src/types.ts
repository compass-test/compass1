/** Types copied from stricter */

import {
  AFPackage,
  ExampleConfig,
  TeamsJson,
} from '@atlaskit/build-utils/types';

export interface EnrichedPackage extends AFPackage {
  packagePath: string;
  srcFiles: string[];
  nonSrcFiles: string[];
  testFiles: string[];
  exampleFiles: string[];
  exampleConfig: ExampleConfig;
}

export type FileFilter = RegExp | RegExp[] | Function;

export interface FileData {
  ast?: () => any;
  source?: string;
  dependencies?: string[];
}

export interface FileToData {
  [fileName: string]: FileData;
}

export interface FileToDependency {
  [fileName: string]: string[] | undefined;
}

export interface RuleUsageConfig {
  workspaces: AFPackage[];
  teams: TeamsJson;
  disableCache?: boolean;
  [prop: string]: any;
}

export interface OnProjectArgument {
  dependencies: FileToDependency;
  files: FileToData;
  rootPath: string;
  config: RuleUsageConfig;
  include?: FileFilter;
  exclude?: FileFilter;
  errorTransformer?: any;
}

type Map = Record<string, string>;

type Error = string | { message: string; fix?: () => void };

export type RuleDefinition<ErrorTypes = undefined> = {
  onProject: (args: OnProjectArgument) => Array<Error>;
} & (ErrorTypes extends undefined
  ? { errorTypes?: Map }
  : { errorTypes: ErrorTypes });
