import React from 'react';

import { IntlProvider } from 'react-intl';

import Button from '@atlaskit/button';
import { ModalTransition } from '@atlaskit/modal-dialog';
import { Locale, toLanguageTag } from '@atlassian/proforma-translations';

import { NoticeType } from '../src/jira-common/components/Notice/noticeTypes';
import { PfBrowserUtilsProvider } from '../src/jira-common/context/BrowserUtilsContext';
import { BackendSettings } from '../src/jira-common/models/BackendSettings';
import {
  AuthUtil,
  AuthUtilServerSettings,
} from '../src/jira-common/utils/auth/AuthUtil';
import { LiveBrowserUtils } from '../src/jira-common/utils/live/LiveBrowserUtils';

export default function ExportJiraFieldsModalExample() {
  const locale = Locale.en_AU;
  const backendSettings: BackendSettings<Object> = {
    analytics: {
      userId: '',
      hostId: '',
    },
    flags: {},
    urls: {
      api: '',
      jira: '',
      templatesService: '',
    },
    context: {},
  };
  const serverSettings: AuthUtilServerSettings = {
    apiBaseUrl: '',
  };
  const browserUtils = new LiveBrowserUtils(
    backendSettings,
    new AuthUtil(serverSettings),
    locale,
  );

  return (
    <div data-testid="proforma-browser-utils-show-notice">
      <IntlProvider locale={toLanguageTag(locale)}>
        <PfBrowserUtilsProvider browserUtils={browserUtils}>
          <Button
            onClick={() =>
              browserUtils.showNotice(NoticeType.ConfirmDeleteForm)
            }
          >
            Confirm modal
          </Button>
          <Button
            onClick={() =>
              browserUtils.showNotice(
                NoticeType.ErrorApiAddAutomationRuleFailed,
              )
            }
          >
            Error modal
          </Button>
          <ModalTransition>
            <div id="pf-dialog-container" />
          </ModalTransition>
        </PfBrowserUtilsProvider>
      </IntlProvider>
    </div>
  );
}
