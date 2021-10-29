import React from 'react';
import { IntlProvider } from 'react-intl';
import NoPreQueryResults from './no-prequery-results';

export const Basic = () => <NoPreQueryResults />;

export default {
  title: 'Search Dialog/Search No Pre Query Results',
  decorators: [
    (story: () => React.ElementType) => (
      <IntlProvider locale="en">{story()}</IntlProvider>
    ),
  ],
};
