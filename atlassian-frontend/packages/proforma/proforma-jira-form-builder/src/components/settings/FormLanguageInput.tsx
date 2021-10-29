import React from 'react';

import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';

import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@atlaskit/dropdown-menu';
import {
  FormSettings,
  SelectOption,
} from '@atlassian/proforma-common-core/form-system-models';
import { usePfAnalyticsUtils } from '@atlassian/proforma-common-core/jira-common-context';
import { AnalyticsEventName } from '@atlassian/proforma-common-core/jira-common-utils';
import {
  autoTranslatedLocales,
  Locale,
  localeNamesMap,
  manuallyTranslatedLocales,
  parseLocaleCode,
} from '@atlassian/proforma-translations';

import {
  FormSettingsMessage,
  IntlFormSettingsMessages,
} from './FormBuilderSettingsMessages.intl';
import {
  LanguageDropdownWrapper,
  SettingHeader,
  SettingMessage,
} from './styled';

interface FormLanguageInputProps {
  formSettings: FormSettings;
  updateFormSettings: (newFormSettings: FormSettings) => void;
}

export const FormLanguageInput = injectIntl(
  ({
    formSettings,
    updateFormSettings,
    intl,
  }: FormLanguageInputProps & InjectedIntlProps) => {
    const analytics = usePfAnalyticsUtils();

    const selectedLocaleOption = getLocaleSelectOption(formSettings.language);

    const onChange = (newLocale: Locale): void => {
      updateFormSettings({
        ...formSettings,
        language: newLocale,
      });
      analytics.track(AnalyticsEventName.FormSettingsSetLanguage, {
        setting: newLocale,
      });
    };

    return (
      <>
        <SettingHeader>
          <FormattedMessage
            {...IntlFormSettingsMessages[FormSettingsMessage.FormLanguageLabel]}
          />
        </SettingHeader>
        <SettingMessage>
          <FormattedMessage
            {...IntlFormSettingsMessages[
              FormSettingsMessage.FormLanguageHelper
            ]}
          />
        </SettingMessage>
        <LanguageDropdownWrapper>
          <DropdownMenu
            shouldFitContainer
            trigger={
              selectedLocaleOption?.label ??
              intl.formatMessage(
                IntlFormSettingsMessages[
                  FormSettingsMessage.FormLanguageNoSelection
                ],
              )
            }
            triggerType="button"
          >
            {localeSelectGroups.map(group => (
              <DropdownItemGroup title={intl.formatMessage(group.message)}>
                {group.options.map(option => (
                  <DropdownItem onClick={() => onChange(option.value)}>
                    {option.label}
                  </DropdownItem>
                ))}
              </DropdownItemGroup>
            ))}
          </DropdownMenu>
        </LanguageDropdownWrapper>
      </>
    );
  },
);

const localeSelectGroups: {
  message: ReactIntl.FormattedMessage.MessageDescriptor;
  options: SelectOption<Locale>[];
}[] = [
  {
    message:
      IntlFormSettingsMessages[
        FormSettingsMessage.FormLanguageManuallyTranslatedGroupLabel
      ],
    options: manuallyTranslatedLocales.map(locale => ({
      label: localeNamesMap.get(locale)!,
      value: locale,
    })),
  },
  {
    message:
      IntlFormSettingsMessages[
        FormSettingsMessage.FormLanguageAutoTranslatedGroupLabel
      ],
    options: autoTranslatedLocales.map(locale => ({
      label: localeNamesMap.get(locale)!,
      value: locale,
    })),
  },
];

const getLocaleSelectOption = (
  language?: string,
): SelectOption<Locale> | undefined => {
  if (!language) {
    return undefined;
  }
  const locale = parseLocaleCode(language);
  return (
    localeSelectGroups[0].options.find(l => l.value === locale) ??
    localeSelectGroups[1].options.find(l => l.value === locale)
  );
};
