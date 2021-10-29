import React, { useRef, useState } from 'react';

import isEqual from 'lodash/isEqual';
import { InjectedIntlProps, injectIntl } from 'react-intl';

import { ModalTransition } from '@atlaskit/modal-dialog';
import { ErrorBoundary } from '@atlassian/proforma-common-core/jira-common';
import { LiveFormApi } from '@atlassian/proforma-common-core/jira-common-apis';
import {
  PfFlagsProvider,
  UtilsProvider,
} from '@atlassian/proforma-common-core/jira-common-context';
import {
  BackendSettings,
  PermissionLevel,
} from '@atlassian/proforma-common-core/jira-common-models';
import { FormViewModuleContext } from '@atlassian/proforma-common-core/jira-common-stores';
import { createUtils } from '@atlassian/proforma-common-core/jira-common-utils';
import {
  AsyncIntlProvider,
  Locale,
  parseLanguageTag,
  ProFormaIntlProvider,
} from '@atlassian/proforma-translations';

import { LiveIssueFormApiV3 } from '../apis/LiveIssueFormApiV3';
import * as i18n from '../i18n';
import { IssueViewStore } from '../stores/IssueViewStore';

import { IssueView } from './IssueView';

const readOnlyPermissions: PermissionLevel = {
  download: true,
};
const editPermissions: PermissionLevel = {
  ...readOnlyPermissions,
  save: true,
  submit: true,
  reopen: true,
  delete: true,
  toggleAccess: true,
  addForm: true,
};
export const adminPermissions: PermissionLevel = {
  ...editPermissions,
  unlock: true,
};

export interface IssueViewSettings {
  projectId: number;
  issueKey: string;
  issueId: number;
  userCanEditIssue?: boolean;
  userIsProjectAdmin?: boolean;
  showFormVisibility?: boolean;
}

interface IssueViewBaseAppProps {
  settings: BackendSettings<IssueViewSettings>;
  moduleContext: FormViewModuleContext;
  customLocale?: Locale;
  panelAddFormButtonClickedCount: number;
}

export const IssueViewBaseApp = injectIntl(
  ({
    settings,
    moduleContext,
    customLocale,
    intl,
    panelAddFormButtonClickedCount,
  }: IssueViewBaseAppProps & InjectedIntlProps) => {
    const createIssueViewStore = (): IssueViewStore => {
      return new IssueViewStore(
        moduleContext,
        settings.context.projectId,
        settings.context.issueKey,
        settings.context.issueId,
      );
    };

    const settingsRef = useRef(settings);
    const [issueViewStore, setIssueViewStore] = useState(createIssueViewStore);
    if (!isEqual(settingsRef.current, settings)) {
      settingsRef.current = settings;
      setIssueViewStore(createIssueViewStore());
    }

    const locale = customLocale ? customLocale : parseLanguageTag(intl.locale);

    return (
      <ErrorBoundary errorUtils={moduleContext.utils.errorUtils}>
        <AsyncIntlProvider locale={locale}>
          <ProFormaIntlProvider i18nMessages={i18n}>
            <PfFlagsProvider flags={settings.flags}>
              <UtilsProvider utils={moduleContext.utils}>
                <IssueView
                  issueViewStore={issueViewStore}
                  permissions={moduleContext.permissions}
                  showFormVisibility={
                    settings.context.showFormVisibility || false
                  }
                  panelAddFormButtonClickedCount={
                    panelAddFormButtonClickedCount
                  }
                />
                <ModalTransition>
                  <div id="pf-dialog-container" />
                </ModalTransition>
              </UtilsProvider>
            </PfFlagsProvider>
          </ProFormaIntlProvider>
        </AsyncIntlProvider>
      </ErrorBoundary>
    );
  },
);

interface IssueViewAppProps {
  settings: BackendSettings<IssueViewSettings>;
  panelAddFormButtonClickedCount: number;
}

export const IssueViewApp = injectIntl(
  ({
    settings,
    intl,
    panelAddFormButtonClickedCount,
  }: IssueViewAppProps & InjectedIntlProps) => {
    const createModuleContext = (): FormViewModuleContext => {
      const utils = createUtils(
        settings,
        'IssueView',
        'IssueView',
        parseLanguageTag(intl.locale),
      );
      return {
        permissions: settings.context.userIsProjectAdmin
          ? adminPermissions
          : settings.context.userCanEditIssue
          ? editPermissions
          : readOnlyPermissions,
        apis: {
          formApi: new LiveFormApi(utils.apiUtil),
          formApiV3: new LiveIssueFormApiV3(
            utils.apiUtil,
            settings.context.issueKey,
            settings.context.issueId,
          ),
        },
        utils: {
          analyticsUtils: utils.analyticsUtils,
          browserUtils: utils.browserUtils,
          errorUtils: utils.errorUtils,
        },
      };
    };

    const settingsRef = useRef(settings);
    const [moduleContext, setModuleContext] = useState(createModuleContext);
    if (!isEqual(settingsRef.current, settings)) {
      settingsRef.current = settings;
      setModuleContext(createModuleContext());
    }

    return (
      <IssueViewBaseApp
        settings={settingsRef.current}
        moduleContext={moduleContext}
        panelAddFormButtonClickedCount={panelAddFormButtonClickedCount}
      />
    );
  },
);
