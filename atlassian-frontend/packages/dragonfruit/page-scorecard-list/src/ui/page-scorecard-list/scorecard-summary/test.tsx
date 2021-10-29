import React from 'react';

import { fireEvent, render } from '@testing-library/react';
import faker from 'faker';

import { UI_SCORECARD_DETAILS_PAGE } from '@atlassian/dragonfruit-feature-flags';
import {
  AccountStatus,
  CompassComponentType,
  CompassScorecard,
  CompassScorecardImportance,
  fake,
} from '@atlassian/dragonfruit-graphql';
import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import ScorecardSummary from './index';

const FakeCompassScorecard = fake<CompassScorecard>({
  owner: {
    accountId: '1234',
    accountStatus: AccountStatus.ACTIVE,
    name: 'test',
    picture: null,
  },
  id:
    'ari:cloud:compass:2376f937-d647-4506-9ac8-b3e1bf664575:scorecard/2fdd88e4-4414-4a89-be5c-129b66b85fee/fake-scorecard-id',
  name: faker.random.words(2),
  description: faker.lorem.paragraph(),
  criterias: [],
  componentType: CompassComponentType.APPLICATION,
  importance: CompassScorecardImportance.RECOMMENDED,
  changeMetadata: {},
});

describe('ScorecardSummary', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  let summaryCard: HTMLElement;
  let editButton: HTMLElement;
  let ownerLink: HTMLElement;
  let removeButton: HTMLElement;
  let viewComponentsButton: HTMLElement;

  const onEdit = jest.fn();
  const onDelete = jest.fn();

  let component = (
    importance: CompassScorecardImportance,
    isAdmin: boolean,
  ) => {
    return render(
      <CompassTestProvider>
        <ApolloAutoMockProvider>
          <ScorecardSummary
            scorecard={FakeCompassScorecard({ importance }) as CompassScorecard}
            isAdmin={isAdmin}
            onEdit={onEdit}
            onDelete={onDelete}
            loading={false}
          />
        </ApolloAutoMockProvider>
      </CompassTestProvider>,
    );
  };

  describe('when finished loading', () => {
    beforeEach(async () => {
      const { getByTestId } = component(
        CompassScorecardImportance.RECOMMENDED,
        false,
      );

      summaryCard = getByTestId(
        'page-scorecard-templates.ui.scorecard-summary.summary-card.ari:cloud:compass:2376f937-d647-4506-9ac8-b3e1bf664575:scorecard/2fdd88e4-4414-4a89-be5c-129b66b85fee/fake-scorecard-id',
      );
      editButton = getByTestId(
        'page-scorecard-templates.ui.scorecard-summary.edit-button',
      );
      removeButton = getByTestId(
        'page-scorecard-templates.ui.scorecard-summary.remove-button',
      );
      ownerLink = getByTestId(
        'page-scorecard-templates.ui.scorecard-summary.owner-link',
      );
    });

    it('Should display card with scorecard info', () => {
      expect(summaryCard).toBeInTheDocument();
    });

    it('Should display link to owner profile', () => {
      expect(ownerLink).toBeInTheDocument();
      expect(ownerLink.getAttribute('href')).toContain(
        `/people/${
          (FakeCompassScorecard() as CompassScorecard).owner?.accountId
        }`,
      );
    });

    it('Clicking edit button should trigger editing action', () => {
      expect(editButton).toBeInTheDocument();
      fireEvent.click(editButton);
      expect(onEdit).toHaveBeenCalledTimes(1);
    });

    it('Clicking remove button should trigger delete action', () => {
      expect(removeButton).toBeInTheDocument();
      fireEvent.click(removeButton);
      expect(onDelete).toHaveBeenCalledTimes(1);
    });
  });

  describe('when importance is "REQUIRED"', () => {
    describe('when user is not an administrator', () => {
      beforeEach(async () => {
        const { getByTestId } = component(
          CompassScorecardImportance.REQUIRED,
          false,
        );

        editButton = getByTestId(
          'page-scorecard-templates.ui.scorecard-summary.edit-button',
        );

        removeButton = getByTestId(
          'page-scorecard-templates.ui.scorecard-summary.remove-button',
        );
      });

      it('edit button is disabled and clicking it does not trigger editing action', () => {
        expect(editButton).toBeInTheDocument();
        expect(editButton).toBeDisabled();
        fireEvent.click(editButton);
        expect(onEdit).toHaveBeenCalledTimes(0);
      });

      it('remove button is disabled and clicking it does not trigger delete action', () => {
        expect(removeButton).toBeInTheDocument();
        expect(editButton).toBeDisabled();
        fireEvent.click(removeButton);
        expect(onDelete).toHaveBeenCalledTimes(0);
      });
    });

    describe('when user is an administrator', () => {
      beforeEach(async () => {
        const { getByTestId } = component(
          CompassScorecardImportance.REQUIRED,
          true,
        );

        editButton = getByTestId(
          'page-scorecard-templates.ui.scorecard-summary.edit-button',
        );

        removeButton = getByTestId(
          'page-scorecard-templates.ui.scorecard-summary.remove-button',
        );
      });

      it('clicking edit button should trigger editing action', () => {
        expect(editButton).toBeInTheDocument();
        fireEvent.click(editButton);
        expect(onEdit).toHaveBeenCalledTimes(1);
      });

      it('clicking remove button should trigger delete action', () => {
        expect(removeButton).toBeInTheDocument();
        fireEvent.click(removeButton);
        expect(onDelete).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('scorecard details page feature flag disabled', () => {
    it('should not render the View components button', () => {
      const { queryByTestId } = component(
        CompassScorecardImportance.RECOMMENDED,
        false,
      );

      expect(
        queryByTestId(
          'page-scorecard-templates.ui.scorecard-summary.view-components-button',
        ),
      ).toBeNull();
    });
  });

  describe('scorecard details page feature flag enabled', () => {
    beforeEach(() => {
      const flags = {
        [UI_SCORECARD_DETAILS_PAGE]: true,
      };
      const { getByTestId } = render(
        <CompassTestProvider flags={flags}>
          <ApolloAutoMockProvider>
            <ScorecardSummary
              scorecard={FakeCompassScorecard() as CompassScorecard}
              isAdmin={false}
              onEdit={onEdit}
              onDelete={onDelete}
              loading={false}
            />
          </ApolloAutoMockProvider>
        </CompassTestProvider>,
      );

      viewComponentsButton = getByTestId(
        'page-scorecard-templates.ui.scorecard-summary.view-components-button',
      );
    });

    it('should render the View components button', () => {
      expect(viewComponentsButton).toBeInTheDocument();
    });

    it('should assert that the View components button will indeed route to the Scorecard Details page when clicked on', () => {
      expect(viewComponentsButton.getAttribute('href')).toBe(
        '/compass/scorecard/fake-scorecard-id',
      );
    });
  });
});
