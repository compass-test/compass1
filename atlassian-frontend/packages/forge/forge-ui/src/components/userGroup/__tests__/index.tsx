import React, { Suspense } from 'react';
import { temporarilySilenceActAndAtlaskitDeprecationWarnings } from '@atlassian/aux-test-utils';
import { render } from '@testing-library/react';
import { createMockClient } from 'mock-apollo-client';
import { usersQuery } from '../../../web-client/hooks/useUser';
import { mockUser } from '../../../storybook-utils';
import UserGroup, { usersToAKAGData } from '..';

temporarilySilenceActAndAtlaskitDeprecationWarnings();

const USERS = [mockUser('123', 'Alice'), mockUser('456', 'Bob')];
const USERS_IDS = USERS.map((x) => x.accountId);

describe('UserGroup component', () => {
  const mockClient = createMockClient();
  mockClient.setRequestHandler(usersQuery, async () => {
    return {
      data: {
        users: USERS,
      },
    };
  });

  it('will populate avatars when supplied multiple accountIds', async () => {
    const { findByLabelText } = render(
      <Suspense fallback="loading">
        <UserGroup accountIds={USERS_IDS} client={mockClient} />
      </Suspense>,
    );

    for (const user of USERS) {
      expect(await findByLabelText(user.name)).toBeTruthy();
    }

    expect(await findByLabelText('Alice')).toBeTruthy();
    expect(await findByLabelText('Bob')).toBeTruthy();
  });

  it('will display empty object when called with an unknown accountId', async () => {
    const { findByLabelText } = render(
      <Suspense fallback="loading">
        <UserGroup
          accountIds={[USERS_IDS[0], 'unknown-user', USERS_IDS[1]]}
          client={mockClient}
        />
      </Suspense>,
    );

    expect(await findByLabelText('Unknown User')).toBeTruthy();
    for (const user of USERS) {
      expect(await findByLabelText(user.name)).toBeTruthy();
    }
  });

  it('will display overflow component when many ids are supplied', async () => {
    const { findByText } = render(
      <Suspense fallback="loading">
        <UserGroup
          accountIds={['1', '2', '3', '4', '5', '6', '7', '8', '9']}
          client={mockClient}
        />
      </Suspense>,
    );

    expect(await findByText('+5')).toBeTruthy();
  });
});

describe('usersToAKAGData', () => {
  it('will order users the same as the accountId array', async () => {
    const users = {
      '123': mockUser('123'),
      '789': mockUser('789'),
    };

    const avatarUserData = usersToAKAGData(users, ['123', '456', '789']);
    expect(avatarUserData).toEqual([
      { key: '123', name: users['123'].name, src: users['123'].picture },
      { key: '456', name: 'Unknown User', src: '' },
      { key: '789', name: users['789'].name, src: users['789'].picture },
    ]);
  });

  it('will return unknown users for no user data', async () => {
    const avatarUserData = usersToAKAGData({}, ['123', '456', '789']);

    expect(avatarUserData).toEqual([
      { key: '123', name: 'Unknown User', src: '' },
      { key: '456', name: 'Unknown User', src: '' },
      { key: '789', name: 'Unknown User', src: '' },
    ]);
  });
});
