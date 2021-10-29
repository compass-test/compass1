export type PlanNameValidation =
  | 'Running'
  | 'Valid'
  | 'Duplicate'
  | 'Empty'
  | 'None';

export type ProductMeta = {
  productName: string;
  cloudDestination: string;
};
