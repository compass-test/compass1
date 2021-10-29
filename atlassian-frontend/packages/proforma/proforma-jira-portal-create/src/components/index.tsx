import React, { useRef, useState } from 'react';

import isEqual from 'lodash/isEqual';
import { InjectedIntlProps, injectIntl } from 'react-intl';

import { ModalTransition } from '@atlaskit/modal-dialog';
import { ErrorBoundary } from '@atlassian/proforma-common-core/jira-common';
import {
  FormViewApisV3,
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

import { LivePortalCreateFormApiV3 } from '../apis/LivePortalCreateFormApiV3';
import * as i18n from '../i18n';
import {
  PortalCreateStore,
  RegisterPortalForm,
} from '../stores/PortalCreateStore';

import { PortalCreate } from './PortalCreate';

export interface PortalCreateModuleContext
  extends ModuleContextV3<FormViewApisV3> {}

export interface PortalCreateSettings {
  serviceDeskId: number;
  requestTypeId: number;
}

interface PortalCreateBaseAppProps {
  registerPortalForm: RegisterPortalForm;
  settings: BackendSettings<PortalCreateSettings>;
  moduleContext: PortalCreateModuleContext;
  customLocale?: Locale;
}

export const PortalCreateBaseApp = injectIntl(
  ({
    registerPortalForm,
    settings,
    moduleContext,
    customLocale,
    intl,
  }: PortalCreateBaseAppProps & InjectedIntlProps) => {
    const createPortalCreateStore = (): PortalCreateStore => {
      return new PortalCreateStore(
        moduleContext,
        settings.context.serviceDeskId,
        settings.context.requestTypeId,
        registerPortalForm,
      );
    };

    const settingsRef = useRef(settings);
    const [portalCreateStore, setPortalCreateStore] = useState(
      createPortalCreateStore,
    );
    if (!isEqual(settingsRef.current, settings)) {
      settingsRef.current = settings;
      setPortalCreateStore(createPortalCreateStore());
    }

    const locale = customLocale ? customLocale : parseLanguageTag(intl.locale);

    return (
      <ErrorBoundary errorUtils={moduleContext.utils.errorUtils}>
        <AsyncIntlProvider locale={locale}>
          <ProFormaIntlProvider i18nMessages={i18n}>
            <PfFlagsProvider flags={settings.flags}>
              <UtilsProvider utils={moduleContext.utils}>
                <PortalCreate portalCreateStore={portalCreateStore} />
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

interface PortalCreateAppProps {
  registerPortalForm: RegisterPortalForm;
  settings: BackendSettings<PortalCreateSettings>;
}

export const PortalCreateApp = injectIntl(
  ({
    registerPortalForm,
    settings,
    intl,
  }: PortalCreateAppProps & InjectedIntlProps) => {
    const createModuleContext = (): PortalCreateModuleContext => {
      const utils = createUtils(
        settings,
        'PortalCreate',
        'PortalCreate',
        parseLanguageTag(intl.locale),
      );
      return {
        apis: {
          formApi: new LiveFormApi(utils.apiUtil),
          formApiV3: new LivePortalCreateFormApiV3(
            utils.apiUtil,
            settings.context.serviceDeskId,
            settings.context.requestTypeId,
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
      <PortalCreateBaseApp
        registerPortalForm={registerPortalForm}
        settings={settings}
        moduleContext={moduleContext}
      />
    );
  },
);
