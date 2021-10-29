// Need to reach out to the package.json from the component template package
// We use a real package so that dependencies are up to date
// eslint-disable-next-line @atlassian/tangerine/import/no-relative-package-imports
import templatePkgJson from '../../../../../packages/template-dir/template-package/package.json';
import { PackageInformation } from '../types';

export const getPackageJson = ({
  componentName,
  description,
  packageName,
  team,
  type,
}: PackageInformation) => {
  let isPrivate;
  let publishConfig;
  let license;
  let author;
  let atlassian;

  if (type === 'public') {
    publishConfig = { registry: 'https://registry.npmjs.org/' };
    license = 'Apache-2.0';
    author = 'Atlassian Pty Ltd';
    atlassian = {
      team: team,
      inPublicMirror: false,
      releaseModel: 'continuous',
      website: { name: componentName },
    };
  }

  if (type === 'restricted') {
    publishConfig = {
      registry: 'https://packages.atlassian.com/api/npm/npm-remote',
    };
    author = 'Atlassian Pty Ltd';
    atlassian = {
      team: team,
      inPublicMirror: false,
      releaseModel: 'continuous',
    };
  }

  if (type === 'private') {
    isPrivate = true;
    atlassian = {
      team: team,
      inPublicMirror: false,
      releaseModel: 'continuous',
    };
  }

  const {
    name: discardName,
    version: discardVersion,
    private: discardPrivate,
    atlassian: discardAtlassian,
    ...defaultPkgJson
  } = templatePkgJson;

  return (
    JSON.stringify(
      {
        name: packageName,
        version: '0.0.0',
        description,
        ...(isPrivate && { private: isPrivate }),
        ...(author && { author }),
        ...(license && { license }),
        ...(publishConfig && { publishConfig }),
        atlassian,
        ...defaultPkgJson,
      },
      null,
      2,
    ) + '\n'
  );
};
