import React from 'react';
import Select from '@atlaskit/select';
import { addLocaleData } from 'react-intl';
import { supportedLocales } from '../../../src/components/i18n/utils';

const loadReactLocaleData = () => {
  supportedLocales.forEach((locale: string) => {
    const languageCode = locale.split('-')[0];
    const data = require(`react-intl/locale-data/${languageCode}`);
    addLocaleData(data);
  });
};

export default function LocaleFixture({
  locale,
  setLocale,
}: {
  locale: string;
  setLocale: Function;
}) {
  loadReactLocaleData();
  return (
    <Select
      className="single-select"
      classNamePrefix="react-select"
      options={supportedLocales.map((locale) => ({
        label: locale,
        value: locale,
      }))}
      placeholder="Choose a supported locale"
      // @ts-ignore
      onChange={(chosenOption) => setLocale(chosenOption!.value || 'en')}
      // @ts-ignore
      defaultValue={locale}
    />
  );
}
