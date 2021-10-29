import React, { createRef, useState } from 'react';
import { IntlProvider } from 'react-intl';

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
  const [query, setQuery] = useState('');
  const ref = createRef<HTMLInputElement>();
  return (
    <>
      <SearchSessionProvider sessionKey={`ssid_provider_${isExpanded}`}>
        <ActiveProductSearchInputStateless
          isExpanded={isExpanded}
          isLoading={false}
          setIsExpanded={setIsExpanded}
          forwardRef={ref}
          activeProductId={activeProduct}
          query={query}
          setQuery={setQuery}
          onNavigateGeneric={(id: string, href: string, event) => {}}
        />
      </SearchSessionProvider>
    </>
  );
};

export const ProductSwitching = () => {
  const [activeProduct, setActiveProduct] = useState('jira');
  const [isExpanded, setIsExpanded] = useState(false);
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
          isLoading={false}
          setIsExpanded={setIsExpanded}
          forwardRef={ref}
          activeProductId={activeProduct}
          query={query}
          setQuery={setQuery}
          onNavigateGeneric={(id: string, href: string, event) => {}}
        />
      </SearchSessionProvider>
    </>
  );
};
