import React from 'react';

import { render } from '@testing-library/react';

import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { SplitTeamsButton } from './index';

describe('ComponentOwnerEmptyState', () => {
  const dropdownButtonProps = {
    isSelected: false,
    onClick: () => {},
    onMouseEnter: () => {},
  };

  const linkButtonProps = {
    isSelected: false,
    onClick: () => {},
  };

  const triggerProps = {
    ref: null,
    'aria-expanded': false,
    'aria-haspopup': false,
  };

  it('dropdown and link buttons can be found by test-id', async () => {
    const { getByTestId } = render(
      <CompassTestProvider locale="en">
        <SplitTeamsButton
          dropdownButtonProps={dropdownButtonProps}
          linkButtonProps={linkButtonProps}
          triggerProps={triggerProps}
        />
      </CompassTestProvider>,
    );
    expect(getByTestId('dragonfruit.team.link-button')).toBeInTheDocument();
    expect(getByTestId('dragonfruit.team.dropdown-button')).toBeInTheDocument();
  });
});
