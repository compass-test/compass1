import React from 'react';

import { render } from '@testing-library/react';

import { AvatarItem } from './index';

describe('AvatarItem', () => {
  const nameMock = 'Homer Simpson';

  it('should render a div as a container element', () => {
    const { getByTestId } = render(<AvatarItem color="red" name={nameMock} />);
    const badge = getByTestId('presence-avatar-badge');
    expect(badge.tagName.toLowerCase()).toBe('div');
  });

  it('should render first letter of the name as content', () => {
    const { getByTestId } = render(<AvatarItem color="red" name={nameMock} />);
    const badge = getByTestId('presence-avatar-badge');
    expect(badge.innerText).toBe('H');
  });
});
