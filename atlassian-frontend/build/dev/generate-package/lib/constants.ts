import path from 'path';

export const TEMPLATE_VARS: Record<string, string> = {
  packageName: 'TEMPLATE_PACKAGE_NAME',
  componentName: 'TEMPLATE_COMPONENT_NAME',
  teamDir: 'template-dir',
  packageDir: 'template-package',
  team: 'TEMPLATE_TEAM',
  description: 'TEMPLATE_DESCRIPTION',
  testID: 'TEMPLATE_TEST_ID',
};

export const templatePackagePath = path.join(
  'packages',
  'template-dir',
  'template-package',
);
