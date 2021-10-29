import React, { createRef, useCallback, useState } from 'react';
import { IntlProvider } from 'react-intl';

import { onNavigate } from '../../../examples/storybook-utils/common-components';
import { ProductSearchInput } from '../../common/product-search-input';
import { SearchSessionProvider } from '../../common/search-session-provider';

import { ActiveProductSearchInputStateless } from './active-product-search-input';

export default {
  title: 'Extensible/Product Search Input',
  decorators: [
    (story: () => React.ElementType) => (
      <IntlProvider locale="en">{story()}</IntlProvider>
    ),
  ],
};

export const Stateless = () => {
  const activeProduct = 'jira';
  const [isExpanded, setIsExpanded] = useState(false);
  const onOpen = useCallback(() => setIsExpanded(true), [setIsExpanded]);
  const [query, setQuery] = useState('');
  const ref = createRef<HTMLInputElement>();
  return (
    <>
      <SearchSessionProvider sessionKey={`ssid_provider_${isExpanded}`}>
        <ActiveProductSearchInputStateless
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
          forwardRef={ref}
          activeProductId={activeProduct}
          query={query}
          setQuery={setQuery}
        >
          {({
            activeProductId,
            query: value,
            setQuery: setValue,
            forwardRef,
          }) => {
            const commonProps = {
              onInput: setValue,
              isLoading: false,
              debounceTime: 250,
              onNavigate,
              forwardRef,
              value,
              isExpanded,
              onOpen,
            };

            return (
              <ProductSearchInput
                {...commonProps}
                advancedSearchURL={'advanced/search/url'}
                actionSubjectId={'confluence'}
                expandedPlaceholder={'Search Connie'}
                collapsedPlaceholder={'Confluence'}
              />
            );
          }}
        </ActiveProductSearchInputStateless>
      </SearchSessionProvider>
    </>
  );
};

export const ProductSwitching = () => {
  const [activeProduct, setActiveProduct] = useState('jira');
  const [isExpanded, setIsExpanded] = useState(false);
  const onOpen = useCallback(() => setIsExpanded(true), [setIsExpanded]);
  const [query, setQuery] = useState('');
  const ref = createRef<HTMLInputElement>();
  return (
    <>
      <div>
        <label>
          <input
            type="radio"
            value="jira"
            checked={activeProduct === 'jira'}
            onClick={() => setActiveProduct('jira')}
          />
          Jira
        </label>
        <label>
          <input
            type="radio"
            value="confluence"
            checked={activeProduct === 'confluence'}
            onClick={() => setActiveProduct('confluence')}
          />
          Confluence
        </label>
        <label>
          <input
            type="radio"
            value="dynamic"
            checked={activeProduct === 'dynamic'}
            onClick={() => setActiveProduct('dynamic')}
          />
          Dynamic
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={isExpanded}
            onClick={() => setIsExpanded(!isExpanded)}
          />
          isExpanded
        </label>
      </div>
      <SearchSessionProvider sessionKey={`ssid_provider_${isExpanded}`}>
        <ActiveProductSearchInputStateless
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
          forwardRef={ref}
          activeProductId={activeProduct}
          query={query}
          setQuery={setQuery}
        >
          {({
            activeProductId,
            query: value,
            setQuery: setValue,
            forwardRef,
          }) => {
            const commonProps = {
              onInput: setValue,
              isLoading: false,
              debounceTime: 250,
              onNavigate,
              forwardRef,
              value,
              isExpanded,
              onOpen,
            };

            switch (activeProductId) {
              case 'confluence':
                return (
                  <ProductSearchInput
                    {...commonProps}
                    advancedSearchURL={'advanced/search/url'}
                    actionSubjectId={'confluence'}
                    expandedPlaceholder={'Search Connie'}
                    collapsedPlaceholder={'Confluence'}
                  />
                );
              case 'jira':
                return (
                  <ProductSearchInput
                    {...commonProps}
                    advancedSearchURL={'advanced/search/url'}
                    actionSubjectId={'jira'}
                    expandedPlaceholder={'Search Jira'}
                    collapsedPlaceholder={'Jira'}
                  />
                );
              default:
                return (
                  <ProductSearchInput
                    {...commonProps}
                    advancedSearchURL={'advanced/search/url'}
                    actionSubjectId={'generic-product'}
                    expandedPlaceholder={'Search in the dynamic product'}
                    collapsedPlaceholder={'Search'}
                  />
                );
            }
          }}
        </ActiveProductSearchInputStateless>
      </SearchSessionProvider>
    </>
  );
};
