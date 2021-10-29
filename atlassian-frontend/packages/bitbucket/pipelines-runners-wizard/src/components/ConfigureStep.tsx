import React, {
  Fragment,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import Button from '@atlaskit/button';
import Form, {
  ErrorMessage,
  Field,
  HelperMessage,
  ValidMessage,
} from '@atlaskit/form';
import Select, { CreatableSelect } from '@atlaskit/select';
import TextField from '@atlaskit/textfield';
import { SELF_HOSTED_LABEL } from '@atlassian/pipelines-models';

import {
  LINUX_ARCH_OPTIONS,
  LINUX_SYSTEM_OPTION,
  RUNNER_LABEL_VALIDATION_MESSAGES,
  SystemMap,
  SystemToArchMap,
  WINDOWS_SYSTEM_OPTION,
} from '../const';
import { RunnerAction, SelectOptions } from '../types';
import {
  detectRunnerSystemFromLabels,
  hasRemovedDefaultOrSystemLabel,
  isDuplicateLabel,
  normaliseLabel,
  reduceLabelsToSelectOptions,
  validateLabelValues,
  validateName,
} from '../utils';

import ErrorBanner from './ErrorCard';
import FlagContext from './FlagContext';
import {
  ButtonWrapper,
  ConfigureWrapper,
  SelectorWrapper,
  SelectWrapper,
} from './styled';

type FormFieldValidityState = {
  [key: string]: boolean;
};

type Props = {
  onSubmit: (runnerName: string, runnerLabels: string[]) => void;
  runnerAction: RunnerAction;
  runnerActionError: boolean | string;
  customName: string;
  customLabels: string[];
  isReconfiguringRunner: boolean;
};

const ConfigureStep: React.FC<Props> = ({
  onSubmit,
  runnerAction,
  runnerActionError,
  customName,
  customLabels,
  isReconfiguringRunner,
}) => {
  const { windowsEnabled } = useContext(FlagContext);
  const initFormFieldValidity: FormFieldValidityState = {
    runnerName: isReconfiguringRunner,
    runnerLabels: true,
    systemArch: true,
  };
  const [formFieldsValidity, setFormFieldsValidity] = useState<
    FormFieldValidityState
  >(initFormFieldValidity);
  const [isFormValid, setIsFormValid] = useState(isReconfiguringRunner);
  const [runnerName, setRunnerName] = useState<string>(customName);
  const [runnerLabels, setRunnerLabels] = useState<string[]>(customLabels);
  const [invalidLabelErrorMessage, setInvalidLabelErrorMessage] = useState<
    undefined | string
  >();
  const [normalisedLabelMessage, setNormalisedLabelMessage] = useState<
    undefined | string
  >();
  const [archOptions, setArchOptions] = useState<SelectOptions[]>();
  const [system, setSystem] = useState<string>(
    detectRunnerSystemFromLabels(windowsEnabled, customLabels),
  );

  const systemOptions = useMemo(() => {
    return windowsEnabled
      ? [LINUX_SYSTEM_OPTION, WINDOWS_SYSTEM_OPTION]
      : [LINUX_SYSTEM_OPTION];
  }, [windowsEnabled]);

  const unremovableLabels = useMemo(() => {
    return [SELF_HOSTED_LABEL, system];
  }, [system]);

  const isSystemSelectDisabled = useMemo(() => {
    return isReconfiguringRunner ? true : !windowsEnabled;
  }, [isReconfiguringRunner, windowsEnabled]);

  const getDefaultSystemValue = useMemo(() => {
    return system
      ? SystemMap[system]
      : windowsEnabled
      ? undefined
      : systemOptions[0];
  }, [system, windowsEnabled, systemOptions]);

  const getDefaultArchValue = useMemo(() => {
    if (system) {
      return SystemToArchMap[system];
    }
    if (!windowsEnabled) {
      return LINUX_ARCH_OPTIONS;
    }

    return archOptions ? archOptions[0] : undefined;
  }, [archOptions, system, windowsEnabled]);

  const handleNameChange = (value?: string) => {
    if (value !== undefined) {
      setRunnerName(value);
    }

    const errorMessage = validateName(value);

    setFormFieldsValidity({
      ...formFieldsValidity,
      ['runnerName']: !!(!errorMessage && (value || customName)),
    });

    return errorMessage;
  };

  const handleLabelChange = (values: any) => {
    // trying to remove default labels
    if (
      !values ||
      (runnerLabels.length === unremovableLabels.length && values.length === 0)
    ) {
      setInvalidLabelErrorMessage(
        RUNNER_LABEL_VALIDATION_MESSAGES.removeAllDefaultLabels,
      );
      setNormalisedLabelMessage(undefined);
      return;
    }

    // trying to remove all labels in one go
    if (values.length === 0) {
      setRunnerLabels(unremovableLabels);
      setInvalidLabelErrorMessage(undefined);
      setNormalisedLabelMessage(undefined);
      return;
    }

    // Check if label was removed
    // No need to validate as previous labels should already be valid
    if (!!runnerLabels && values.length < runnerLabels.length) {
      // Check if the removed label was default label
      if (
        hasRemovedDefaultOrSystemLabel(
          values.map((item: SelectOptions) => item.label),
          unremovableLabels,
        )
      ) {
        const removedLabel = unremovableLabels.filter(
          (x) => !values.map((item: SelectOptions) => item.label).includes(x),
        );
        setInvalidLabelErrorMessage(
          removedLabel + RUNNER_LABEL_VALIDATION_MESSAGES.removeDefaultLabels,
        );
        setNormalisedLabelMessage(undefined);
        return;
      }

      setRunnerLabels(values.map((item: SelectOptions) => item.label));
      setFormFieldsValidity({
        ...formFieldsValidity,
        ['runnerLabels']: true,
      });
      setInvalidLabelErrorMessage(undefined);
      setNormalisedLabelMessage(undefined);
      return;
    }

    // Check if new label needs to be normalised and do so
    const newLabel = values[values.length - 1].label;
    const normalisedLabel = normaliseLabel(newLabel);
    const isNewLabelNormalised = normalisedLabel !== newLabel;

    // Check if new normalised label is a duplicate
    // Only need to run this check is the label was normalised,
    // as the component does not allow for duplicate labels
    const isNewLabelDuplicate =
      !!runnerLabels && isDuplicateLabel(runnerLabels, normalisedLabel);

    // Create a new set of labels based on whether the new label was normalised and a duplicate
    const newRunnerLabels = isNewLabelDuplicate
      ? runnerLabels
      : [...runnerLabels, normalisedLabel];

    // Validate the new set of labels
    const validationMessage = validateLabelValues(
      newRunnerLabels,
      isNewLabelDuplicate,
      isNewLabelNormalised,
      unremovableLabels.length,
    );

    if (
      validationMessage === undefined ||
      validationMessage === RUNNER_LABEL_VALIDATION_MESSAGES.normalisedLabel
    ) {
      setRunnerLabels(newRunnerLabels);
    }

    if (
      validationMessage === RUNNER_LABEL_VALIDATION_MESSAGES.normalisedLabel
    ) {
      setNormalisedLabelMessage(validationMessage);
      setInvalidLabelErrorMessage(undefined);
    } else {
      setInvalidLabelErrorMessage(validationMessage);
      setNormalisedLabelMessage(undefined);
    }

    setFormFieldsValidity({
      ...formFieldsValidity,
      ['runnerLabels']: !!newRunnerLabels,
    });
  };

  const handleSystemChange = (selectedSystem: any) => {
    if (selectedSystem.value === system) {
      return;
    }

    if (!!system) {
      runnerLabels.splice(1, 1, selectedSystem.value);
    } else {
      runnerLabels.splice(1, 0, selectedSystem.value);
    }

    setSystem(selectedSystem.value);
    setArchOptions([SystemToArchMap[selectedSystem.value]]);
    setInvalidLabelErrorMessage(undefined);
    setFormFieldsValidity({
      ...formFieldsValidity,
      ['systemArch']: true,
    });
  };

  const handleSubmit = () => {
    isFormValid && onSubmit(runnerName, runnerLabels);
  };

  useEffect(() => {
    let isValid = true;
    Object.values(formFieldsValidity).forEach((formField) => {
      if (!formField) {
        isValid = false;
      }
    });
    setIsFormValid(isValid);
  }, [formFieldsValidity, setIsFormValid]);

  return (
    <ConfigureWrapper runnerAction={runnerAction}>
      <Form onSubmit={handleSubmit}>
        {({ formProps }) => (
          <form {...formProps}>
            <p>System and architecture</p>
            <SelectorWrapper>
              <SelectWrapper>
                <Select
                  isDisabled={isSystemSelectDisabled}
                  classNamePrefix="react-select"
                  id="select-system"
                  options={systemOptions}
                  onChange={handleSystemChange}
                  value={getDefaultSystemValue}
                />
              </SelectWrapper>
              <SelectWrapper>
                <Select
                  isDisabled={true}
                  classNamePrefix="react-select"
                  options={archOptions}
                  value={getDefaultArchValue}
                />
              </SelectWrapper>
            </SelectorWrapper>
            <Field
              label="Runner name"
              isRequired
              name="runnerName"
              validate={handleNameChange}
            >
              {({ fieldProps, error }) => (
                <Fragment>
                  <TextField
                    testId="runnerName"
                    autoComplete="off"
                    {...fieldProps}
                    value={runnerName}
                  />
                  {error && <ErrorMessage>{error}</ErrorMessage>}
                </Fragment>
              )}
            </Field>
            <Field label="Runner labels" isRequired name="runnerLabels">
              {({}) => (
                <Fragment>
                  <CreatableSelect
                    value={reduceLabelsToSelectOptions(runnerLabels)}
                    isClearable
                    isMulti
                    placeholder="Add labels"
                    onChange={handleLabelChange}
                  />
                  {!invalidLabelErrorMessage && !normalisedLabelMessage && (
                    <HelperMessage>
                      Labels are necessary to help organise and schedule runners
                      across your builds
                    </HelperMessage>
                  )}
                  {invalidLabelErrorMessage && (
                    <ErrorMessage>{invalidLabelErrorMessage}</ErrorMessage>
                  )}
                  {normalisedLabelMessage && (
                    <ValidMessage>{normalisedLabelMessage}</ValidMessage>
                  )}
                </Fragment>
              )}
            </Field>
            {runnerActionError && (
              <ErrorBanner
                {...(typeof runnerActionError === 'string'
                  ? { errorMessage: runnerActionError }
                  : {})}
              />
            )}
            <ButtonWrapper>
              <Button
                name="finishConfiguration"
                type="submit"
                appearance="primary"
                isDisabled={!isFormValid}
              >
                {runnerAction === RunnerAction.CREATE ? 'Next' : 'Done'}
              </Button>
            </ButtonWrapper>
          </form>
        )}
      </Form>
    </ConfigureWrapper>
  );
};

export default React.memo(ConfigureStep);
