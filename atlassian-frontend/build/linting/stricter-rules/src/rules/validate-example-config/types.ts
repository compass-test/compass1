import { AFPackage, ExampleConfig } from '@atlaskit/build-utils/types';

import { EnrichedPackage, FileToData, FileToDependency } from '../../types';

export type { ExampleConfig };

interface ExampleConfigValidatorArgs {
  pkg: EnrichedPackage;
  files: FileToData;
  dependencies: FileToDependency;
  workspaceByName: Record<string, AFPackage>;
  errorTransformer?: any;
}

export interface ExampleConfigValidator {
  (args: ExampleConfigValidatorArgs): any[];
}
