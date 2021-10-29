export const TEMPLATES_REAL_LIST = 'TEMPLATES_REAL_LIST';
export const TEMPLATES_DEFAULT_LIST = 'TEMPLATES_DEFAULT_LIST';

export type TemplatesList =
  | typeof TEMPLATES_REAL_LIST
  | typeof TEMPLATES_DEFAULT_LIST;

export type BlueprintData = Partial<{
  name: string;
  itemModuleCompleteKey: string;
  blueprintModuleCompleteKey: string;
  contentBlueprintId: string;
  skipHowToUse: boolean;
}>;

export type BlueprintsState = {
  defaultBlueprints: BlueprintData[];
};
