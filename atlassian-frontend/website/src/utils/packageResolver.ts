/* global PUBLIC_PATH */
import * as fs from './fs';
import { packages } from '../site';
import { Directory, Theme } from '../types';

export default (
  groupId?: string,
  packageId?: string,
  exampleId?: string,
  // Path relative to the package dir to load examples from
  examplesPath: string = 'examples',
) => {
  // REMOVE-ME: When core components are moved to `/design-system`
  if (groupId === 'design-system') {
    const groups = fs.getDirectories(packages().children);
    const resolvedGroupId = groupId || groups[0].id;

    try {
      fs.getById(groups, resolvedGroupId);
    } catch {
      groupId = 'core';
    }
  }

  const groups = fs.getDirectories(packages().children);
  const resolvedGroupId = groupId || groups[0].id;
  const group = fs.getById(groups, resolvedGroupId);
  const packagesList = fs.getDirectories(group.children);
  const resolvedPackageId = packageId || packagesList[0].id;
  let pkg;
  try {
    pkg = fs.getById(packagesList, resolvedPackageId);
  } catch (e) {
    pkg = { type: 'dir', id: '__404__', children: [] } as fs.Directory;
  }

  let examples = fs.findNormalized(pkg, `${resolvedPackageId}/${examplesPath}`);

  examples =
    examples && examples.type === 'dir' ? (examples as Directory) : null;

  let example;

  if (examples) {
    example = fs.find(examples, file => {
      if (exampleId) {
        return fs.normalize(file.id) === exampleId;
      }
      return true;
    });
  }

  const resolvedExampleId = example ? example.id : null;

  const hasChanged =
    groupId !== resolvedGroupId ||
    packageId !== resolvedPackageId ||
    (exampleId || null) !==
      (resolvedExampleId ? fs.normalize(resolvedExampleId) : null);

  return {
    hasChanged,
    groups,
    packages,
    examples,
    example,
    groupId: resolvedGroupId,
    packageId: resolvedPackageId,
    exampleId: resolvedExampleId,
  };
};

export const getLoaderUrl = (
  groupId?: string,
  packageId?: string,
  exampleId?: string,
  theme: Theme = 'none',
) => {
  if (!groupId || !packageId || !exampleId) {
    // eslint-disable-next-line no-console
    console.error(`Warning missing parameter: Please ensure that you have passed in the correct arguments:
      \n  groupId: ${String(groupId)}
      \n  packageId: ${String(packageId)}
      \n  exampleId: ${String(exampleId)}
    `);
    return;
  }

  return `${PUBLIC_PATH}examples.html?groupId=${groupId}&packageId=${packageId}&exampleId=${exampleId}&mode=${theme}`;
};
