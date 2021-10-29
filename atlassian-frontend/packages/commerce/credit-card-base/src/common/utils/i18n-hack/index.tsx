/**
 * Note: This file has been written as a part of TNTEXP-32 which is a MVP-hack to support i18n
 * in HAMS<>JPY Stripe.
 */

import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
} from 'react';

// TODO: Maybe type this in the future
export type Language = string;

const preferencesContext = createContext<Language[] | undefined>(undefined);

const useLanguagePreferences = () => {
  const contextLanguages = useContext(preferencesContext);
  const languages = useMemo(() => {
    return (
      contextLanguages ??
      window.navigator.languages ?? [window.navigator.language]
    );
  }, [contextLanguages]);

  return languages;
};

export type LanguagePreferencesProviderProps = PropsWithChildren<{
  languages: Language[];
}>;
export const LanguagePreferencesProvider = ({
  children,
  languages,
}: LanguagePreferencesProviderProps) => (
  <preferencesContext.Provider value={languages}>
    {children}
  </preferencesContext.Provider>
);

export const isJapaneseLanguage = (language: Language) => {
  return /^ja(\-.*)?$/i.test(language);
};

export const isEnglishLanguage = (language: Language) => {
  return /^en(\-.*)?$/i.test(language);
};

export const usePreferredLanguage = () => {
  const languages = useLanguagePreferences();
  const language = useMemo(
    () =>
      languages.find(
        (language) =>
          isJapaneseLanguage(language) || isEnglishLanguage(language),
      ),
    [languages],
  );

  return (language ?? 'en').toLowerCase();
};

export type I18nHackProps = {
  ja: React.ReactNode;
  en: React.ReactNode;
};
export const I18nHack = ({ ja, en }: I18nHackProps) => {
  const language = usePreferredLanguage();

  if (isJapaneseLanguage(language)) {
    return <>{ja}</>;
  }

  return <>{en}</>;
};
