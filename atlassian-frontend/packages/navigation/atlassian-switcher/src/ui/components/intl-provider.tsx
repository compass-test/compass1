import React from 'react';
import { IntlProvider, injectIntl, InjectedIntlProps } from 'react-intl';
import { Skeleton } from '../primitives';

type I18NMessages = { [index: string]: Object | undefined };

const getCodesFromLocale = (locale: string) => {
  const match = /([a-z]*)[_-]?([A-Z]*)/i.exec(locale || '');
  if (!match) {
    throw Error('Unable to get language and country from invalid Locale');
  }
  const [, language, country] = match;
  return [language.toLowerCase(), country.toUpperCase()];
};

interface SwitcherIntlProviderType {
  children: React.ReactElement<any>;
}

const SwitcherIntlProvider = ({
  children,
  intl,
}: SwitcherIntlProviderType & InjectedIntlProps) => {
  const [language, country] = getCodesFromLocale(intl.locale.toString());

  const [isLocaleLoaded, setIsLocaleLoaded] = React.useState<boolean>(
    !language || (!country && language === 'en'), // this is the opposite of the effect below
  );

  const [messages, setMessages] = React.useState<I18NMessages | undefined>(
    undefined,
  );

  React.useEffect(() => {
    if (language) {
      const loadLanguageWithoutCountry = () => {
        // 'en' is already preloaded
        if (language === 'en') {
          setIsLocaleLoaded(true);
        } else {
          import(
            /* webpackInclude: /\.js$/ */
            /* webpackExclude: /index\.js$/ */
            /* webpackChunkName: "@ak-switcher-chunk-locale-[request]" */ `../../i18n/${language}`
          )
            .then((m) => {
              setMessages(m.default);
            })
            .finally(() => {
              setIsLocaleLoaded(true);
            });
        }
      };

      if (country) {
        import(
          /* webpackInclude: /\.js$/ */
          /* webpackExclude: /index\.js$/ */
          /* webpackChunkName: "@ak-switcher-chunk-locale-[request]" */ `../../i18n/${language}_${country}`
        )
          .then((m) => {
            setMessages(m.default);
            setIsLocaleLoaded(true);
          })
          .catch(loadLanguageWithoutCountry);
      } else {
        loadLanguageWithoutCountry();
      }
    }
  }, [language, country]);

  // delay loading until we have attempted to load the locale data otherwise we can flick from English to the user's language
  if (!isLocaleLoaded) {
    return <Skeleton />;
  }

  return <IntlProvider messages={messages}>{children}</IntlProvider>;
};

export default injectIntl<SwitcherIntlProviderType>(SwitcherIntlProvider);
