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

export interface ProductInputSearchSkeletonFeatures {
  interactiveSkeleton?: {
    enabled: boolean;
    advancedSearchUrl: string;
    placeholder: string;
  };
}

export interface Props {
  theme?: SearchCSS;
  features?: ProductInputSearchSkeletonFeatures;
}

export const ProductSearchInputSkeleton = ({
  theme,
  ...rest
}: Props & ProductInputSearchSkeletonFeatures) => {
  if (theme) {
    return (
      <ThemeProvider partialSearchCSS={theme}>
        <SearchInputSkeleton {...rest} />
      </ThemeProvider>
    );
  } else {
    return <SearchInputSkeleton {...rest} />;
  }
};
