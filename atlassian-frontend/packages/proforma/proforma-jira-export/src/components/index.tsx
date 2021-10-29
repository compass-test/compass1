import React, { useRef, useState } from 'react';

import isEqual from 'lodash/isEqual';
import { InjectedIntlProps, injectIntl } from 'react-intl';

import { ModalTransition } from '@atlaskit/modal-dialog';
import { ErrorBoundary } from '@atlassian/proforma-common-core/jira-common';
import {
  LiveProjectApi,
  LiveProjectFormApi,
  ProjectApi,
  ProjectFormApi,
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

import { ExportApi } from '../apis/ExportApi';
import { LiveExportApi } from '../apis/LiveExportApi';
import * as untypedI18n from '../i18n';

import { Export } from './Export';

const i18n: { [index: string]: Object | undefined } = untypedI18n;

export interface ExportApis {
  projectApi: ProjectApi;
  projectFormApi: ProjectFormApi;
  exportApi: ExportApi;
}

export interface ExportModuleContext extends ModuleContextV3<ExportApis> {}

export interface ExportSettings {
  issueKeys: string[];
}

interface ExportBaseAppProps {
  settings: BackendSettings<ExportSettings>;
  moduleContext: ExportModuleContext;
  customLocale?: Locale;
}

export const ExportBaseApp = injectIntl(
  ({
    settings,
    moduleContext,
    customLocale,
    intl,
  }: ExportBaseAppProps & InjectedIntlProps) => {
    const locale = customLocale ? customLocale : parseLanguageTag(intl.locale);

    return (
      <ErrorBoundary errorUtils={moduleContext.utils.errorUtils}>
        <AsyncIntlProvider locale={locale}>
          <ProFormaIntlProvider i18nMessages={i18n}>
            <PfFlagsProvider flags={settings.flags}>
              <UtilsProvider utils={moduleContext.utils}>
                <Export
                  apis={moduleContext.apis}
                  issueKeys={settings.context.issueKeys}
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

interface ExportAppProps {
  settings: BackendSettings<ExportSettings>;
}

export const ExportApp = injectIntl(
  ({ settings, intl }: ExportAppProps & InjectedIntlProps) => {
    const createModuleContext = (): ExportModuleContext => {
      const utils = createUtils(
        settings,
        'Export',
        'Export',
        parseLanguageTag(intl.locale),
      );
      return {
        apis: {
          projectApi: new LiveProjectApi(utils.apiUtil),
          projectFormApi: new LiveProjectFormApi(utils.apiUtil),
          exportApi: new LiveExportApi(utils.apiUtil),
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
      <ExportBaseApp
        settings={settingsRef.current}
        moduleContext={moduleContext}
      />
    );
  },
);
