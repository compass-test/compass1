import React from 'react';

import { screen } from '@testing-library/dom';
import { act, fireEvent, render, wait } from '@testing-library/react';
import { DiProvider, injectable } from 'react-magnetic-di';

import { RecentComponentsProvider } from '@atlassian/dragonfruit-component-create-modal';
import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';
import { parseSearchComponentsResponse } from '@atlassian/dragonfruit-utils';

import messages from './messages';
import { ParseSearchComponentsMock } from './mocks';

import { ComponentsList } from './index';

describe('ComponentsList', () => {
  const CLASS_NAME_PREFIX =
    'dragonfruit.page-team-details.team-dashboard.components-list';

  const useParseSearchComponentsMock = injectable(
    parseSearchComponentsResponse,
    ParseSearchComponentsMock,
  );

  it('should render the ComponentsList', () => {
    const { getByTestId } = render(
      <DiProvider use={[useParseSearchComponentsMock]}>
        <ApolloAutoMockProvider>
          <RecentComponentsProvider>
            <CompassTestProvider>
              <ComponentsList teamId={'def456'} />
            </CompassTestProvider>
          </RecentComponentsProvider>
        </ApolloAutoMockProvider>
      </DiProvider>,
    );
    expect(getByTestId(CLASS_NAME_PREFIX)).toBeTruthy();
  });

  describe('EmptyState', () => {
    const renderComponentsList = () => {
      render(
        <DiProvider use={[useParseSearchComponentsMock]}>
          <ApolloAutoMockProvider>
            <RecentComponentsProvider>
              <CompassTestProvider locale="en">
                <ComponentsList teamId={'def456'} />
              </CompassTestProvider>
            </RecentComponentsProvider>
          </ApolloAutoMockProvider>
        </DiProvider>,
      );
    };

    beforeEach(() => {
      renderComponentsList();
    });

    it('should render the EmptyState when there are no existing components', async () => {
      const emptyState = await screen.findByText(
        messages.emptyStateHeading.defaultMessage,
      );
      expect(emptyState as HTMLElement).toBeInTheDocument();
    });

    describe('EmptyState and CreateComponentForm toggling', () => {
      beforeEach(async () => {
        const createComponentsButton = await screen.findByText(
          'Create components',
        );

        fireEvent.click(createComponentsButton);
      });

      it("should render the CreateComponentForm when clicking the 'Create Components' button on the emptyState", async () => {
        const createComponentForm = await screen.findByTestId(
          'dragonfruit.page-team-details.team-dashboard.components-list.empty-state.create-component-form',
        );
        expect(createComponentForm).toBeInTheDocument();
      });

      it("should render the EmptyState when clicking the 'Cancel' button on the CreateComponentForm", async () => {
        const cancelButton = await screen.findByText('Cancel');
        expect(cancelButton).toBeInTheDocument();

        fireEvent.click(cancelButton);

        const emptyState = await screen.findByText(
          messages.emptyStateHeading.defaultMessage,
        );
        expect(emptyState as HTMLElement).toBeInTheDocument();
      });
    });
  });

  describe('Submitting create component form', () => {
    it('should show a clean version of create component form after successful create', async () => {
      const { findByTestId } = render(
        <DiProvider use={[useParseSearchComponentsMock]}>
          <ApolloAutoMockProvider>
            <RecentComponentsProvider>
              <CompassTestProvider locale="en">
                <ComponentsList teamId={'def456'} />
              </CompassTestProvider>
            </RecentComponentsProvider>
          </ApolloAutoMockProvider>
        </DiProvider>,
      );

      const createComponentsButton = await screen.findByText(
        'Create components',
      );
      fireEvent.click(createComponentsButton);

      let nameField = (await findByTestId(
        'dragonfruit.teams.team-create-component.name-field',
      )) as HTMLInputElement;
      let submitButton = await findByTestId(
        'dragonfruit.teams.team-create-component.submit-button',
      );

      expect(nameField).toBeInTheDocument();
      fireEvent.change(nameField, { target: { value: 'Component name' } });

      expect(submitButton).toBeInTheDocument();
      act(() => {
        fireEvent.click(submitButton);
      });
      // Wait for create component mutation to succeed
      await wait();
      nameField = (await findByTestId(
        'dragonfruit.teams.team-create-component.name-field',
      )) as HTMLInputElement;
      expect(nameField.value).toEqual('');
    });

    it('should show empty state and no create component form after successful create when teamId changed', async () => {
      const { findByTestId, rerender } = render(
        <DiProvider use={[useParseSearchComponentsMock]}>
          <ApolloAutoMockProvider>
            <RecentComponentsProvider>
              <CompassTestProvider locale="en">
                <ComponentsList teamId={'def456'} />
              </CompassTestProvider>
            </RecentComponentsProvider>
          </ApolloAutoMockProvider>
        </DiProvider>,
      );

      const createComponentsButton = await screen.findByText(
        'Create components',
      );
      fireEvent.click(createComponentsButton);

      let nameField = (await findByTestId(
        'dragonfruit.teams.team-create-component.name-field',
      )) as HTMLInputElement;
      let submitButton = await findByTestId(
        'dragonfruit.teams.team-create-component.submit-button',
      );

      expect(nameField).toBeInTheDocument();
      fireEvent.change(nameField, { target: { value: 'Component name' } });

      expect(submitButton).toBeInTheDocument();
      act(() => {
        fireEvent.click(submitButton);
      });
      // Wait for create component mutation to succeed
      await wait();
      nameField = (await findByTestId(
        'dragonfruit.teams.team-create-component.name-field',
      )) as HTMLInputElement;
      expect(nameField.value).toEqual('');

      rerender(
        <DiProvider use={[useParseSearchComponentsMock]}>
          <ApolloAutoMockProvider>
            <RecentComponentsProvider>
              <CompassTestProvider locale="en">
                <ComponentsList teamId={'abc123'} />
              </CompassTestProvider>
            </RecentComponentsProvider>
          </ApolloAutoMockProvider>
        </DiProvider>,
      );
      const emptyState = await screen.findByText(
        messages.emptyStateHeading.defaultMessage,
      );
      expect(emptyState as HTMLElement).toBeInTheDocument();
      expect(findByTestId('dragonfruit.teams.team-create-component-button')).not
        .toBeInTheDocument;
    });
  });
});
