import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import { fireUIAnalytics } from '@atlassian/analytics-bridge';
import { UI_ONBOARDING_MODAL } from '@atlassian/dragonfruit-feature-flags';
import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { Onboarding } from './index';

const flags = {
  [UI_ONBOARDING_MODAL]: true,
};

jest.mock('@atlassian/analytics-bridge', () =>
  Object.assign({}, jest.requireActual('@atlassian/analytics-bridge'), {
    fireUIAnalytics: jest.fn(),
  }),
);

jest.mock('@atlassian/dragonfruit-rest', () =>
  Object.assign({}, jest.requireActual('@atlassian/dragonfruit-rest'), {
    useTeamsOfUser: () => ({
      data: {
        entities: [{}],
      },
    }),
  }),
);

describe('Onboarding', () => {
  describe('testId property', () => {
    test('Should be found by data-testid', async () => {
      const testId = 'dragonfruit-onboarding';
      const { getByTestId } = render(
        <CompassTestProvider flags={flags} locale="en">
          <Onboarding data-testId={testId} />
        </CompassTestProvider>,
      );
      expect(getByTestId(testId)).toBeTruthy();
    });
  });

  test('Should render properly using testId', async () => {
    const testId = 'dragonfruit-onboarding';
    const { getByText, getByTestId, container } = render(
      <CompassTestProvider flags={flags} locale="en">
        <Onboarding data-testId={testId} />
      </CompassTestProvider>,
    );
    expect(getByTestId(testId)).toBeTruthy();
    expect(container.childElementCount > 0).toBeTruthy();
    expect(getByText(/Welcome to Compass/i)).toBeInTheDocument();
    expect(getByText(/Next/i)).toBeInTheDocument();
  });

  test('Should not render if FF is false', async () => {
    const testId = 'dragonfruit-onboarding';
    const { container } = render(
      <CompassTestProvider
        flags={{
          [UI_ONBOARDING_MODAL]: false,
        }}
        locale="en"
      >
        <Onboarding data-testId={testId} />
      </CompassTestProvider>,
    );

    expect(container.childElementCount).toEqual(0);
  });

  test('Should not render if "active" and "creationFormIsOpen" are "false"', async () => {
    const testId = 'dragonfruit-onboarding';
    const { getByText, container } = render(
      <CompassTestProvider flags={flags} locale="en">
        <ApolloAutoMockProvider>
          <Onboarding data-testId={testId} />
        </ApolloAutoMockProvider>
      </CompassTestProvider>,
    );

    expect(container.childElementCount > 0).toBeTruthy();

    let button = getByText('Next');
    fireEvent.click(button);
    fireEvent.click(button);
    button = getByText('Create a component');
    fireEvent.click(button);
    button = getByText('Cancel');
    fireEvent.click(button);

    expect(container.childElementCount).toEqual(0); // create component modal is closed; we are done with the 4-step onboarding modal
  });

  describe('analytics', () => {
    beforeEach(() => jest.resetAllMocks());

    test('Analytics are fired when the skip button is clicked', async () => {
      const testId = 'dragonfruit-onboarding';
      const { getByText } = render(
        <CompassTestProvider flags={flags} locale="en">
          <Onboarding data-testId={testId} />
        </CompassTestProvider>,
      );

      const buttonSkip = getByText('Skip');
      fireEvent.click(buttonSkip);

      expect(fireUIAnalytics).toHaveBeenCalledWith(
        expect.objectContaining({
          payload: expect.objectContaining({
            action: 'clicked',
            actionSubject: 'button',
          }),
        }),
        'skipButtonOnboardingModal',
      );
    });
    test('Analytics are fired when the entire onboarding modal has been completed', async () => {
      const testId = 'dragonfruit-onboarding';
      const { getByText } = render(
        <CompassTestProvider flags={flags} locale="en">
          <ApolloAutoMockProvider>
            <Onboarding data-testId={testId} />
          </ApolloAutoMockProvider>
        </CompassTestProvider>,
      );

      let button = getByText('Next');
      fireEvent.click(button);
      fireEvent.click(button);
      button = getByText('Create a component');
      fireEvent.click(button);

      expect(fireUIAnalytics).toHaveBeenCalledWith(
        expect.objectContaining({
          payload: expect.objectContaining({
            action: 'clicked',
            actionSubject: 'button',
          }),
        }),
        'completedOnboardingModal',
      );
    });
  });
});

describe('Onboarding - Local storage', () => {
  test('Should not render if was viewed already', async () => {
    const localStorageMock = {
      getItem: jest.fn().mockImplementationOnce((key: string): string => {
        expect(key).toEqual(
          'onboarding-modal-v1:7550aec5-71ad-43de-8402-8f7d2d37398c:8660aec5-71ad-43de-8402-8f7d2d37398d:7dd4fc4403edb50ef3812f71',
        );
        return 'true';
      }),
    };

    Object.defineProperty(window, 'localStorage', { value: localStorageMock });

    const testId = 'dragonfruit-onboarding';
    const { container } = render(
      <CompassTestProvider flags={flags} locale="en">
        <Onboarding data-testId={testId} />
      </CompassTestProvider>,
    );

    expect(container.childElementCount).toEqual(0);
  });
});
