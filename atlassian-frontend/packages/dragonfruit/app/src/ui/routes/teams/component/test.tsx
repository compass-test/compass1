import React from 'react';

import { render } from '@testing-library/react';

import { UI_TEAMS_LIST_PAGE } from '@atlassian/dragonfruit-feature-flags';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import Component from './main';

describe('teams list page', () => {
  it('should render the teams list page when the FF is enabled', () => {
    const flags = {
      [UI_TEAMS_LIST_PAGE]: true,
    };

    const { queryByTestId } = render(
      <CompassTestProvider flags={flags} locale="en">
        <Component />
      </CompassTestProvider>,
    );

    const el = queryByTestId('page-teams-list');

    expect(el).toBeInTheDocument();
  });

  it('should render placeholder content when the FF is disabled', () => {
    const flags = {
      [UI_TEAMS_LIST_PAGE]: false,
    };

    const { queryByTestId } = render(
      <CompassTestProvider flags={flags} locale="en">
        <Component />
      </CompassTestProvider>,
    );

    const el = queryByTestId('page-teams-list');

    expect(el).not.toBeInTheDocument();
  });
});
