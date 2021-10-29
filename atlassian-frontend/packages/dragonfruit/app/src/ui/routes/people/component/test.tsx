import React from 'react';

import { render } from '@testing-library/react';

import { UI_TEAM_LIST_PAGE } from '@atlassian/dragonfruit-feature-flags';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import Component from './main';

describe('people page', () => {
  it('should render the team list page when the FF is enabled', () => {
    const flags = {
      [UI_TEAM_LIST_PAGE]: true,
    };

    const { queryByTestId } = render(
      <CompassTestProvider flags={flags} locale="en">
        <Component />
      </CompassTestProvider>,
    );

    const el = queryByTestId('page-team-list');

    expect(el).toBeInTheDocument();
  });

  it('should render placeholder content when the FF is disabled', () => {
    const flags = {
      [UI_TEAM_LIST_PAGE]: false,
    };

    const { queryByText } = render(
      <CompassTestProvider flags={flags} locale="en">
        <Component />
      </CompassTestProvider>,
    );

    const el = queryByText('People page');

    expect(el).toBeInTheDocument();
  });
});
