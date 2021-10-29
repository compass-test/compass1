// Need to reach out to the package.json from the component template package
// We use a real package so that dependencies are up to date
// eslint-disable-next-line @atlassian/tangerine/import/no-relative-package-imports
import templateTsConfig from '../../../../../packages/template-dir/template-package/tsconfig.json';

import { PackageInformation } from '../types';

export const getTsConfig = ({ type }: PackageInformation) => {
  if (type !== 'public') {
    // Only public packages have docs
    templateTsConfig.include.splice(
      templateTsConfig.include.indexOf('./docs/**/*.ts'),
      1,
    );
    templateTsConfig.include.splice(
      templateTsConfig.include.indexOf('./docs/**/*.tsx'),
      1,
    );
  }
  return JSON.stringify(templateTsConfig, null, 2) + '\n';
};
