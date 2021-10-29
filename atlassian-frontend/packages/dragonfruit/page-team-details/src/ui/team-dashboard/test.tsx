import React from 'react';

import { screen } from '@testing-library/dom';
import { act, render, RenderResult } from '@testing-library/react';

import { MockCompassRecentsProvider } from '@atlassian/compass-search-cache';
import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { TeamDashboard } from './main';

describe('TeamDashboard', () => {
  let result: RenderResult;

  const teamId = 'def456';

  beforeEach(() => {
    result = render(
      <ApolloAutoMockProvider>
        <CompassTestProvider>
          <MockCompassRecentsProvider>
            <TeamDashboard teamId={teamId} />
          </MockCompassRecentsProvider>
        </CompassTestProvider>
      </ApolloAutoMockProvider>,
    );
  });

  it('should open a new tab to the team site page', () => {
    const editTeamProfileButton = result.getByTestId(
      'dragonfruit-page-team-details.ui.content.edit-profile-button',
    );

    expect(editTeamProfileButton).not.toBeNull();

    delete window.open;
    window.open = jest.fn();
    editTeamProfileButton.click();
    expect(window.open).toHaveBeenCalledWith(
      `${window.location.origin}/people/team/${teamId}?ref=compass&src=teamDashboard&returnTo=compass`,
      '_blank',
      'noopener,noreferrer',
    );
  });

  it('should render the success flag when the owner Ari is copied', async () => {
    const dropdownButton = result.getByTestId(
      'dragonfruit-page-team-details.ui.dropdown-menu--trigger',
    );

    expect(dropdownButton).not.toBeNull();
    dropdownButton.click();

    const copyId = result.getByTestId(
      'dragonfruit-page-team-details.ui.dropdown-menu-item.copy-owner-ari',
    );
    expect(copyId).not.toBeNull();

    Object.assign(navigator, {
      clipboard: {
        writeText: () => {},
      },
    });

    jest.spyOn(navigator.clipboard, 'writeText').mockResolvedValue();

    act(() => {
      copyId.click();
    });

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      'ari:cloud:teams::team/def456',
    );
    await screen.findByText('ID copied!');
  });

  it('should open the component picker modal when add component clicked', async () => {
    const dropdownButton = result.getByTestId(
      'dragonfruit-page-team-details.ui.dropdown-menu--trigger',
    );

    expect(dropdownButton).not.toBeNull();
    dropdownButton.click();

    const addOwnerItem = result.getByTestId(
      'dragonfruit-page-team-details.ui.dropdown-menu-item.add-component',
    );
    expect(addOwnerItem).not.toBeNull();

    act(() => {
      addOwnerItem.click();
    });

    await screen.findByTestId('dragonfruit-team-component-picker-modal');
  });
});
