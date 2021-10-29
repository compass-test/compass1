import path from 'path';
import semver from 'semver';

import { RuleDefinition } from '../../types';

const isDefined = <T>(x: T): x is NonNullable<T> => x != null;

const ignoredFileNames = ['utils.ts', 'readme.md'];

const ruleDefinition: RuleDefinition = {
  onProject: ({ files, rootPath }) => {
    const errors: string[] = [];

    const codemods = Object.keys(files)
      .map(fullPath => {
        const relativePath = path.relative(rootPath, fullPath);
        const segments = relativePath.split(path.sep);
        const basename = segments[segments.length - 1];
        const codemodsIdx = segments.indexOf('codemods');

        if (codemodsIdx === -1) {
          return null;
        }

        const isCodemodDir =
          codemodsIdx === segments.length - 3 && basename.startsWith('index.');

        const isCodemodFile = codemodsIdx === segments.length - 2;

        if (!(isCodemodDir || isCodemodFile)) {
          return null;
        }

        return {
          relativePath,
          name: isCodemodDir ? segments[segments.length - 2] : basename,
        };
      })
      .filter(isDefined)
      .filter(file => !ignoredFileNames.includes(file.name));

    for (const codemod of codemods) {
      // Strip any optimistic prefixes
      const prefix = codemod.name.replace(/^optimistic-/, '').split('-')[0];

      if (semver.valid(prefix) === null && prefix !== 'next') {
        errors.push(
          `Invalid codemod name: ${codemod.name} (${codemod.relativePath}).\nCodemod name must be prefixed with "next-" or a valid semver version. Non-automatic codemods may also use an "optimistic-" prefix in addition to the mandatory next/version prefix`,
        );
      }
    }

    return errors;
  },
};

export default ruleDefinition;
