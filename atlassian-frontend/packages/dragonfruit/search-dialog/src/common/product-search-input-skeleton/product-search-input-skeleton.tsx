/*
 * Minimalistic version of the search dialog, that provides a ready-only view
 * to be used as a loading component in async components and SSR.
 */
import { SearchCSS } from '@atlaskit/atlassian-navigation';
import {
  SearchInputSkeleton,
  ThemeProvider,
} from '@atlassian/search-dialog/skeleton';
import React from 'react';

export interface Props {
  theme?: SearchCSS;
}

export const ProductSearchInputSkeleton = ({ theme }: Props) => {
  if (theme) {
    return (
      <ThemeProvider partialSearchCSS={theme}>
        <SearchInputSkeleton />
      </ThemeProvider>
    );
  } else {
    return <SearchInputSkeleton />;
  }
};
