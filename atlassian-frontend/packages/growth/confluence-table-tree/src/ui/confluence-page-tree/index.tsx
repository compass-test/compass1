import React, { FunctionComponent } from 'react';

import PageTreeWithoutHeading from '../page-tree';
import PageTreeForEmbeddedPages from '../page-tree-for-embedded-pages';
import { TranslationsProvider, DEFAULT_LOCALE } from '../translations-provider';
import { ConfluencePageTreeProps } from './types';
export type { ConfluencePageTreeProps } from './types';

export const ConfluencePageTreeWithoutHeading: FunctionComponent<ConfluencePageTreeProps> = ({
  locale = DEFAULT_LOCALE,
  isEmbeddedPagesExperiment,
  ...props
}) => {
  return (
    <TranslationsProvider locale={locale}>
      {isEmbeddedPagesExperiment ? (
        <PageTreeForEmbeddedPages {...props} />
      ) : (
        <PageTreeWithoutHeading {...props} />
      )}
    </TranslationsProvider>
  );
};
