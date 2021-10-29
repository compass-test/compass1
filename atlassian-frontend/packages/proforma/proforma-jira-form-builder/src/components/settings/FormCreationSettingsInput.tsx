import React from 'react';

import { FormattedMessage } from 'react-intl';

import {
  defaultFormPublishing,
  FormPublishing,
} from '@atlassian/proforma-common-core/form-system-models';

import { messages } from './messages';
import { SettingToggle } from './SettingToggle';
import { SettingHeader } from './styled';

interface FormCreationSettingsInputProps {
  isServiceProject: boolean;
  formPublishSettings: FormPublishing;
  updateFormPublishSettings: (newFormPublishSettings: FormPublishing) => void;
}

export const FormCreationSettingsInput = ({
  isServiceProject,
  formPublishSettings,
  updateFormPublishSettings,
}: FormCreationSettingsInputProps) => {
  const submitOnCreate =
    formPublishSettings.portal !== undefined
      ? formPublishSettings.portal.submitOnCreate ||
        !!formPublishSettings.jira?.submitOnCreate
      : formPublishSettings.jira?.submitOnCreate ??
        defaultFormPublishing.submitOnCreate;
  const validateOnCreate =
    formPublishSettings.portal !== undefined
      ? formPublishSettings.portal.validateOnCreate ||
        !!formPublishSettings.jira?.validateOnCreate
      : formPublishSettings.jira?.validateOnCreate ??
        defaultFormPublishing.validateOnCreate;
  const canDisableSubmitOnCreate = // JSM or is assigned to Issue(s).
    isServiceProject ||
    !!formPublishSettings.jira?.newIssueIssueTypeIds?.length;

  const updateFormPublishing = (
    submitOnCreate: boolean,
    validateOnCreate: boolean,
  ): void => {
    if (isServiceProject) {
      updateFormPublishSettings({
        ...formPublishSettings,
        portal: {
          ...(formPublishSettings.portal ?? {
            submitOnCreate:
              formPublishSettings.jira?.submitOnCreate ??
              defaultFormPublishing.submitOnCreate,
            validateOnCreate:
              formPublishSettings.jira?.validateOnCreate ??
              defaultFormPublishing.validateOnCreate,
          }),
          submitOnCreate,
          validateOnCreate,
        },
        ...(formPublishSettings.jira && {
          // If Issue Create exists, update it to match.
          jira: {
            ...formPublishSettings.jira,
            submitOnCreate,
            validateOnCreate,
          },
        }),
      });
    } else {
      updateFormPublishSettings({
        ...formPublishSettings,
        jira: {
          ...(formPublishSettings.jira ?? defaultFormPublishing),
          submitOnCreate,
          validateOnCreate,
        },
      });
    }
  };

  return (
    <>
      <SettingHeader>
        <FormattedMessage {...messages.onCreateSettingsHeader} />
      </SettingHeader>
      <SettingToggle
        id="toggle-submitFormOnCreation"
        message={
          isServiceProject
            ? messages.submitFormOnCreationJsm
            : messages.submitFormOnCreationNonJsm
        }
        isChecked={!submitOnCreate}
        isDisabled={!canDisableSubmitOnCreate}
        onChange={() =>
          updateFormPublishing(
            !submitOnCreate,
            !submitOnCreate || validateOnCreate,
          )
        }
      />
      <SettingToggle
        id="toggle-validateFieldsOnCreation"
        message={messages.validateFieldsOnCreation}
        isChecked={!validateOnCreate}
        isDisabled={!canDisableSubmitOnCreate || submitOnCreate}
        onChange={() => updateFormPublishing(submitOnCreate, !validateOnCreate)}
      />
    </>
  );
};
