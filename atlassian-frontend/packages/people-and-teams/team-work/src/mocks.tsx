import React, { FC } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import fetchMock from 'fetch-mock/cjs/client';
import { IntlProvider } from 'react-intl';

import { urlJiraSearch } from './services/team-work/utils';

export const AppWrapper: FC<{ mocks: unknown }> = ({ mocks, children }) => {
  const response =
    mocks instanceof Error ? Promise.reject(mocks) : Promise.resolve(mocks);

  fetchMock.mock(new RegExp(urlJiraSearch()), response);

  return <IntlProvider locale="en">{children}</IntlProvider>;
};
