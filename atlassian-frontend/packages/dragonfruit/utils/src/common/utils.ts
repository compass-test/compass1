import { ThemeProps, ThemeTokens } from '@atlaskit/button/types';

type ButtonTheme = (
  current: (props: ThemeProps) => ThemeTokens,
  props: ThemeProps,
) => ThemeTokens;

// TODO newTheme as Type T
// type T = {
//   [string]: { [string]: string | number, ... } | T,
//   ...
// };

type T = any;

const extract = (
  newTheme: T,
  themeProps: ThemeProps,
): Partial<ThemeTokens> | void => {
  const { appearance, mode, state } = themeProps;

  if (!appearance || !newTheme[appearance]) {
    return undefined;
  }

  const root = newTheme[appearance];

  return Object.keys(root).reduce((acc, val) => {
    let node = root;
    [val, state, mode].forEach((item) => {
      // @ts-ignore
      if (!node[item] && node[item] !== 0) {
        return;
      }
      // @ts-ignore
      if (typeof node[item] !== 'object') {
        // @ts-ignore
        acc[val] = node[item];
        return;
      }
      // @ts-ignore
      node = node[item];
    });
    return acc;
  }, {});
};

export const getTheme = (overrides?: Partial<ThemeTokens>): ButtonTheme => {
  return (
    currentTheme: (props: ThemeProps) => ThemeTokens,
    themeProps: ThemeProps,
  ): ThemeTokens => {
    const theme: ThemeTokens = currentTheme(themeProps);
    const styles = Object.entries(theme).reduce((acc, [key, value]) => {
      // @ts-ignore
      if (!overrides?.[key]) {
        // @ts-ignore
        acc[key] = value;
        return acc;
      }

      // @ts-ignore
      const overriddenStyles = extract(overrides[key], themeProps);

      // @ts-ignore
      acc[key] = {
        ...value,
        ...overriddenStyles,
      };

      return acc;
    }, {});

    // @ts-ignore
    return styles;
  };
};
