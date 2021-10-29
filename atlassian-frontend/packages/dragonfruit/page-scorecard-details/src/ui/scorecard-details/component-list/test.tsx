import React from 'react';

import { render, RenderResult, within } from '@testing-library/react';

import { CompassComponentType } from '@atlassian/dragonfruit-graphql';
import {
  ApolloAutoMockProvider,
  ApolloNetworkErrorProvider,
} from '@atlassian/dragonfruit-graphql/mocks';
import {
  MOCK_SCORECARD_APPLIEDTO_COMPONENTS_FIRST_PAGE,
  MOCK_SCORECARD_APPLIEDTO_COMPONENTS_LAST_PAGE,
} from '@atlassian/dragonfruit-scorecards';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { ComponentList } from './index';

describe('ComponentList', () => {
  let result: RenderResult;

  const testId = 'testing-component-list';
  const testIdPrefix = `${testId}.table--row-component-row`;
  describe('First page', () => {
    beforeEach(() => {
      result = render(
        <CompassTestProvider>
          <ApolloAutoMockProvider
            mocks={MOCK_SCORECARD_APPLIEDTO_COMPONENTS_FIRST_PAGE}
          >
            <ComponentList
              testId={testId}
              componentType={CompassComponentType.OTHER}
              scorecardARI={
                'ari:cloud:compass:2376f937-d647-4506-9ac8-b3e1bf664575:scorecard/2fdd88e4-4414-4a89-be5c-129b66b85fee/fake-scorecard-id'
              }
            />
          </ApolloAutoMockProvider>
        </CompassTestProvider>,
      );
    });

    test('Should display correct information for component', async () => {
      const componentRowOneTestId = `${testIdPrefix}.fake-component-foo`;
      const componentRowOne = await result.findByTestId(componentRowOneTestId);

      const { findByTestId } = within(componentRowOne);

      const componentRowOneNameCell = await findByTestId(
        `${testId}.table--cell-0`,
      );
      expect(componentRowOneNameCell).toBeInTheDocument();
      expect((componentRowOneNameCell as HTMLElement).innerText).toEqual(
        'Foo - Scorecard',
      );

      const componentRowOneDescriptionCell = await findByTestId(
        `${testId}.table--cell-1`,
      );
      expect((componentRowOneDescriptionCell as HTMLElement).innerText).toEqual(
        'I am a Foo component',
      );

      const componentRowOneOwnerCell = await findByTestId(
        `${testId}.table--cell-2`,
      );
      expect((componentRowOneOwnerCell as HTMLElement).innerText).toEqual(
        'Unowned',
      );

      const componentRowOnePercentageCell = await findByTestId(
        `${testId}.table--cell-3`,
      );
      expect((componentRowOnePercentageCell as HTMLElement).innerText).toEqual(
        '90%',
      );
    });

    test('Should display all components', async () => {
      // Find component row one
      const componentRowOne = await result.findByTestId(
        `${testIdPrefix}.fake-component-foo`,
      );
      expect(componentRowOne).toBeInTheDocument();

      // Find component row two
      const componentRowTwo = await result.findByTestId(
        `${testIdPrefix}.fake-component-bar`,
      );
      expect(componentRowTwo).toBeInTheDocument();
    });

    test('Should display Load More button if next page present', async () => {
      // Find load more button
      const loadMore = await result.findByTestId(`${testId}.load-more`);
      expect(loadMore).toBeInTheDocument();
    });
  });

  describe('Last page', () => {
    beforeEach(() => {
      result = render(
        <CompassTestProvider>
          <ApolloAutoMockProvider
            mocks={MOCK_SCORECARD_APPLIEDTO_COMPONENTS_LAST_PAGE}
          >
            <ComponentList
              testId={testId}
              componentType={CompassComponentType.LIBRARY}
              scorecardARI={
                'ari:cloud:compass:2376f937-d647-4506-9ac8-b3e1bf664575:scorecard/2fdd88e4-4414-4a89-be5c-129b66b85fee/fake-scorecard-id'
              }
            />
          </ApolloAutoMockProvider>
        </CompassTestProvider>,
      );
    });

    test('Should not display Load More button if no next page present', async () => {
      // wait for appliedToComponents query to load
      const componentRowOneTestId = `${testIdPrefix}.fake-component-foo`;
      await result.findByTestId(componentRowOneTestId);

      expect(
        result.queryByTestId(`${testId}.load-more`),
      ).not.toBeInTheDocument();
    });
  });

  describe('ComponentList empty state', () => {
    const emptyStateMock = {
      CompassScorecard: () => ({
        appliedToComponents: {
          __typename: 'CompassScorecardAppliedToComponentsConnection',
          nodes: [],
        },
      }),
    };

    test('Should display the empty state when there are no components the scorecard is applied to', async () => {
      result = render(
        <CompassTestProvider>
          <ApolloAutoMockProvider mocks={emptyStateMock}>
            <ComponentList
              testId={testId}
              componentType={CompassComponentType.SERVICE}
              scorecardARI={
                'ari:cloud:compass:2376f937-d647-4506-9ac8-b3e1bf664575:scorecard/2fdd88e4-4414-4a89-be5c-129b66b85fee/fake-scorecard-id'
              }
            />
          </ApolloAutoMockProvider>
        </CompassTestProvider>,
      );

      expect(
        await result.findByTestId(`${testId}.empty-state`),
      ).toBeInTheDocument();
    });

    test('Should display the correct empty state header and body for an APPLICATION component type scorecard', async () => {
      result = render(
        <CompassTestProvider>
          <ApolloAutoMockProvider mocks={emptyStateMock}>
            <ComponentList
              testId={testId}
              componentType={CompassComponentType.APPLICATION}
              scorecardARI={
                'ari:cloud:compass:2376f937-d647-4506-9ac8-b3e1bf664575:scorecard/2fdd88e4-4414-4a89-be5c-129b66b85fee/fake-scorecard-id'
              }
            />
          </ApolloAutoMockProvider>
        </CompassTestProvider>,
      );

      expect(
        await result.findByText('No applications to show'),
      ).toBeInTheDocument();

      expect(
        await result.findByText(
          'This scorecard hasn’t been applied to any applications. When you apply this scorecard to applications, they’ll appear here with their respective scores.',
        ),
      ).toBeInTheDocument();
    });

    test('Should display the correct empty state header and body for an OTHER component type scorecard', async () => {
      result = render(
        <CompassTestProvider>
          <ApolloAutoMockProvider mocks={emptyStateMock}>
            <ComponentList
              testId={testId}
              componentType={CompassComponentType.OTHER}
              scorecardARI={
                'ari:cloud:compass:2376f937-d647-4506-9ac8-b3e1bf664575:scorecard/2fdd88e4-4414-4a89-be5c-129b66b85fee/fake-scorecard-id'
              }
            />
          </ApolloAutoMockProvider>
        </CompassTestProvider>,
      );

      expect(
        await result.findByText("No components of the 'other' type to show"),
      ).toBeInTheDocument();

      expect(
        await result.findByText(
          "This scorecard hasn’t been applied to any components of the 'other' type. When you apply this scorecard to components of the 'other' type, they’ll appear here with their respective scores.",
        ),
      ).toBeInTheDocument();
    });
  });
});

describe('ComponentList error state', () => {
  test('Should display error state', async () => {
    const { findByTestId } = render(
      <CompassTestProvider>
        <ApolloNetworkErrorProvider>
          <ComponentList
            scorecardARI={
              'ari:cloud:compass:2376f937-d647-4506-9ac8-b3e1bf664575:scorecard/2fdd88e4-4414-4a89-be5c-129b66b85fee/fake-scorecard-id'
            }
            testId={'testing-component-list'}
            componentType={CompassComponentType.OTHER}
          />
        </ApolloNetworkErrorProvider>
      </CompassTestProvider>,
    );
    expect(
      await findByTestId('testing-component-list.error-state'),
    ).toBeInTheDocument();
  });
});
