import React from 'react';

import { FormattedMessage } from 'react-intl';

import {
  FormSettings,
  FormSettingsSubmit,
} from '@atlassian/proforma-common-core/form-system-models';
import { usePfAnalyticsUtils } from '@atlassian/proforma-common-core/jira-common-context';
import { AnalyticsEventName } from '@atlassian/proforma-common-core/jira-common-utils';

import { messages } from './messages';
import { SettingToggle } from './SettingToggle';
import { SettingHeader } from './styled';

interface FormSubmissionSettingsInputProps {
  formSettings: FormSettings;
  updateFormSettings: (newFormSettings: FormSettings) => void;
}

export const FormSubmissionSettingsInput = ({
  formSettings,
  updateFormSettings,
}: FormSubmissionSettingsInputProps) => {
  const analytics = usePfAnalyticsUtils();

  const lockFormOnSubmit = formSettings.submit.lock;
  const attachPdfOnSubmit = formSettings.submit.pdf;

  const updateFormSettingsSubmit = (lock: boolean, pdf: boolean): void => {
    const formSettingsSubmit: FormSettingsSubmit = { lock, pdf };
    updateFormSettings({
      ...formSettings,
      submit: formSettingsSubmit,
    });
    analytics.track(AnalyticsEventName.FormSettingsSetOnSubmission, {
      setting: formSettingsSubmit.toString(),
    });
  };

  return (
    <>
      <SettingHeader>
        <FormattedMessage {...messages.onSubmitSettingsHeader} />
      </SettingHeader>
      <SettingToggle
        id="toggle-lockFormOnSubmit"
        message={messages.lockFormOnSubmit}
        isChecked={lockFormOnSubmit}
        onChange={() =>
          updateFormSettingsSubmit(!lockFormOnSubmit, attachPdfOnSubmit)
        }
      />
      <SettingToggle
        id="toggle-attachPdfOnSubmit"
        message={messages.attachPdfOnSubmit}
        isChecked={attachPdfOnSubmit}
        onChange={() =>
          updateFormSettingsSubmit(lockFormOnSubmit, !attachPdfOnSubmit)
        }
      />
    </>
  );
};
