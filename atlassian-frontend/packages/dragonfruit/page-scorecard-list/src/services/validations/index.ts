import { ValueType } from '@atlaskit/select';

import { OptionWithIcon } from '../../common/ui/icon-select/types';

type Validations = {
  nameValidator: (value: string | undefined) => string | undefined;
  descriptionValidator: (value: string | undefined) => string | undefined;
  componentTypeValidator: (
    value: ValueType<OptionWithIcon> | undefined,
  ) => string | undefined;
  importanceValidator: (
    value: ValueType<OptionWithIcon> | undefined,
  ) => string | undefined;
  criteriaWeightValidator: (value: string | undefined) => string | undefined;
  handleFormValidation: (formData: any | undefined) => FormErrors | undefined;
};

/**
 * These correspond to the form field names on the create/edit scorecard modal.
 * Use `base` for general errors not associated with a specific field or associated with more than one field.
 * - String indicates there is an error to be displayed
 * - null/undefined indicates there is no error to be displayed
 */
export interface FormErrors {
  base?: string | null | undefined;
  criterias?: (string | undefined)[];
}

export const SCORECARD_NAME_MAX_CHARS = 40;
export const SCORECARD_DESCRIPTION_MAX_CHARS = 330;

const stringValidator = (
  value: string | undefined,
  maxLength: number,
  blankError: string,
  tooLongError: string,
): string | undefined => {
  if (value === undefined || value.trim().length === 0) {
    return blankError;
  } else if (value && value.length > maxLength) {
    return tooLongError;
  }
};

/**
 * Client-side `name` field validation function. To be passed to Field via `validate` prop.
 * @param value
 */
const nameValidator = (value: string | undefined): string | undefined => {
  return stringValidator(
    value,
    SCORECARD_NAME_MAX_CHARS,
    'SCORECARD_NAME_BLANK',
    'SCORECARD_NAME_TOO_LONG',
  );
};

/**
 * Client-side `description` field validation function. To be passed to Field via `validate` prop.
 * @param value
 */
const descriptionValidator = (
  value: string | undefined,
): string | undefined => {
  return stringValidator(
    value,
    SCORECARD_DESCRIPTION_MAX_CHARS,
    'SCORECARD_DESCRIPTION_BLANK',
    'SCORECARD_DESCRIPTION_TOO_LONG',
  );
};

/**
 * Client-side `componentType` field validation function. To be passed to Field via `validate` prop.
 * @param value
 */
const componentTypeValidator = (
  value: OptionWithIcon | null | undefined,
): string | undefined => {
  if (value === undefined) {
    return 'SCORECARD_COMPONENT_TYPE_REQUIRED';
  }
};

/**
 * Client-side `importance` field validation function. To be passed to Field via `validate` prop.
 * @param value
 */
const importanceValidator = (
  value: OptionWithIcon | null | undefined,
): string | undefined => {
  if (value === undefined) {
    return 'SCORECARD_IMPORTANCE_REQUIRED';
  }
};

const criteriaWeightValidator = (
  value: string | undefined,
): string | undefined => {
  if (value === undefined) {
    return 'SCORECARD_CRITERIA_WEIGHT_INVALID';
  }
};

const criteriaRequiredValidator = (
  values: any[] | undefined,
): string | undefined => {
  if (values === undefined || values.length === 0) {
    return 'SCORECARD_CRITERIA_ARE_REQUIRED';
  }
};

const criteriaDropdownSelectRequiredValidator = (
  values: any[],
): (string | undefined)[] => {
  const criteriaErrors = values.map((value) =>
    value.field === undefined
      ? 'SCORECARD_CRITERIA_DROPDOWN_SELECT_REQUIRED'
      : undefined,
  );
  return criteriaErrors;
};

const criteriaWeightTotalValidator = (
  values: any[] | undefined,
): string | undefined => {
  // This case is handled by criteriaRequiredValidator
  if (values === undefined || values.length === 0) {
    return;
  }

  const sum = values.reduce(
    (sum: number, criteria: any) => sum + (parseInt(criteria?.weight) || 0),
    0,
  );

  if (sum !== 100) {
    return 'SCORECARD_CRITERIA_WEIGHT_TOTAL_INVALID';
  }
};

const handleFormValidation = (
  formData: any | undefined,
): FormErrors | undefined => {
  const criteriaRequiredError = criteriaRequiredValidator(formData?.criterias);

  if (criteriaRequiredError) {
    return {
      base: criteriaRequiredError,
    };
  }

  const criterias = criteriaDropdownSelectRequiredValidator(
    formData?.criterias,
  );

  if (criterias.includes('SCORECARD_CRITERIA_DROPDOWN_SELECT_REQUIRED')) {
    return {
      base: 'SCORECARD_CRITERIA_DROPDOWN_SELECT_REQUIRED',
      criterias: criterias,
    };
  }

  const criteriaWeightTotalError = criteriaWeightTotalValidator(
    formData?.criterias,
  );

  if (criteriaWeightTotalError) {
    return {
      base: criteriaWeightTotalError,
    };
  }
};

export const useValidations = (): Validations => {
  return {
    nameValidator,
    descriptionValidator,
    componentTypeValidator,
    importanceValidator,
    criteriaWeightValidator,
    handleFormValidation,
  };
};
