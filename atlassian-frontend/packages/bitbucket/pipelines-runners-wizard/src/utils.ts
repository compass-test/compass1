import {
  MAX_LENGTH_OF_LABEL,
  MAX_NUMBER_OF_CUSTOM_LABELS,
  RESERVED_NAMESPACE_REGEXP,
  RUNNER_LABEL_REGEXP,
  SYSTEM_LABELS,
} from '@atlassian/pipelines-models';

import {
  LINUX_SYSTEM_OPTION,
  MAX_LENGTH_OF_NAME,
  RUNNER_LABEL_VALIDATION_MESSAGES,
  RUNNER_LABEL_WITH_SPACES_REGEXP,
  RUNNER_NAME_VALIDATION_MESSAGES,
} from './const';
import { SelectOptions } from './types';

export const detectRunnerSystemFromLabels = (
  windowsEnabled: boolean,
  customLabels: string[],
) => {
  if (!windowsEnabled) {
    return LINUX_SYSTEM_OPTION.value;
  }
  const system = customLabels.filter((value) => SYSTEM_LABELS.includes(value));
  return system.length === 0 ? LINUX_SYSTEM_OPTION.value : system[0];
};

export const reduceLabelsToSelectOptions = (
  labels: string[],
): SelectOptions[] => {
  return labels.reduce(function (reducer: SelectOptions[], label, index) {
    reducer[index] = { label: label, value: label };
    return reducer;
  }, []);
};

export const isDuplicateLabel = (
  existingLabels: string[],
  newLabel: string,
) => {
  return existingLabels.includes(newLabel);
};

export const hasRemovedDefaultOrSystemLabel = (
  labels: string[],
  unremovableLabels: string[],
) => {
  return !unremovableLabels.every((label: string) => labels.includes(label));
};

export const shouldNormaliseLabel = (label: string) => {
  return (
    RUNNER_LABEL_WITH_SPACES_REGEXP.test(label) &&
    !RUNNER_LABEL_REGEXP.test(label)
  );
};

export const normaliseLabel = (newLabel: string): string => {
  return shouldNormaliseLabel(newLabel)
    ? newLabel.replace(/\s/g, '')
    : newLabel;
};

// Validity of the label values does not correspond
// to the validity of the labels field in the form.
// An empty values array IS valid for the select component,
// however it IS NOT valid for the form, as we need labels to create a runner.
export const validateLabelValues = (
  values: string[],
  isNewLabelDuplicate: boolean,
  isNewLabelNormalised: boolean,
  numberOfUnremovableLabels: number,
) => {
  let validationMessage;

  if (isNewLabelNormalised && isNewLabelDuplicate) {
    return RUNNER_LABEL_VALIDATION_MESSAGES.duplicateLabel;
  } else if (isNewLabelNormalised) {
    validationMessage = RUNNER_LABEL_VALIDATION_MESSAGES.normalisedLabel;
  }

  const newLabel = values[values.length - 1];

  if (values.length > MAX_NUMBER_OF_CUSTOM_LABELS + numberOfUnremovableLabels) {
    return RUNNER_LABEL_VALIDATION_MESSAGES.maxLabel;
  }
  if (RESERVED_NAMESPACE_REGEXP.test(newLabel)) {
    return (
      newLabel.split('.', 1) +
      RUNNER_LABEL_VALIDATION_MESSAGES.reservedNamespace
    );
  }
  if (SYSTEM_LABELS.includes(newLabel)) {
    return newLabel + RUNNER_LABEL_VALIDATION_MESSAGES.reservedLabel;
  }
  if (newLabel.length > MAX_LENGTH_OF_LABEL) {
    return RUNNER_LABEL_VALIDATION_MESSAGES.characterLimit;
  }
  if (!RUNNER_LABEL_REGEXP.test(newLabel)) {
    return RUNNER_LABEL_VALIDATION_MESSAGES.invalidCharacters;
  }

  return validationMessage;
};

export const validateName = (value?: string) => {
  return value && value.length > MAX_LENGTH_OF_NAME
    ? RUNNER_NAME_VALIDATION_MESSAGES.characterLimit
    : undefined;
};
