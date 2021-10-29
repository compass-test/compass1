import { FormattedMessage } from 'react-intl';

import { Plan } from '../../common/types';
import { useFeatureFlags } from '../../controllers/feature-flags';
import { useIssueCount } from '../../controllers/issue-count';
import { usePlanMeta } from '../../controllers/plan-meta';
import { useProjectsAndReleases } from '../../controllers/projects-and-releases';

import { NAME_LIMIT } from './constants';
import messages from './messages';
import { ErrorAppearance, FormProps } from './types';

export const validationErrors = {
  planNameEmpty: 'PLAN_NAME_EMPTY',
  planNameTooLong: 'PLAN_NAME_TOO_LONG',
  issueSourcesEmpty: 'ISSUE_SOURCES_EMPTY',
  OnlyIssueLimitError: 'ONLY_ISSUE_LIMIT_ERROR',
  OnlyProjectLimitError: 'ONLY_PROJECT_LIMIT_ERROR',
  ProjectLimitAndIssueLimitError: 'PROJECT_LIMIT_AND_ISSUE_LIMIT_ERROR',
};

type ValidationError = typeof validationErrors[keyof typeof validationErrors];

export function validatePlanNameField(
  value?: string,
): ValidationError | undefined {
  if (!value || value.trim().length === 0) {
    return validationErrors.planNameEmpty;
  }

  if (value && value.length > NAME_LIMIT) {
    return validationErrors.planNameTooLong;
  }
}

export function validateIssueSources(
  issueSources?: Plan['issueSources'],
): ValidationError | undefined {
  if (
    !issueSources ||
    !issueSources.find((issueSource) => !!issueSource.value)
  ) {
    return validationErrors.issueSourcesEmpty;
  }
}

type FormErrors = Partial<Record<keyof FormProps, ValidationError>>;

export function beforeSubmit(data: FormProps): [boolean, FormErrors] {
  const errors = {
    name: validatePlanNameField(data.name.trim()),
    issueSources: validateIssueSources(data.issueSources),
  };

  const hasError = Object.values(errors).some((err) => err != null);
  return [hasError, errors];
}

type OverLimitErrorMessage = {
  type: ValidationError;
  appearance: ErrorAppearance;
  descriptor: FormattedMessage.MessageDescriptor;
  values?: {
    issueLimit: number | void;
    projectLimit: number | void;
  };
};

export const getOverLimitError = ({
  isConfigurationPage,
}: {
  isConfigurationPage: boolean;
}) => ({
  issueCount,
  projectLimit,
  issueLimit,
  isOverProjectLimit,
}: {
  issueLimit: number | void;
  issueCount: number | void;
  projectLimit: number | void;
  isOverProjectLimit: boolean;
}): ValidationError | void => {
  // ERROR TYPE
  const isOverIssueLimit =
    issueLimit != null && issueCount != null && issueCount > issueLimit;

  // if both have errors, then we merge them into one sentence
  if (isOverIssueLimit && isOverProjectLimit) {
    return validationErrors.ProjectLimitAndIssueLimitError;
  } else if (isOverProjectLimit) {
    // if only project limit has errors
    return validationErrors.OnlyProjectLimitError;
  } else if (isOverIssueLimit) {
    return validationErrors.OnlyIssueLimitError;
  }
};

export const getOverLimitErrorMessage = ({
  isConfigurationPage,
}: {
  isConfigurationPage: boolean;
}) => ({
  validationError,
  projectLimit,
  issueLimit,
}: {
  validationError: ValidationError | void;
  projectLimit: number | void;
  issueLimit: number | void;
}): OverLimitErrorMessage | void => {
  if (isConfigurationPage) {
    switch (validationError) {
      case validationErrors.ProjectLimitAndIssueLimitError:
        return {
          type: validationErrors.ProjectLimitAndIssueLimitError,
          appearance: 'error',
          descriptor: messages.issueAndProjectLimitErrorOnEditPage,
          values: { projectLimit, issueLimit },
        };
      case validationErrors.OnlyProjectLimitError:
        // if only project limit has errors
        return {
          type: validationErrors.OnlyProjectLimitError,
          appearance: 'error',
          descriptor: messages.projectLimitOnEditPage,
          values: { projectLimit, issueLimit },
        };
      case validationErrors.OnlyIssueLimitError:
        // if only project limit has errors
        return {
          type: validationErrors.OnlyIssueLimitError,
          appearance: 'warning',
          descriptor: messages.issueLimitErrorOnEditPage,
          values: { projectLimit, issueLimit },
        };
    }
  }

  /**
   * Plan creation form
   */

  switch (validationError) {
    case validationErrors.ProjectLimitAndIssueLimitError:
      return {
        type: validationErrors.ProjectLimitAndIssueLimitError,
        appearance: 'error',
        descriptor: messages.issueAndProjectLimitErrorOnCreationPage,
        values: { projectLimit, issueLimit },
      };
    case validationErrors.OnlyProjectLimitError:
      // if only project limit has errors
      return {
        type: validationErrors.OnlyProjectLimitError,
        appearance: 'error',
        descriptor: messages.projectLimitOnCreationPage,
        values: { projectLimit, issueLimit },
      };
    case validationErrors.OnlyIssueLimitError:
      // if only project limit has errors
      return {
        type: validationErrors.OnlyIssueLimitError,
        appearance: 'error',
        descriptor: messages.issueLimitErrorOnCreationPage,
        values: { projectLimit, issueLimit },
      };
  }
};

export const useIssueSourceOverLimitError = ({
  isConfigurationPage,
}: {
  isConfigurationPage: boolean;
}): {
  error: ValidationError | void;
  errorMessage: OverLimitErrorMessage | void;
} => {
  const { getNewPlanWizardIssueOverLimit } = useFeatureFlags();
  const { value: issueCount } = useIssueCount();
  const { issueLimit, projectLimit } = usePlanMeta();
  const { error: fetchPlanAndProjetsError } = useProjectsAndReleases();

  if (!getNewPlanWizardIssueOverLimit()) {
    return { error: undefined, errorMessage: undefined };
  }

  const error = getOverLimitError({ isConfigurationPage: false })({
    projectLimit,
    issueLimit,
    issueCount,
    // According to our API spec, if the project count is greater than limit
    // BE throws request 400 error without any payload, this might require to
    // be improved later. This can be tested in live the Plan Creation page.
    isOverProjectLimit: !!fetchPlanAndProjetsError,
  });

  const errorMessage = getOverLimitErrorMessage({
    isConfigurationPage,
  })({ validationError: error, projectLimit, issueLimit });

  return { error, errorMessage };
};
