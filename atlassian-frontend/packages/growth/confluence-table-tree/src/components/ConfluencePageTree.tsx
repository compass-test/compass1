import React, { Component } from 'react';
import { IntlProvider } from 'react-intl';

import PageTree from './PageTree';
import { TreeStates } from '../types';
import * as untypedI18n from '../i18n';

interface ConfluencePageTreeProps {
  contentId?: string | null;
  cloudId?: string | null;
  spaceKey?: string | null;
  readOnly?: boolean;
  onError?: (error: Error) => void;
  onStateChanged?: (status: TreeStates) => void;
  locale?: string;
}

const i18n: { [index: string]: Object } = untypedI18n;

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

export default class ConfluencePageTree extends Component<
  ConfluencePageTreeProps
> {
  static defaultProps: Partial<ConfluencePageTreeProps> = {
    readOnly: false,
    onError: () => {},
    onStateChanged: () => {},
    locale: 'en',
  };

  render() {
    const { locale = 'en' } = this.props;
    const { language, country } = getCodesFromLocale(locale);
    const translatedMessages =
      i18n[`${language}_${country}`] || i18n[language] || i18n.en;
    return (
      <IntlProvider locale={language} messages={translatedMessages}>
        <PageTree {...this.props} />
      </IntlProvider>
    );
  }
}
