import React from 'react';
import { render } from '@testing-library/react';
import { Commit } from './Commit';
import MockDate from 'mockdate';

describe('Commit', () => {
  beforeAll(() => MockDate.set('2021-03-02'));
  afterAll(() => MockDate.reset());

  it('should show commit information as 7 character SHA', () => {
    const { getByText } = render(
      <Commit
        timestamp="2021-03-01T12:53:39.000Z"
        commit="1b249a77c647b553a80cf5ffd022a45df8c38cef"
      />,
    );
    expect(getByText('1b249a7')).not.toBeNull();
  });

  it('should show commit date converted to relative time', () => {
    const { getByText } = render(
      <Commit
        timestamp="2021-03-01T12:53:39.000Z"
        commit="1b249a77c647b553a80cf5ffd022a45df8c38cef"
      />,
    );
    expect(getByText('(11 hours ago)')).not.toBeNull();
  });
});
