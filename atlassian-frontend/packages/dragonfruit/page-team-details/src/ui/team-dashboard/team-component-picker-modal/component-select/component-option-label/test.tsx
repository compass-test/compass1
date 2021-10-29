import React from 'react';

import { render } from '@testing-library/react';

import { CompassComponentType } from '@atlassian/dragonfruit-graphql';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { ComponentOptionLabel } from './main';

describe('ComponentOptionLabel', () => {
  it('should display a component label when a label is provided', () => {
    const { queryByText } = render(
      <CompassTestProvider>
        <ComponentOptionLabel
          option={{
            label: 'The Best Component',
            type: CompassComponentType.SERVICE,
            isManaged: false,
            teamName: 'Cool Team of Cool Kids',
            teamAvatarUrl: '',
          }}
          isOwnerTeamLoaded={true}
        />
      </CompassTestProvider>,
    );

    const el = queryByText('The Best Component');

    expect(el).toBeInTheDocument();
  });

  it('should display a team label when a team name is provided', () => {
    const { queryByText } = render(
      <CompassTestProvider>
        <ComponentOptionLabel
          option={{
            label: 'The Best Component',
            type: CompassComponentType.SERVICE,
            isManaged: false,
            teamName: 'Cool Team of Cool Kids',
            teamAvatarUrl: '',
          }}
          isOwnerTeamLoaded={true}
        />
      </CompassTestProvider>,
    );

    const el = queryByText('Cool Team of Cool Kids');

    expect(el).toBeInTheDocument();
  });

  it('should display a no owner indicator when no team name is provided', () => {
    let { queryByText } = render(
      <CompassTestProvider>
        <ComponentOptionLabel
          option={{
            label: 'The Best Component',
            type: CompassComponentType.SERVICE,
            isManaged: false,
          }}
          isOwnerTeamLoaded={true}
        />
      </CompassTestProvider>,
    );

    let el = queryByText('No owner');

    expect(el).toBeInTheDocument();
  });

  it('should display a no owner indicator when an empty team name is provided', () => {
    const { queryByText } = render(
      <CompassTestProvider>
        <ComponentOptionLabel
          option={{
            label: 'The Best Component',
            type: CompassComponentType.SERVICE,
            isManaged: false,
            teamName: '',
          }}
          isOwnerTeamLoaded={true}
        />
      </CompassTestProvider>,
    );

    const el = queryByText('No owner');

    expect(el).toBeInTheDocument();
  });

  it('should display a no owner indicator when a `null` team name is provided', () => {
    const { queryByText } = render(
      <CompassTestProvider>
        <ComponentOptionLabel
          option={{
            label: 'The Best Component',
            type: CompassComponentType.SERVICE,
            isManaged: false,
            teamName: null,
          }}
          isOwnerTeamLoaded={true}
        />
      </CompassTestProvider>,
    );

    const el = queryByText('No owner');

    expect(el).toBeInTheDocument();
  });

  it('should display a managed externally indicator when the managed flag is true', () => {
    let { queryByText } = render(
      <CompassTestProvider>
        <ComponentOptionLabel
          option={{
            label: 'The Best Component',
            type: CompassComponentType.SERVICE,
            isManaged: false,
          }}
          isOwnerTeamLoaded={true}
        />
      </CompassTestProvider>,
    );

    let el = queryByText('Managed externally');

    expect(el).toBeNull();

    ({ queryByText } = render(
      <CompassTestProvider>
        <ComponentOptionLabel
          option={{
            label: 'The Best Component',
            type: CompassComponentType.SERVICE,
            isManaged: true,
          }}
          isOwnerTeamLoaded={true}
        />
      </CompassTestProvider>,
    ));

    el = queryByText('Managed externally');
  });

  it('should display a placeholder component if the isOwnerTeamLoaded flag is false', () => {
    let { queryByTestId } = render(
      <CompassTestProvider>
        <ComponentOptionLabel
          option={{
            label: 'The Best Component',
            type: CompassComponentType.SERVICE,
            isManaged: false,
          }}
          isOwnerTeamLoaded={true}
        />
      </CompassTestProvider>,
    );

    let el = queryByTestId('team-component-picker-modal-option-placeholder');

    expect(el).toBeNull();

    ({ queryByTestId } = render(
      <CompassTestProvider>
        <ComponentOptionLabel
          option={{
            label: 'The Best Component',
            type: CompassComponentType.SERVICE,
            isManaged: false,
          }}
          isOwnerTeamLoaded={false}
        />
      </CompassTestProvider>,
    ));

    el = queryByTestId('team-component-picker-modal-option-placeholder');
  });
});
