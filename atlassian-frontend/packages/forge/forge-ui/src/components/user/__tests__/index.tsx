import React, { Suspense } from 'react';
import { temporarilySilenceActAndAtlaskitDeprecationWarnings } from '@atlassian/aux-test-utils';
import { render } from '@testing-library/react';
import { createMockClient } from 'mock-apollo-client';
import { mockUser } from '../../../storybook-utils';
import User from '../';
import { userQuery } from '../../../web-client/hooks/useUser';
import { InlineContext } from '../../../context/inline';

temporarilySilenceActAndAtlaskitDeprecationWarnings();

describe('User component', () => {
  const mockClient = createMockClient();
  mockClient.setRequestHandler(userQuery, async () => {
    return {
      data: {
        user: mockUser('123', 'Ryan'),
      },
    };
  });

  test('will populate avatar when supplied an accountId', async () => {
    const { findByText } = render(
      <InlineContext.Provider value={{ inline: true }}>
        <Suspense fallback="loading">
          <User accountId="123" client={mockClient} />
        </Suspense>
      </InlineContext.Provider>,
    );

    expect(await findByText('Ryan')).toBeTruthy();
  });
});
