import React from 'react';

import { render } from '@testing-library/react';

import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import TeamDescription from './main';

describe('<TeamDescription />', () => {
  describe('when no description is found for a team', () => {
    it('should render text inviting user to add a description on the teams page', () => {
      let emptyText: HTMLElement | null;

      const { getByTestId, getByText } = render(
        <CompassTestProvider>
          <TeamDescription
            testId="description-test"
            teamId="ari:cloud:teams::team/mock-team-id"
          />
        </CompassTestProvider>,
      );
      emptyText = getByTestId('description-test.empty');

      expect(emptyText).toBeInTheDocument();
      expect(getByText('Atlassian team page')).toBeInTheDocument();
    });
  });

  describe('when a description is present for a team', () => {
    it('should render description', () => {
      let descriptionText: HTMLElement | null;

      const { getByTestId, getByText } = render(
        <CompassTestProvider>
          <TeamDescription
            description="test description"
            testId="description-test"
            teamId="ari:cloud:teams::team/mock-team-id"
          />
        </CompassTestProvider>,
      );
      descriptionText = getByTestId('description-test.text');
      expect(descriptionText).toBeInTheDocument();
      expect(getByText('test description')).toBeInTheDocument();
    });
  });
});
