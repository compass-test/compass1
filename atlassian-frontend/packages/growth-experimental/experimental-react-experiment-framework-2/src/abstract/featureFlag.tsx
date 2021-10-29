import { ExperimentResolution } from '../portable/resolver';

export interface ExperimentFeatureFlag<FlagValueType extends string | boolean> {
  featureFlag: {
    value: FlagValueType;
    name: string;
  };
}

const createDelegate = <Input, FlagValueType extends string | boolean>({
  flagName,
  flagValue,
  cohort,
  otherFeatureFlagAttributes,
}: {
  flagName: string;
  flagValue: FlagValueType;
  otherFeatureFlagAttributes?: Record<string, any>;
  cohort: string;
}) => (
  pipeline: Input,
): Input & ExperimentFeatureFlag<FlagValueType> & ExperimentResolution => {
  return {
    ...pipeline,
    cohort,
    ineligibilityReasons: [],
    featureFlag: {
      value: flagValue,
      name: flagName,
      ...otherFeatureFlagAttributes,
    },
  };
};

export const useDelegateBooleanFeatureFlag = <Input,>({
  flagName,
  flagValue,
  cohortMap,
  otherFeatureFlagAttributes,
}: {
  flagName: string;
  flagValue: boolean;
  cohortMap: { trueCohort: string; falseCohort: string };
  otherFeatureFlagAttributes?: Record<string, any>;
}) =>
  createDelegate<Input, boolean>({
    flagName,
    flagValue,
    cohort: flagValue ? cohortMap.trueCohort : cohortMap.falseCohort,
    otherFeatureFlagAttributes,
  });

export const useDelegateMultivariateFeatureFlag = <
  Input,
  FlagValueType extends string
>({
  flagName,
  flagValue,
  otherFeatureFlagAttributes,
}: {
  flagName: string;
  flagValue: FlagValueType;
  otherFeatureFlagAttributes?: Record<string, any>;
}) =>
  createDelegate<Input, FlagValueType>({
    flagName,
    flagValue,
    cohort: flagValue,
    otherFeatureFlagAttributes,
  });
