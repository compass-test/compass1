import React from 'react';

import { render } from '@testing-library/react';

import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import ComingSoonList from './main';

describe('ComingSoonList', () => {
  test('smoke test', async () => {
    const wrapper = render(
      <CompassTestProvider>
        <ApolloAutoMockProvider>
          <ComingSoonList />
        </ApolloAutoMockProvider>
      </CompassTestProvider>,
    );
    const comingSoonTitles = ['Gitub', 'Gitlab', 'Observability Tools'];
    comingSoonTitles.forEach(async (title) => {
      expect(await wrapper.findByText(title)).toBeInTheDocument();
    });
  });
});
