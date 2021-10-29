import fs from 'fs';
import path from 'path';

import { ExampleConfig } from '@atlaskit/build-utils/types';

import { EXAMPLE_CONFIG_PATH } from '../../common/files';
import { EnrichedPackage } from '../../types';

// Match example files not example helpers or constellation examples
export const createExampleFileRegex = (pkgPath: string) =>
  new RegExp(`${pkgPath}/examples/[^_][^/]*\.(t|j)sx$`);

const EXAMPLE_CONFIG_HEADER_COMMENT =
  '/**\n * This file is used by the test scaling project to optimise test result caching\n' +
  ' * Examples that are used by tests affect the outcome of tests so must be included when hashing\n' +
  " * They are defined here so the hashing algorithm doesn't need to search test files for example usage each time\n */\n";

export const updateExampleConfig = <T extends keyof ExampleConfig>(
  pkg: EnrichedPackage,
  field: T,
  data: ExampleConfig[T],
) => {
  const newExampleConfig = Object.assign({}, pkg.exampleConfig, {
    [field]: data,
  });
  fs.writeFileSync(
    path.join(pkg.dir, EXAMPLE_CONFIG_PATH),
    EXAMPLE_CONFIG_HEADER_COMMENT +
      JSON.stringify(newExampleConfig, null, 2) +
      '\n',
  );
};
