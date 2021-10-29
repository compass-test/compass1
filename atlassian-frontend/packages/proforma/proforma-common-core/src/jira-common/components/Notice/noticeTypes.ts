import { MessageDescriptor } from '@atlassian/proforma-translations';

import { CommonMessage, IntlCommonMessages } from '../../CommonMessages.intl';

import { ApiErrorMessage, IntlApiErrorMessages } from './ApiErrorMessages.intl';
import { ExportMessage, IntlExportMessages } from './ExportMessages.intl';
import {
  ExportProgressMessage,
  IntlExportProgressMessages,
} from './ExportProgressMessages.intl';
import { IntlNoticeMessages, NoticeMessage } from './NoticeMessages.intl';

export enum NoticeType {
  ConfirmAutomationRuleDelete = 'ConfirmAutomationRuleDelete',
  ConfirmDiscardChanges = 'ConfirmDiscardChanges',
  ConfirmDeleteForm = 'ConfirmDeleteForm',
  ConfirmChangeFormAvailabilityToInternal = 'ConfirmChangeFormAvailabilityToInternal',
  ConfirmChangeFormAvailabilityToExternal = 'ConfirmChangeFormAvailabilityToExternal',
  ConfirmCancelEdit = 'ConfirmCancelEdit',
  ConfirmSubmitForm = 'ConfirmSubmitForm',
  ConfirmSubmitFormPdf = 'ConfirmSubmitFormPdf',
  ConfirmSubmitFormLock = 'ConfirmSubmitFormLock',
  ConfirmSubmitFormPdfLock = 'ConfirmSubmitFormPdfLock',
  ConfirmReopenForm = 'ConfirmReopenForm',
  ConfirmRepositionNodeInFormBuilder = 'ConfirmRepositionNodeInFormBuilder',
  ConfirmRemoveCondition = 'ConfirmRemoveCondition',
  ErrorApiUnauthorised = 'ErrorApiUnauthorised',
  ErrorApiLiteExceeded = 'ErrorApiLiteExceeded',
  ErrorApiFullUnlicensed = 'ErrorApiFullUnlicensed',
  ErrorApiMissingPermissions = 'ErrorApiMissingPermissions',
  ErrorApiNotFound = 'ErrorApiNotFound',
  ErrorApiAddConnectionFailed = 'ErrorApiAddConnectionFailed',
  ErrorApiUpdateConnectionFailed = 'ErrorApiUpdateConnectionFailed',
  ErrorApiAddFormFailed = 'ApiAddFormFailed',
  ErrorApiSubmitFormFailed = 'ErrorApiSubmitFormFailed',
  ErrorApiSaveFormFailed = 'ErrorApiSaveFormFailed',
  ErrorApiCreateIssueFailed = 'ErrorApiCreateIssueFailed',
  ErrorApiSaveTemplateFormFailed = 'ErrorApiSaveTemplateFormFailed',
  ErrorApiLoadTemplateFormFailed = 'ErrorApiLoadTemplateFormFailed',
  ErrorApiLoadJiraFieldsFailed = 'ErrorApiLoadJiraFieldsFailed',
  ErrorApiLoadDataConnectionsFailed = 'ErrorApiLoadDataConnectionsFailed',
  ErrorApiLoadHtmlSettingsFailed = 'ErrorApiLoadHtmlSettingsFailed',
  ErrorApiLoadSettingsRefDataFailed = 'ErrorApiLoadSettingsRefDataFailed',
  ErrorApiLoadAutomationRulesFailed = 'ErrorApiLoadAutomationRulesFailed',
  ErrorApiAddAutomationRuleFailed = 'ErrorApiAddAutomationRuleFailed',
  ErrorApiUpdateAutomationRuleFailed = 'ErrorApiUpdateAutomationRuleFailed',
  ErrorApiDeleteAutomationRuleFailed = 'ErrorApiDeleteAutomationRuleFailed',
  ErrorSearchRequestExportFailed = 'ErrorSearchRequestExportFailed',
  WarningSearchRequestExportWithNoIssues = 'WarningSearchRequestExportWithNoIssues',
}

interface NoticeConfigs {
  [noticeType: string]: NoticeConfig;
}

interface NoticeConfig {
  title: MessageDescriptor;
  message: MessageDescriptor;
  confirmText: MessageDescriptor;
  isErrorNotice?: boolean;
  isWarningNotice?: boolean;
  confirmLink?: string;
}

