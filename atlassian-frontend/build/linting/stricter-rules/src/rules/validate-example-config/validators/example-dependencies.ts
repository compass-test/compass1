/**
 * In order to optimise test caching, we want to exclude dependencies that don't affect tests from the hash calculation.
 * To do this, we require that all packages have a defined list of what examples are used by tests.
 *
 * Because not all example dependencies should be defined we have turned off the `import/no-extraneous-dependencies`
 * EsLint rule on example files.
 * In its stead, this Stricter rule ensures that required example dependencies are declared in the package's `package.json`.
 */
import path from 'path';

import { filterImportsDep, EXAMPLE_CONFIG_PATH } from '../../../common/files';
import { EnrichedPackage } from '../../../types';

import { ExampleConfigValidator } from '../types';
import { updateExampleConfig, createExampleFileRegex } from '../common';

type Error = {
  pkg: EnrichedPackage;
  shouldBeDefined: string[];
  toAdd: string[];
  toRemove: string[];
};

const defaultErrorTransformer = (errors: Error[]) =>
  errors.map(({ pkg, shouldBeDefined, toAdd, toRemove }) => ({
    message:
      `${pkg.name}: Dependencies used only by examples need to be defined in ${EXAMPLE_CONFIG_PATH} exampleDependencies: ` +
      '(' +
      toRemove
        .map(fileName => `- ${fileName}`)
        .concat(toAdd.map(fileName => `+ ${fileName}`))
        .join(', ') +
      ')',
    fix: () => updateExampleConfig(pkg, 'exampleDependencies', shouldBeDefined),
  }));

export const validateExampleDependencies: ExampleConfigValidator = ({
  pkg,
  dependencies,
  workspaceByName,
  errorTransformer = defaultErrorTransformer,
}) => {
  const errors: Error[] = [];

  const exampleFileRegex = createExampleFileRegex(pkg.packagePath);

  const depsUsedOnlyByDocExamples = new Set<string>();
  Object.keys(pkg.config.devDependencies || {}).forEach(devDependency => {
    const nonSrcFilesWithDep = filterImportsDep(
      pkg.nonSrcFiles,
      devDependency,
      dependencies,
      workspaceByName,
    );

    if (!nonSrcFilesWithDep.length) {
      return;
    }

    const onlyUsedInExamples = nonSrcFilesWithDep.every(fileName =>
      exampleFileRegex.test(fileName),
    );

    if (
      onlyUsedInExamples &&
      nonSrcFilesWithDep.every(
        fileName =>
          !(pkg.exampleConfig?.testExamples || []).includes(
            path.basename(fileName),
          ),
      )
    ) {
      // dep is used only in examples but not in any test examples
      depsUsedOnlyByDocExamples.add(devDependency);
    }
  });

  const areDefined = (pkg.exampleConfig?.exampleDependencies || []).sort();
  const shouldBeDefined = Array.from(depsUsedOnlyByDocExamples).sort();
  const toAdd = shouldBeDefined.filter(
    example => !areDefined.includes(example),
  );
  const toRemove = areDefined.filter(
    example => !shouldBeDefined.includes(example),
  );

  if (toAdd.length || toRemove.length) {
    errors.push({
      pkg,
      shouldBeDefined,
      toAdd,
      toRemove,
    });
  }

  return errorTransformer(errors);
};
