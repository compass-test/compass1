import React, { useRef, useState } from 'react';

import isEqual from 'lodash/isEqual';
import { InjectedIntlProps, injectIntl } from 'react-intl';

import { ModalTransition } from '@atlaskit/modal-dialog';
import { ErrorBoundary } from '@atlassian/proforma-common-core/jira-common';
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

import { DataConnectionsApi } from '../apis/DataConnectionsApi';
import { LiveDataConnectionsApi } from '../apis/LiveDataConnectionsApi';
import * as i18n from '../i18n';
import { DataConnectionsUtils } from '../utils/DataConnectionsUtils';

import { DataConnections } from './DataConnections';

export interface DataConnectionApis {
  dataConnectionsApi: DataConnectionsApi;
}

export interface DataConnectionModuleContext
  extends ModuleContextV3<DataConnectionApis> {}

export interface DataConnectionsSettings {}

interface DataConnectionsBaseAppProps {
  settings: BackendSettings<DataConnectionsSettings>;
  moduleContext: DataConnectionModuleContext;
  customLocale?: Locale;
}

export const DataConnectionsBaseApp = injectIntl(
  ({
    settings,
    moduleContext,
    customLocale,
    intl,
  }: DataConnectionsBaseAppProps & InjectedIntlProps) => {
    const createDataConnectionsUtils = (): DataConnectionsUtils => {
      return new DataConnectionsUtils(
        moduleContext.apis.dataConnectionsApi,
        moduleContext.utils.analyticsUtils,
        moduleContext.utils.errorUtils,
      );
    };

    const settingsRef = useRef(settings);
    const [dataConnectionsUtils, setDataConnectionsUtils] = useState(
      createDataConnectionsUtils,
    );
    if (!isEqual(settingsRef.current, settings)) {
      settingsRef.current = settings;
      setDataConnectionsUtils(createDataConnectionsUtils());
    }

    const locale = customLocale ? customLocale : parseLanguageTag(intl.locale);

    return (
      <ErrorBoundary errorUtils={moduleContext.utils.errorUtils}>
        <AsyncIntlProvider locale={locale}>
          <ProFormaIntlProvider i18nMessages={i18n}>
            <PfFlagsProvider flags={settings.flags}>
              <UtilsProvider utils={moduleContext.utils}>
                <DataConnections dataConnectionsUtils={dataConnectionsUtils} />
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

interface DataConnectionsAppProps {
  settings: BackendSettings<DataConnectionsSettings>;
}

export const DataConnectionsApp = injectIntl(
  ({ settings, intl }: DataConnectionsAppProps & InjectedIntlProps) => {
    const createModuleContext = (): DataConnectionModuleContext => {
      const utils = createUtils(
        settings,
        'AdminConnections',
        'AdminConnections',
        parseLanguageTag(intl.locale),
      );
      return {
        apis: {
          dataConnectionsApi: new LiveDataConnectionsApi(utils.apiUtil),
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
      <DataConnectionsBaseApp
        settings={settingsRef.current}
        moduleContext={moduleContext}
      />
    );
  },
);
