import React from 'react';

import {
  ProFormaIntlProviderProps,
  withProFormaIntlProvider,
} from '@atlassian/proforma-translations';

import * as i18n from '../i18n';

/**
 * This is a simple HoC wrapper for ProFormaIntlProvider. Its purpose is to load the i18n messages from proforma-common-core
 * and pass them to ProFormaIntlProvider which does the actual setup of translations
 */
export const withIntlProvider = <Props extends Object>(
  WrappedComponent: React.ComponentType<Props>,
): React.FC<Props & ProFormaIntlProviderProps> =>
  withProFormaIntlProvider(i18n, WrappedComponent);
