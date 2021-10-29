import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';
import { ProductSearchInput } from './product-search-input';
import { action } from '@storybook/addon-actions';
import { SearchSessionProvider } from '../search-session-provider';

const commonProps = {
  onInput: action('onInput'),
  onOpen: action('onOpen'),
  expandedPlaceholder: 'expanded placeholder',
  collapsedPlaceholder: 'collapsed placeholder',
  forwardRef: null,
  debounceTime: 0,
  value: '',
  isLoading: false,
  onNavigate: action('Enter pressed onNavigate'),
  actionSubjectId: 'Product search is done in',
  advancedSearchURL: '/advaced/search',
};

export const Expanded = () => (
  <ProductSearchInput {...commonProps} isExpanded />
);

export const Collapsed = () => (
  <ProductSearchInput {...commonProps} isExpanded={false} />
);

export const Interactive = () => {
  const [isExpanded, setExpanded] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setExpanded(!isExpanded)}>
        {isExpanded ? 'Collapse' : 'Expand'}
      </button>
      <p style={{ borderTop: '1px solid black', margin: '5px' }} />
      <ProductSearchInput
        {...commonProps}
        isExpanded={isExpanded}
        onInput={() => !isExpanded && setExpanded(true)}
      />
    </>
  );
};

export default {
  title: 'Common Components/Product Search Input',
  decorators: [
    (story: () => React.ElementType) => (
      <SearchSessionProvider sessionKey="story">
        <IntlProvider locale="en">{story()}</IntlProvider>
      </SearchSessionProvider>
    ),
  ],
};
