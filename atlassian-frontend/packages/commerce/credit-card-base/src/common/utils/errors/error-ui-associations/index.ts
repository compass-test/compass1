import * as BindingLevels from './binding-levels';

export { BindingLevels };

export type GenericUIAssociation = {
  type: typeof BindingLevels.NONE;
};

export type InputGroupingUIAssociation = {
  type: typeof BindingLevels.INPUT_GROUP;
};

export type InputUIAssociation = {
  type: typeof BindingLevels.INPUT;
  /**
   * The input name
   */
  name: string;
};

export type ActionUIAssociation = {
  type: typeof BindingLevels.ACTION;
};

/**
 * Describes what a given error is associated with in terms UI
 */
export type UIAssociation =
  | GenericUIAssociation
  | InputUIAssociation
  | ActionUIAssociation
  | InputGroupingUIAssociation;
