import { useCallback } from 'react';

import { MutationError } from '@atlassian/dragonfruit-graphql';
import { useIntl } from '@atlassian/dragonfruit-utils';

import ScorecardErrorMessages from './messages';

interface SubmitErrors {
  submitErrors?: FormErrors;
}

type Errors = {
  handleIsInvalid: (errorMessage: string | undefined) => boolean;
  handleValidationState: (
    errorMessage: string | undefined,
  ) => 'default' | 'error';
  handleFormErrors: (
    errors: MutationError[] | undefined,
  ) => FormErrors | undefined;
  handleBaseError: (
    getState: () => SubmitErrors | undefined,
  ) => string | undefined;
  formatScorecardNameError: (error: string) => string;
  formatScorecardDescriptionError: (error: string) => string;
  formatScorecardSelectError: (error: string) => string;
  formatScorecardOwnerPickerError: (error: string) => string;
  formatScorecardBaseError: (error: string) => string;
};

/**
 * These correspond to the form field names on the create/edit scorecard modal.
 * Use `base` for general errors not associated with a specific field or associated with more than one field.
 * - String indicates there is an error to be displayed
 * - null/undefined indicates there is no error to be displayed
 */
export interface FormErrors {
  base?: string | null | undefined;
  name?: string | null | undefined;
  description?: string | null | undefined;
  owner?: string | null | undefined;
  componentTypeSelection?: string | null | undefined;
  importanceSelection?: string | null | undefined;
}

/**
 * Return true or false per the TextField isInvalid prop.
 * @param errorMessage
 */
const handleIsInvalid = (errorMessage: string | undefined): boolean => {
  return !!errorMessage;
};

/**
 * Returns 'default' or 'error' per the `Select` validationState prop.
 * @param errorMessage
 */
const handleValidationState = (
  errorMessage: string | undefined,
): 'default' | 'error' => {
  return errorMessage ? 'error' : 'default';
};

/**
 * Converts validation MutationErrors into a FormErrors object.
 *
 * If there are zero validation errors this returns undefined which indicates all of the fields were valid.
 * @param errors
 */
const handleFormErrors = (
  errors: MutationError[] | undefined,
): FormErrors | undefined => {
  if (errors === undefined) {
    return undefined;
  }

  // `errors` can literally be `[null]` sometimes... :wtf:
  const errorTypes = errors
    .filter((errorType) => errorType)
    .map((error) => error?.extensions?.errorType);

  // No errors were found!
  if (errorTypes.length === 0) {
    return undefined;
  }

  const formErrors = <FormErrors>{};

  errorTypes.forEach((errorType) => {
    // errorType here would be an enum but the errors haven't made their way into the schema yet
    switch (errorType) {
      case 'SCORECARD_NAME_BLANK':
      case 'SCORECARD_NAME_TOO_LONG':
      case 'SCORECARD_NAME_NOT_UNIQUE':
        formErrors.name = errorType;
        break;

      case 'SCORECARD_DESCRIPTION_BLANK':
      case 'SCORECARD_DESCRIPTION_TOO_LONG':
        formErrors.description = errorType;
        break;

      case 'SCORECARD_REQUIRED_IMPORTANCE_MUST_HAVE_ADMIN_PERM':
        formErrors.owner = errorType;
        break;

      case 'SCORECARD_CRITERIA_WEIGHT_TOTAL_INVALID':
        formErrors.base = errorType;
        break;
    }
  });

  return formErrors;
};

/**
 * Extract `base` error from the `getState` method returned from Form.
 * @param getState
 */
const handleBaseError = (
  getState: () => SubmitErrors | undefined,
): string | undefined => {
  // The callback passed to Atlaskit Form gives access to the state of the form via `getState`. The `submitErrors`
  // value is a FormErrors object we generated from the GraphQL mutation errors.
  const baseError = getState()?.submitErrors?.base;

  if (baseError) {
    return baseError;
  }
};

export const useErrors = (): Errors => {
  const { formatMessage } = useIntl();

  /**
   * Map a scorecard `name` field validation error to a translated message to be displayed on the form.
   * @param error
   */
  const formatScorecardNameError = useCallback(
    (error: string): string => {
      switch (error) {
        case 'SCORECARD_NAME_BLANK':
          return formatMessage(ScorecardErrorMessages.ScorecardNameBlank);
        case 'SCORECARD_NAME_TOO_LONG':
          return formatMessage(ScorecardErrorMessages.ScorecardNameTooLong);
        case 'SCORECARD_NAME_NOT_UNIQUE':
          return formatMessage(ScorecardErrorMessages.ScorecardNameNotUnique);
        default:
          return error;
      }
    },
    [formatMessage],
  );

  /**
   * Map a scorecard `description` field validation error to a translated message to be displayed on the form.
   * @param error
   */
  const formatScorecardDescriptionError = useCallback(
    (error: string): string => {
      switch (error) {
        case 'SCORECARD_DESCRIPTION_BLANK':
          return formatMessage(
            ScorecardErrorMessages.ScorecardDescriptionBlank,
          );
        case 'SCORECARD_DESCRIPTION_TOO_LONG':
          return formatMessage(
            ScorecardErrorMessages.ScorecardDescriptionTooLong,
          );
        default:
          return error;
      }
    },
    [formatMessage],
  );

  /**
   * Map a scorecard `componentType` or `importance` select field validation error to a translated message
   * to be displayed on the form.
   * @param error
   */
  const formatScorecardSelectError = useCallback(
    (error: string): string => {
      switch (error) {
        case 'SCORECARD_COMPONENT_TYPE_REQUIRED':
        case 'SCORECARD_IMPORTANCE_REQUIRED':
          return formatMessage(ScorecardErrorMessages.RequiredField);
        default:
          return error;
      }
    },
    [formatMessage],
  );

  /**
   * Map a scorecard `ownerPicker` validation error to a translated message
   * to be displayed on the form.
   * @param error
   */
  const formatScorecardOwnerPickerError = useCallback(
    (error: string): string => {
      switch (error) {
        case 'SCORECARD_REQUIRED_IMPORTANCE_MUST_HAVE_ADMIN_PERM':
          return formatMessage(
            ScorecardErrorMessages.ScorecardOwnerInvalidPerms,
          );
        default:
          return error;
      }
    },
    [formatMessage],
  );

  /**
   * Map a scorecard base validation error to a translated message to be displayed at the bottom of the the form.
   * @param error
   */
  const formatScorecardBaseError = useCallback(
    (error: string): string => {
      switch (error) {
        case 'SCORECARD_CRITERIA_WEIGHT_TOTAL_INVALID':
          return formatMessage(
            ScorecardErrorMessages.ScorecardCriteriaWeightsInvalid,
          );
        case 'SCORECARD_CRITERIA_ARE_REQUIRED':
          return formatMessage(
            ScorecardErrorMessages.ScorecardCriteriaAreRequired,
          );
        case 'SCORECARD_CRITERIA_DROPDOWN_SELECT_REQUIRED':
          return formatMessage(
            ScorecardErrorMessages.ScorecardCriteriaDropdownSelectRequired,
          );

        default:
          return error;
      }
    },
    [formatMessage],
  );

  return {
    handleIsInvalid,
    handleValidationState,
    handleFormErrors,
    handleBaseError,
    formatScorecardNameError,
    formatScorecardDescriptionError,
    formatScorecardSelectError,
    formatScorecardOwnerPickerError,
    formatScorecardBaseError,
  };
};
