import React, { useRef, useState } from 'react';

import isEqual from 'lodash/isEqual';
import { InjectedIntlProps, injectIntl } from 'react-intl';

import { ModalTransition } from '@atlaskit/modal-dialog';
import { ErrorBoundary } from '@atlassian/proforma-common-core/jira-common';
import {
  FormApi,
  LiveFormApi,
} from '@atlassian/proforma-common-core/jira-common-apis';
import {
  PfFlagsProvider,
  UtilsProvider,
} from '@atlassian/proforma-common-core/jira-common-context';
import { BackendSettings } from '@atlassian/proforma-common-core/jira-common-models';
import { ModuleContextV3 } from '@atlassian/proforma-common-core/jira-common-stores';
import { createUtils } from '@atlassian/proforma-common-core/jira-common-utils';
import {
  AsyncIntlProvider,
  Locale,
  parseLanguageTag,
  ProFormaIntlProvider,
} from '@atlassian/proforma-translations';

import { IssueCreateFormApiV3 } from '../apis/IssueCreateFormApiV3';
import { LiveIssueCreateFormApiV3 } from '../apis/LiveIssueCreateFormApiV3';
import { LiveUserApi } from '../apis/LiveUserApi';
import { UserApi } from '../apis/UserApi';
import * as i18n from '../i18n';
import { IssueCreateDirectStore } from '../stores/IssueCreateDirectStore';
import { IssueCreateStore } from '../stores/IssueCreateStore';

import { IssueCreate } from './IssueCreate';
import { IssueCreateDirect } from './IssueCreateDirect';

interface IssueCreateApis {
  formApi: FormApi;
  issueCreateFormApiV3: IssueCreateFormApiV3;
  userApi: UserApi;
}

export interface IssueCreateModuleContext
  extends ModuleContextV3<IssueCreateApis> {}

export interface IssueCreateSettings {
  projectId?: number;
}

interface IssueCreateBaseAppProps {
  settings: BackendSettings<IssueCreateSettings>;
  moduleContext: IssueCreateModuleContext;
  customLocale?: Locale;
}

export const IssueCreateBaseApp = injectIntl(
  ({
    settings,
    moduleContext,
    customLocale,
    intl,
  }: IssueCreateBaseAppProps & InjectedIntlProps) => {
    const createIssueCreateStore = (): IssueCreateStore => {
      return new IssueCreateStore(moduleContext, settings.context.projectId);
    };

    const settingsRef = useRef(settings);
    const [issueCreateStore, setIssueCreateStore] = useState(
      createIssueCreateStore,
    );
    if (!isEqual(settingsRef.current, settings)) {
      settingsRef.current = settings;
      setIssueCreateStore(createIssueCreateStore());
    }

    const locale = customLocale ? customLocale : parseLanguageTag(intl.locale);

    return (
      <ErrorBoundary errorUtils={moduleContext.utils.errorUtils}>
        <AsyncIntlProvider locale={locale}>
          <ProFormaIntlProvider i18nMessages={i18n}>
            <PfFlagsProvider flags={settings.flags}>
              <UtilsProvider utils={moduleContext.utils}>
                <IssueCreate issueCreateStore={issueCreateStore} />
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

interface IssueCreateAppProps {
  settings: BackendSettings<IssueCreateSettings>;
}

export const IssueCreateApp = injectIntl(
  ({ settings, intl }: IssueCreateAppProps & InjectedIntlProps) => {
    const createModuleContext = (): IssueCreateModuleContext => {
      const utils = createUtils(
        settings,
        'IssueCreate',
        'IssueCreate',
        parseLanguageTag(intl.locale),
      );
      return {
        apis: {
          formApi: new LiveFormApi(utils.apiUtil),
          issueCreateFormApiV3: new LiveIssueCreateFormApiV3(utils.apiUtil),
          userApi: new LiveUserApi(utils.apiUtil),
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
      <IssueCreateBaseApp
        settings={settingsRef.current}
        moduleContext={moduleContext}
      />
    );
  },
);
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

interface IssueCreateDirectApis {
  formApi: FormApi;
  issueCreateFormApiV3: IssueCreateFormApiV3;
}

export interface IssueCreateDirectContext
  extends ModuleContextV3<IssueCreateDirectApis> {}

export interface IssueCreateDirectSettings {
  projectId: number;
  templateFormId: number;
  issueTypeId: string;
  requestTypeId?: string;
}

interface IssueCreateDirectBaseAppProps {
  settings: BackendSettings<IssueCreateDirectSettings>;
  moduleContext: IssueCreateDirectContext;
  customLocale?: Locale;
}

export const IssueCreateDirectBaseApp = injectIntl(
  ({
    settings,
    moduleContext,
    customLocale,
    intl,
  }: IssueCreateDirectBaseAppProps & InjectedIntlProps) => {
    const createIssueCreateDirectStore = (): IssueCreateDirectStore => {
      return new IssueCreateDirectStore(
        moduleContext,
        settings.context.projectId,
        settings.context.templateFormId,
        settings.context.issueTypeId,
        settings.context.requestTypeId,
      );
    };

    const settingsRef = useRef(settings);
    const [issueCreateDirectStore, setIssueCreateDirectStore] = useState(
      createIssueCreateDirectStore,
    );
    if (!isEqual(settingsRef.current, settings)) {
      settingsRef.current = settings;
      setIssueCreateDirectStore(createIssueCreateDirectStore());
    }

    const locale = customLocale ? customLocale : parseLanguageTag(intl.locale);

    return (
      <ErrorBoundary errorUtils={moduleContext.utils.errorUtils}>
        <AsyncIntlProvider locale={locale}>
          <ProFormaIntlProvider i18nMessages={i18n}>
            <PfFlagsProvider flags={settings.flags}>
              <UtilsProvider utils={moduleContext.utils}>
                <IssueCreateDirect
                  issueCreateDirectStore={issueCreateDirectStore}
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

interface IssueCreateDirectAppProps {
  settings: BackendSettings<IssueCreateDirectSettings>;
}

export const IssueCreateDirectApp = injectIntl(
  ({ settings, intl }: IssueCreateDirectAppProps & InjectedIntlProps) => {
    const createModuleContext = (): IssueCreateDirectContext => {
      const utils = createUtils(
        settings,
        'IssueCreateDirect',
        'Create',
        parseLanguageTag(intl.locale),
      );
      return {
        apis: {
          formApi: new LiveFormApi(utils.apiUtil),
          issueCreateFormApiV3: new LiveIssueCreateFormApiV3(utils.apiUtil),
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
      <IssueCreateDirectBaseApp
        settings={settingsRef.current}
        moduleContext={moduleContext}
      />
    );
  },
);
