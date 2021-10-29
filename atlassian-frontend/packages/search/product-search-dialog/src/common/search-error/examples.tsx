import React from 'react';
import { IntlProvider } from 'react-intl';
import SearchError from './search-error';
import { action } from '@storybook/addon-actions';

export const Basic = () => <SearchError onRetry={action('retrying search')} />;

export default {
  title: 'Confluence Search Dialog/Confluence Search Error',
  decorators: [
    (story: () => React.ElementType) => (
      <IntlProvider locale="en">{story()}</IntlProvider>
    ),
  ],
};
