import React from 'react';

import { IntlProvider } from 'react-intl';

import { DEFAULT_LOCALE } from './constants';
import * as messages from './i18n';
import { ConfluenceFreePlanInfoModalProps } from './types';
import ConfluenceFreePlanModal from './ui/confluence-free-plan-info-modal';
import addLocaleSupportData from './utils';

const i18n: { [index: string]: Object | undefined } = messages;

const getCodesFromLocale = (locale: string) => {
  const match = /([a-z]*)[_-]?([A-Z]*)/i.exec(locale || '');
  if (!match) {
    throw Error('Unable to get language and country from invalid Locale');
  }
  const [, language, country] = match;

  return {
    language: language.toLowerCase(),
    country: country.toUpperCase(),
  };
};

const ConfluenceFreePlanModalComponent = (
  props: ConfluenceFreePlanInfoModalProps & {
    locale: string;
  },
) => {
  const { locale = DEFAULT_LOCALE, ...modalProps } = props;
  const { language, country } = getCodesFromLocale(locale);

  const translatedMessages =
    i18n[`${language}_${country}`] || i18n[language] || i18n.en;
  addLocaleSupportData();

  return (
    <IntlProvider locale={language} messages={translatedMessages}>
      <ConfluenceFreePlanModal {...modalProps} />
    </IntlProvider>
  );
};

export default ConfluenceFreePlanModalComponent;
