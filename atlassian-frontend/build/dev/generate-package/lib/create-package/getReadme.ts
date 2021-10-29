import outdent from 'outdent';
import { PackageInformation } from '../types';

export const getReadme = ({
  componentName,
  description,
  teamDir,
  packageDir,
  packageName,
  type,
}: PackageInformation) => {
  const defaultReadme = outdent`
    # ${componentName}

    ${description}\n
  `;

  const usageInstructions = outdent`
    ## Usage

    \`import ${componentName} from '${packageName}';\`

    Detailed docs and example usage can be found [here](https://atlaskit.atlassian.com/packages/${teamDir}/${packageDir}).
  `;

  if (type === 'public') {
    return `${defaultReadme}\n${usageInstructions}\n`;
  }

  return defaultReadme;
};