export const Notices: NoticeConfigs = {
  [NoticeType.ConfirmAutomationRuleDelete]: {
    title: IntlNoticeMessages[NoticeMessage.AutomationRuleDeleteTitle],
    message: IntlNoticeMessages[NoticeMessage.AutomationRuleDeleteMsg],
    confirmText: IntlNoticeMessages[NoticeMessage.Delete],
  },
  [NoticeType.ConfirmDiscardChanges]: {
    title: IntlNoticeMessages[NoticeMessage.DiscardChangesTitle],
    message: IntlNoticeMessages[NoticeMessage.DiscardChangesMsg],
    confirmText: IntlNoticeMessages[NoticeMessage.Discard],
  },
  [NoticeType.ConfirmDeleteForm]: {
    title: IntlNoticeMessages[NoticeMessage.DeleteFormTitle],
    message: IntlNoticeMessages[NoticeMessage.DeleteFormMsg],
    confirmText: IntlNoticeMessages[NoticeMessage.Delete],
  },
  [NoticeType.ConfirmChangeFormAvailabilityToInternal]: {
    title: IntlNoticeMessages[NoticeMessage.ChangeFormAvailabilityTitle],
    message:
      IntlNoticeMessages[NoticeMessage.ChangeFormAvailabilityToInternalMsg],
    confirmText: IntlNoticeMessages[NoticeMessage.Change],
  },
  [NoticeType.ConfirmChangeFormAvailabilityToExternal]: {
    title: IntlNoticeMessages[NoticeMessage.ChangeFormAvailabilityTitle],
    message:
      IntlNoticeMessages[NoticeMessage.ChangeFormAvailabilityToExternalMsg],
    confirmText: IntlNoticeMessages[NoticeMessage.Change],
  },
  [NoticeType.ConfirmCancelEdit]: {
    title: IntlNoticeMessages[NoticeMessage.CancelEditFormTitle],
    message: IntlNoticeMessages[NoticeMessage.CancelEditFormMsg],
    confirmText: IntlNoticeMessages[NoticeMessage.Confirm],
  },
  [NoticeType.ConfirmSubmitForm]: {
    title: IntlNoticeMessages[NoticeMessage.SubmitFormTitle],
    message: IntlNoticeMessages[NoticeMessage.SubmitFormMsg],
    confirmText: IntlNoticeMessages[NoticeMessage.Submit],
  },
  [NoticeType.ConfirmSubmitFormPdf]: {
    title: IntlNoticeMessages[NoticeMessage.SubmitFormTitle],
    message: IntlNoticeMessages[NoticeMessage.SubmitFormPdfMsg],
    confirmText: IntlNoticeMessages[NoticeMessage.Submit],
  },
  [NoticeType.ConfirmSubmitFormLock]: {
    title: IntlNoticeMessages[NoticeMessage.SubmitFormTitle],
    message: IntlNoticeMessages[NoticeMessage.SubmitFormLockMsg],
    confirmText: IntlNoticeMessages[NoticeMessage.Submit],
  },
  [NoticeType.ConfirmSubmitFormPdfLock]: {
    title: IntlNoticeMessages[NoticeMessage.SubmitFormTitle],
    message: IntlNoticeMessages[NoticeMessage.SubmitFormPdfLockMsg],
    confirmText: IntlNoticeMessages[NoticeMessage.Submit],
  },
  [NoticeType.ConfirmReopenForm]: {
    title: IntlNoticeMessages[NoticeMessage.ReopenFormTitle],
    message: IntlNoticeMessages[NoticeMessage.ReopenFormMsg],
    confirmText: IntlNoticeMessages[NoticeMessage.Reopen],
  },
  [NoticeType.ConfirmRepositionNodeInFormBuilder]: {
    title: IntlNoticeMessages[NoticeMessage.RepositionNodeInFormBuilderTitle],
    message: IntlNoticeMessages[NoticeMessage.RepositionNodeInFormBuilderMsg],
    confirmText: IntlNoticeMessages[NoticeMessage.Confirm],
  },
  [NoticeType.ConfirmRemoveCondition]: {
    title:
      IntlNoticeMessages[
        NoticeMessage.RemoveConditionForDependentQuestionTitle
      ],
    message:
      IntlNoticeMessages[NoticeMessage.RemoveConditionForDependentQuestionMsg],
    confirmText: IntlNoticeMessages[NoticeMessage.Confirm],
  },
  [NoticeType.ErrorApiUnauthorised]: {
    title: IntlApiErrorMessages[ApiErrorMessage.UnauthorisedTitle],
    message: IntlApiErrorMessages[ApiErrorMessage.UnauthorisedMsg],
    confirmText: IntlNoticeMessages[NoticeMessage.Close],
    isErrorNotice: true,
  },
  [NoticeType.ErrorApiLiteExceeded]: {
    title: IntlApiErrorMessages[ApiErrorMessage.LiteExceededTitle],
    message: IntlApiErrorMessages[ApiErrorMessage.LiteExceededMsg],
    confirmText: IntlNoticeMessages[NoticeMessage.UpgradeNow],
    confirmLink: 'https://marketplace.atlassian.com/apps/1215833',
  },
  [NoticeType.ErrorApiFullUnlicensed]: {
    title: IntlApiErrorMessages[ApiErrorMessage.FullUnlicensedTitle],
    message: IntlApiErrorMessages[ApiErrorMessage.FullUnlicensedMsg],
    confirmText: IntlNoticeMessages[NoticeMessage.Close],
    isErrorNotice: true,
  },
  [NoticeType.ErrorApiMissingPermissions]: {
    title: IntlApiErrorMessages[ApiErrorMessage.MissingPermissionsTitle],
    message: IntlApiErrorMessages[ApiErrorMessage.MissingPermissionsMsg],
    confirmText: IntlNoticeMessages[NoticeMessage.Close],
    isErrorNotice: true,
  },
  [NoticeType.ErrorApiNotFound]: {
    title: IntlApiErrorMessages[ApiErrorMessage.NotFoundTitle],
    message: IntlApiErrorMessages[ApiErrorMessage.NotFoundMsg],
    confirmText: IntlNoticeMessages[NoticeMessage.Close],
    isErrorNotice: true,
  },
  [NoticeType.ErrorApiAddConnectionFailed]: {
    title: IntlApiErrorMessages[ApiErrorMessage.AddConnectionFailedTitle],
    message: IntlApiErrorMessages[ApiErrorMessage.AddConnectionFailedMsg],
    confirmText: IntlNoticeMessages[NoticeMessage.Close],
    isErrorNotice: true,
  },
  [NoticeType.ErrorApiUpdateConnectionFailed]: {
    title: IntlApiErrorMessages[ApiErrorMessage.UpdateConnectionFailedTitle],
    message: IntlApiErrorMessages[ApiErrorMessage.UpdateConnectionFailedMsg],
    confirmText: IntlNoticeMessages[NoticeMessage.Close],
    isErrorNotice: true,
  },
  [NoticeType.ErrorApiSubmitFormFailed]: {
    title: IntlApiErrorMessages[ApiErrorMessage.SubmitFormFailedTitle],
    message: IntlApiErrorMessages[ApiErrorMessage.SubmitFormFailedMsg],
    confirmText: IntlNoticeMessages[NoticeMessage.Close],
    isErrorNotice: true,
  },
  [NoticeType.ErrorApiSaveFormFailed]: {
    title: IntlApiErrorMessages[ApiErrorMessage.SaveFormFailedTitle],
    message: IntlApiErrorMessages[ApiErrorMessage.SaveFormFailedMsg],
    confirmText: IntlNoticeMessages[NoticeMessage.Close],
    isErrorNotice: true,
  },
  [NoticeType.ErrorApiCreateIssueFailed]: {
    title: IntlApiErrorMessages[ApiErrorMessage.CreateIssueFailedTitle],
    message: IntlApiErrorMessages[ApiErrorMessage.CreateIssueFailedMsg],
    confirmText: IntlNoticeMessages[NoticeMessage.Close],
    isErrorNotice: true,
  },
  [NoticeType.ErrorApiSaveTemplateFormFailed]: {
    title: IntlApiErrorMessages[ApiErrorMessage.SaveTemplateFormFailedTitle],
    message: IntlApiErrorMessages[ApiErrorMessage.SaveTemplateFormFailedMsg],
    confirmText: IntlNoticeMessages[NoticeMessage.Close],
    isErrorNotice: true,
  },
  [NoticeType.ErrorApiLoadTemplateFormFailed]: {
    title: IntlApiErrorMessages[ApiErrorMessage.LoadTemplateFormFailedTitle],
    message: IntlApiErrorMessages[ApiErrorMessage.LoadTemplateFormFailedMsg],
    confirmText: IntlNoticeMessages[NoticeMessage.Close],
    isErrorNotice: true,
  },
  [NoticeType.ErrorApiLoadJiraFieldsFailed]: {
    title: IntlApiErrorMessages[ApiErrorMessage.LoadJiraFieldsFailedTitle],
    message: IntlApiErrorMessages[ApiErrorMessage.LoadJiraFieldsFailedMsg],
    confirmText: IntlNoticeMessages[NoticeMessage.Close],
    isErrorNotice: true,
  },
  [NoticeType.ErrorApiLoadDataConnectionsFailed]: {
    title: IntlApiErrorMessages[ApiErrorMessage.LoadDataConnectionsFailedTitle],
    message: IntlApiErrorMessages[ApiErrorMessage.LoadDataConnectionsFailedMsg],
    confirmText: IntlNoticeMessages[NoticeMessage.Close],
    isErrorNotice: true,
  },
  [NoticeType.ErrorApiLoadHtmlSettingsFailed]: {
    title: IntlApiErrorMessages[ApiErrorMessage.LoadHtmlSettingsFailedTitle],
    message: IntlApiErrorMessages[ApiErrorMessage.LoadHtmlSettingsFailedMsg],
    confirmText: IntlNoticeMessages[NoticeMessage.Close],
    isErrorNotice: true,
  },
  [NoticeType.ErrorApiLoadSettingsRefDataFailed]: {
    title: IntlApiErrorMessages[ApiErrorMessage.LoadSettingsRefDataFailedTitle],
    message: IntlApiErrorMessages[ApiErrorMessage.LoadSettingsRefDataFailedMsg],
    confirmText: IntlNoticeMessages[NoticeMessage.Close],
    isErrorNotice: true,
  },
  [NoticeType.ErrorApiLoadAutomationRulesFailed]: {
    title: IntlApiErrorMessages[ApiErrorMessage.LoadAutomationRulesFailedTitle],
    message: IntlApiErrorMessages[ApiErrorMessage.LoadAutomationRulesFailedMsg],
    confirmText: IntlNoticeMessages[NoticeMessage.Close],
    isErrorNotice: true,
  },
  [NoticeType.ErrorApiAddAutomationRuleFailed]: {
    title: IntlApiErrorMessages[ApiErrorMessage.AddAutomationRuleFailedTitle],
    message: IntlApiErrorMessages[ApiErrorMessage.AddAutomationRuleFailedMsg],
    confirmText: IntlNoticeMessages[NoticeMessage.Close],
    isErrorNotice: true,
  },
  [NoticeType.ErrorApiUpdateAutomationRuleFailed]: {
    title:
      IntlApiErrorMessages[ApiErrorMessage.UpdateAutomationRuleFailedTitle],
    message:
      IntlApiErrorMessages[ApiErrorMessage.UpdateAutomationRuleFailedMsg],
    confirmText: IntlNoticeMessages[NoticeMessage.Close],
    isErrorNotice: true,
  },
  [NoticeType.ErrorApiDeleteAutomationRuleFailed]: {
    title:
      IntlApiErrorMessages[ApiErrorMessage.DeleteAutomationRuleFailedTitle],
    message:
      IntlApiErrorMessages[ApiErrorMessage.DeleteAutomationRuleFailedMsg],
    confirmText: IntlNoticeMessages[NoticeMessage.Close],
    isErrorNotice: true,
  },
  [NoticeType.ErrorSearchRequestExportFailed]: {
    title: IntlExportProgressMessages[ExportProgressMessage.ExportFailedTitle],
    message:
      IntlExportProgressMessages[ExportProgressMessage.ExportFailedMessage],
    confirmText: IntlCommonMessages[CommonMessage.Close],
    isErrorNotice: true,
  },
  [NoticeType.WarningSearchRequestExportWithNoIssues]: {
    title: IntlExportMessages[ExportMessage.NoIssueKeysTitle],
    message: IntlExportMessages[ExportMessage.NoIssueKeysMessage],
    confirmText: IntlCommonMessages[CommonMessage.Close],
    isWarningNotice: true,
  },
};
