import React, { useRef, useState } from 'react';

import isEqual from 'lodash/isEqual';
import { InjectedIntlProps, injectIntl } from 'react-intl';

import { ModalTransition } from '@atlaskit/modal-dialog';
import { ErrorBoundary } from '@atlassian/proforma-common-core/jira-common';
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

import { LivePortalFormApi } from '../apis/LivePortalFormApi';
import { LivePortalFormApiV3 } from '../apis/LivePortalFormApiV3';
import * as i18n from '../i18n';
import { PortalViewStore } from '../stores/PortalViewStore';

import { PortalView } from './PortalView';

export const permissions: PermissionLevel = {
  save: true,
  submit: true,
  download: true,
};

export interface PortalViewReactContext extends FormViewModuleContext {}

export interface PortalViewSettings {
  serviceDeskId: number;
  requestTypeId: number;
  projectId: number;
  issueKey: string;
  issueId: number;
}

interface PortalViewBaseAppProps {
  settings: BackendSettings<PortalViewSettings>;
  moduleContext: FormViewModuleContext;
  customLocale?: Locale;
}

export const PortalViewBaseApp = injectIntl(
  ({
    settings,
    moduleContext,
    customLocale,
    intl,
  }: PortalViewBaseAppProps & InjectedIntlProps) => {
    const createPortalViewStore = (): PortalViewStore => {
      return new PortalViewStore(
        moduleContext,
        settings.context.serviceDeskId,
        settings.context.projectId,
        settings.context.issueKey,
        settings.context.issueId,
      );
    };

    const settingsRef = useRef(settings);
    const [portalViewStore, setPortalViewStore] = useState(
      createPortalViewStore,
    );
    if (!isEqual(settingsRef.current, settings)) {
      settingsRef.current = settings;
      setPortalViewStore(createPortalViewStore());
    }

    const locale = customLocale ? customLocale : parseLanguageTag(intl.locale);

    return (
      <ErrorBoundary errorUtils={moduleContext.utils.errorUtils}>
        <AsyncIntlProvider locale={locale}>
          <ProFormaIntlProvider i18nMessages={i18n}>
            <PfFlagsProvider flags={settings.flags}>
              <UtilsProvider utils={moduleContext.utils}>
                <PortalView
                  portalViewStore={portalViewStore}
                  permissions={permissions}
                  showFormVisibility={false}
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

interface PortalViewAppProps {
  settings: BackendSettings<PortalViewSettings>;
}

export const PortalViewApp = injectIntl(
  ({ settings, intl }: PortalViewAppProps & InjectedIntlProps) => {
    const createModuleContext = (): FormViewModuleContext => {
      const utils = createUtils(
        settings,
        'PortalView',
        'PortalView',
        parseLanguageTag(intl.locale),
      );
      return {
        permissions,
        apis: {
          formApi: new LivePortalFormApi(
            utils.apiUtil,
            settings.context.serviceDeskId,
          ),
          formApiV3: new LivePortalFormApiV3(
            utils.apiUtil,
            settings.context.serviceDeskId,
            settings.context.requestTypeId,
            settings.context.issueKey,
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
      <PortalViewBaseApp
        settings={settingsRef.current}
        moduleContext={moduleContext}
      />
    );
  },
);
