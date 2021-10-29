import React from 'react';

import { render } from '@testing-library/react';

import type { Actor } from './types';

import AvatarContainer from './index';

describe.skip('AvatarContainer', () => {
  test('renders an empty avatar if no actors are supplied', () => {
    const actors: Actor[] = [];
    const { container } = render(<AvatarContainer actors={actors} />);
    expect(container).toMatchSnapshot();
  });
  test('renders if first actor exists', () => {
    const actors: Actor[] = [
      {
        displayName: 'Person',
        ari: 'ASDFADSF/ASDFASDF',
        avatarUrl: 'http://gotoavatar.com/avatar.jpg',
      },
      {
        displayName: 'Person',
        ari: 'ASDFADSF/ASDFASDF',
        avatarUrl: 'http://gotoavatar.com/avatar.jpg',
      },
    ];
    const { container } = render(<AvatarContainer actors={actors} />);
    expect(container).toMatchSnapshot();
  });
  test('renders if first actor exists even when there is no ARI', () => {
    const actors: Actor[] = [
      {
        displayName: 'Person',
        avatarUrl: 'http://gotoavatar.com/avatar.jpg',
      },
      {
        displayName: 'Person',
        ari: 'ASDFADSF/ASDFASDF',
        avatarUrl: 'http://gotoavatar.com/avatar.jpg',
      },
    ];
    const { container } = render(<AvatarContainer actors={actors} />);
    expect(container).toMatchSnapshot();
  });
});
