import { PlanNameValidation } from '../../../common/types';

export const invalidPlanNameValidations = new Set<PlanNameValidation>([
  'Duplicate',
  'Empty',
]);
export const validPlanNameValidations = new Set<PlanNameValidation>([
  'Valid',
  'None',
]);
