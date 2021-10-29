import React from 'react';

import { render } from '@testing-library/react';

import {
  MigrationFieldSelectBasic,
  MigrationFieldSelectLoading,
} from './examples';

describe.skip('<FieldSelect />', () => {
  test('renders field select basic', () => {
    const { container } = render(<MigrationFieldSelectBasic />);

    expect(container.innerHTML).toMatchSnapshot();
  });

  test('renders field select loading', () => {
    const { container } = render(<MigrationFieldSelectLoading />);

    expect(container.innerHTML).toMatchSnapshot();
  });
});
