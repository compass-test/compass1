import React from 'react';
import { InjectedIntl, InjectedIntlProps, injectIntl } from 'react-intl';
import { useDefaultSuppliers } from '../..';

import { messages } from '../../../messages';
import { PermissionSupplier, SearchDialogProduct } from '../../product-router';
import {
  CacheWarmingProps,
  CustomizedRendererChildFn,
  ResultProviderProps,
  ResultSuppliers,
  ScreenSpecificProps,
  SearchDialogProductProps,
} from '../../product-router/product';
import { SearchResult } from '../../product-router/product/result-types';
import {
  AggregatorAvocadoResponse,
  AvocadoQuestionResponse,
  AvocadoScope,
} from './types';

const AVOCADO_PRODUCT_ID = 'avocado';

const mapAggregatorResponseToSearchItem = (
  response: AvocadoQuestionResponse,
): SearchResult => {
  return {
    title: response.title,
    id: response.id,
    meta: '',
    url: response.url,
    iconUrl: response.iconUrl,
    containerId: '', // no container
  };
};

export const AvocadoTabWithIntl: React.FC<
  InjectedIntlProps & {
    permissionSupplier?: PermissionSupplier;
  } & Omit<ResultProviderProps, 'id'> &
    Pick<SearchDialogProductProps, 'order' | 'permissionSupplier'> &
    Partial<ResultSuppliers> &
    CustomizedRendererChildFn &
    CacheWarmingProps &
    Omit<ScreenSpecificProps, 'urlGeneratorForNoResultsScreen'>
> = ({
  intl,
  preQueryItemSupplier: overriddenPreQuerySupplier,
  postQueryItemSupplier: overridenPostQuerySupplier,
  ...rest
}) => {
  const questionsSectionTitle = intl.formatMessage(
    messages.avocado_questions_heading,
  );
  const answersSectionTitle = intl.formatMessage(
    messages.avocado_answers_heading,
  );

  const sections = [
    {
      id: AvocadoScope.AvocadoQuestion,
      title: questionsSectionTitle,
      scope: AvocadoScope.AvocadoQuestion,
      resultMapper: ({ results }: AggregatorAvocadoResponse): SearchResult[] =>
        results.map((value) => mapAggregatorResponseToSearchItem(value)),
    },
    {
      id: AvocadoScope.AvocadoAnswer,
      title: answersSectionTitle,
      scope: AvocadoScope.AvocadoAnswer,
      resultMapper: ({ results }: AggregatorAvocadoResponse): SearchResult[] =>
        results.map((value) => mapAggregatorResponseToSearchItem(value)),
    },
  ];

  const { preQueryItemSupplier, postQueryItemSupplier } = useDefaultSuppliers<
    AggregatorAvocadoResponse,
    AvocadoScope
  >(AVOCADO_PRODUCT_ID, sections);

  const preQuerySectionTitleGenerator = (
    sectionTitle: string,
    intl: InjectedIntl,
  ) => {
    return sectionTitle === questionsSectionTitle
      ? intl.formatMessage(messages.avocado_recent_questions)
      : intl.formatMessage(messages.avocado_recent_answers);
  };

  return (
    <SearchDialogProduct
      {...rest}
      urlGeneratorForNoResultsScreen={(query: string = '') => ''}
      preQueryItemSupplier={overriddenPreQuerySupplier || preQueryItemSupplier}
      postQueryItemSupplier={
        overridenPostQuerySupplier || postQueryItemSupplier
      }
      id={AVOCADO_PRODUCT_ID}
      title={intl.formatMessage(messages.avocado_tab_label)}
      sections={sections}
      preQuerySectionTitleGenerator={preQuerySectionTitleGenerator}
    />
  );
};

export const AvocadoTab = injectIntl(AvocadoTabWithIntl);
