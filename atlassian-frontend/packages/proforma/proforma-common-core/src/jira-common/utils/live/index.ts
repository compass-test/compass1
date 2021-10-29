import { Locale } from '@atlassian/proforma-translations';

import { ApiUtil } from '../../apis/live/ApiUtil';
import { BackendSettings } from '../../models/BackendSettings';
import { AnalyticsUtils } from '../AnalyticsUtils';
import { AuthUtil } from '../auth/AuthUtil';
import { BrowserUtils } from '../BrowserUtils';
import { ErrorUtils } from '../ErrorUtils';

import { AnalyticsSettings, LiveAnalyticsUtils } from './LiveAnalyticsUtils';
import { LiveBrowserUtils } from './LiveBrowserUtils';
import { LiveErrorUtils } from './LiveErrorUtils';

export interface CreatedUtils {
  analyticsUtils: AnalyticsUtils;
  apiUtil: ApiUtil;
  authUtil: AuthUtil;
  browserUtils: BrowserUtils;
  errorUtils: ErrorUtils;
}

export function createUtils(
  settings: BackendSettings<any>,
  errorUtilsModuleName: string,
  analyticsUtilsModuleName: string,
  locale: Locale,
): CreatedUtils {
  const analyticsSettings: AnalyticsSettings = {
    userId: settings.analytics.userId,
    hostId: settings.analytics.hostId,
  };

  const authUtil = new AuthUtil({
    apiBaseUrl: settings.urls.api,
    token: settings.token,
  });
  const browserUtils = new LiveBrowserUtils(settings, authUtil, locale);
  const errorUtils = new LiveErrorUtils(browserUtils, errorUtilsModuleName);

  const analyticsUtils = new LiveAnalyticsUtils(
    analyticsSettings,
    analyticsUtilsModuleName,
  );
  const apiUtil = new ApiUtil(settings.urls, authUtil, errorUtils);

  return {
    analyticsUtils,
    apiUtil,
    authUtil,
    browserUtils,
    errorUtils,
  };
}
