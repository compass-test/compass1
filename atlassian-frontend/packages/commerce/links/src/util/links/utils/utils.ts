export const DEFAULT_LANGUAGE = 'en' as const;

type DefaultType = typeof DEFAULT_LANGUAGE;

export const toAvailableLanguage = <T extends Record<string, any>>(
  language: string,
  links: T,
): keyof T | DefaultType => {
  const codes = Object.keys(links);

  return (
    codes.find((s) => s === language) ||
    codes.find((s) => s.substr(0, 2) === language.substr(0, 2)) ||
    DEFAULT_LANGUAGE
  );
};
