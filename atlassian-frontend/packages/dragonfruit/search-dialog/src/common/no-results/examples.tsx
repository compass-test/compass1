import React from 'react';
import { IntlProvider } from 'react-intl';
import { action } from '@storybook/addon-actions';
import { LinkComponentProps } from '@atlassian/search-dialog';
import NoResults from './no-results';

const commonProps = {
  advancedSearchSelected: action('click on advanced search link'),
  advancedSearchUrl: '',
  hasFilters: false,
  clearFilters: action('clearing filters'),
};

export const Basic = () => <NoResults {...commonProps} />;

export const WithFilters = () => <NoResults {...commonProps} hasFilters />;

export const WithLinkComponent = () => (
  <NoResults
    {...commonProps}
    linkComponent={({
      href,
      isKeyboardHighlighted,
      ...rest
    }: LinkComponentProps) => (
      /* eslint-disable-next-line */
      <a
        {...rest}
        href={href}
        onClick={(e) => {
          e.preventDefault();
          action('link component clicked')(e);
        }}
      />
    )}
  />
);

export default {
  title: 'Search Dialog/Search No Results',
  decorators: [
    (story: () => React.ElementType) => (
      <IntlProvider locale="en">{story()}</IntlProvider>
    ),
  ],
};
