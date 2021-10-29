import { Environment } from '@atlassian/pipelines-models';

import { MAX_ENVIRONMENTS, VALID_ENVIRONMENT_NAME } from '../const';

export default function validateEnvironmentName(
  name: string,
  environments: Environment[],
  maxEnvironments = MAX_ENVIRONMENTS,
): string {
  const slugify = (environmentName: string) =>
    environmentName.replace(/\s+/g, '-').toLowerCase();
  let similarEnvironmentName = '';
  const isTooSimilar = environments.some((e) => {
    if (slugify(e.name) === slugify(name)) {
      similarEnvironmentName = e.name;
      return true;
    }
  });
  if (name === '') {
    return 'Please fill out this field.';
  } else if (
    environments.some(
      (e: Environment) => e.name.toLowerCase() === name.toLowerCase(),
    )
  ) {
    return 'Environment name must be unique.';
  } else if (isTooSimilar && similarEnvironmentName) {
    return `Name is too similar to existing ${similarEnvironmentName} environment.`;
  } else if (name.length > 30) {
    return 'Environment name must be less than 30 characters.';
  } else if (!name.match(new RegExp(`^${VALID_ENVIRONMENT_NAME}$`))) {
    return `Use letters, spaces, numbers, underscore or hyphen.`;
  } else if (environments.length >= maxEnvironments) {
    return `You can only have ${maxEnvironments} environments.`;
  }
  return '';
}
