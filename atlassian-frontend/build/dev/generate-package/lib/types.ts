export type TemplateVariables = {
  packageName: string;
  componentName: string;
  teamDir: string;
  packageDir: string;
  team: string;
  description: string;
  testID: string;
};

export type PackageInformation = TemplateVariables & {
  type: 'public' | 'restricted' | 'private';
};
