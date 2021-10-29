import React, { useContext, createContext } from 'react';
import merge from 'lodash/merge';
import { B100, B400, N0, N200, N40, N600, N900 } from '@atlaskit/theme/colors';
import { SearchCSS as AKSearchCSS } from '@atlaskit/atlassian-navigation';

// WARNING: don't use these, prefer import { SearchCSS } from '@atlaskit/atlassian-navigation';
export type SearchCSS = AKSearchCSS;
export type SearchTheme = AKSearchCSS;

const themes: Record<'default', SearchCSS> = {
  default: {
    default: {
      backgroundColor: N0,
      color: N200,
      borderColor: N40,
      iconColor: N600,
    },
    focus: {
      backgroundColor: N0,
      color: N900,
      borderColor: B100,
      iconColor: N900,
    },
    hover: {
      color: B400,
      iconColor: B400,
      borderColor: N40,
      backgroundColor: 'rgba(222, 235, 255, 0.9)',
    },
  },
};

type PartialSearchThemeDepthOf1 = {
  [K in keyof SearchCSS]?: Partial<SearchCSS[K]>;
};

const getTheme = (searchCSS?: PartialSearchThemeDepthOf1): SearchCSS => {
  if (!searchCSS) {
    return themes.default;
  }
  return merge({}, themes.default, searchCSS);
};

const ctx = createContext<SearchCSS>(themes.default);

export type ThemeProviderProps = {
  // todo - deprecate "value" (requires product update)
  value?: SearchCSS | SearchTheme;
  partialSearchCSS?: PartialSearchThemeDepthOf1;
};

const ThemeProvider = ({
  value,
  partialSearchCSS,
  children,
}: React.PropsWithChildren<ThemeProviderProps>) => {
  const theme = getTheme(partialSearchCSS || value);
  return <ctx.Provider value={theme}>{children}</ctx.Provider>;
};

const useTheme = () => {
  return useContext(ctx);
};

// todo - deprecate (requires product update)
// eslint-disable-next-line
const _ThemeContext = ctx;

// todo - deprecate (requires product update)
// eslint-disable-next-line
const _createSearchTheme = (suppliedTheme: SearchCSS): SearchCSS => {
  return suppliedTheme;
};

export {
  // private, used only by tests
  themes as _themes,
  ThemeProvider,
  useTheme,
  // deprecated
  _ThemeContext,
  // deprecated
  _createSearchTheme,
};
