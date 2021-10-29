import React from 'react';

import { screen } from '@testing-library/dom';
import { fireEvent, render, wait } from '@testing-library/react';

import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import {
  MOCKED_COMPONENT,
  MOCKED_DEPENDS_ON_RELATIONSHIP_NODES,
  MOCKED_DEPENDS_ON_RELATIONSHIP_QUERY,
  MOCKED_EMPTY_RELATIONSHIP_QUERY,
  MOCKED_NODES,
  MOCKED_SEARCH_RESULTS,
  RELATIONSHIP_VIEW_ACTION_SUCCESS_RESOLVER,
} from '../../../../common/mocks';

import { RelationshipViewExample } from './examples';

import { RelationshipsView } from './index';

const DOWN_ARROW = { keyCode: 40 };

const MOCKED_RELATIONSHIPS_VIEW = {
  ...MOCKED_DEPENDS_ON_RELATIONSHIP_QUERY,
  ...MOCKED_SEARCH_RESULTS,
};

const MOCKED_EMPTY_RELATIONSHIPS_VIEW = {
  ...MOCKED_EMPTY_RELATIONSHIP_QUERY,
  ...MOCKED_SEARCH_RESULTS,
};

/**
 * Clicks the add button to show the add relationship form (if not empty), selects the provided
 * option from the component search picker, and then submits the form. (Add relationship form is
 * shown by default on the empty state)
 * @param baseElement - The base rendered element.
 * @param optionMatcher - Name of the option to select in the picker.
 * @param isEmptyState - If the RelationshipView has no relationships
 */
const createRelationshipInRelationshipView = async (
  baseElement: HTMLElement,
  optionMatcher: RegExp,
  isEmptyState: boolean,
) => {
  // if not empty click add button
  if (!isEmptyState) {
    // click the + button to show the picker
    fireEvent.click(screen.getByLabelText(/Add dependency/i));
  }

  // find the searchPicker and keydown to open the dropdown
  const searchPicker = screen.getByText(/Select a component/i);
  fireEvent.keyDown(searchPicker, DOWN_ARROW);

  // Wait for our option to load and then click it
  await wait(() => screen.getByText(optionMatcher));

  // find the option and click
  fireEvent.click(screen.getByText(optionMatcher));

  // find and click the add button
  const submitButton = baseElement.querySelector(
    'button[type=submit]',
  ) as HTMLButtonElement;
  fireEvent.click(submitButton);

  // wait for form to submit
  await wait(() => expect(submitButton).not.toBeInTheDocument());
};

/**
 * Clicks on the delete button for a specified relationship, waits for the delete modal to appear,
 * clicks the 'Remove' button to confirm the deletion.
 * @param relationshipEndNodeComponentId - The relationship's endNode component id to be deleted
 */
const deleteRelationshipInRelationshipView = async (
  relationshipEndNodeComponentName: string,
) => {
  // find and click the delete button for the relationship to be deleted
  const deleteButton = screen.getByLabelText(
    new RegExp(
      `Delete relationship with ${relationshipEndNodeComponentName}`,
      'i',
    ),
  );
  fireEvent.click(deleteButton);

  // wait until the delete modal appears
  const deleteModal = screen.getByText(/Remove dependency/i);

  await wait(() => expect(deleteModal).toBeInTheDocument());

  // click to confirm deletion
  fireEvent.click(screen.getAllByText(/Remove/i)[1] as HTMLElement);

  // the delete modal should be hidden on submit
  await wait(() => expect(deleteModal).not.toBeInTheDocument());
};

describe('RelationshipsView', () => {
  it('should show the relationship list when there are relationships', async () => {
    const { findByText, getByText } = render(
      <CompassTestProvider>
        <ApolloAutoMockProvider mocks={MOCKED_RELATIONSHIPS_VIEW}>
          <RelationshipsView currentComponent={MOCKED_COMPONENT} />
        </ApolloAutoMockProvider>
      </CompassTestProvider>,
    );

    // the description should show once loaded
    // use findBy to wait for page to load
    const description = await findByText(
      /Define upstream dependencies to understand whether you're affected if downtime occurs./i,
    );
    expect(description).toBeInTheDocument();

    // Shows existing relationships in the list
    expect(
      getByText(MOCKED_DEPENDS_ON_RELATIONSHIP_NODES[0].endNode.name),
    ).toBeInTheDocument();
    expect(
      getByText(MOCKED_DEPENDS_ON_RELATIONSHIP_NODES[1].endNode.name),
    ).toBeInTheDocument();
    expect(
      getByText(MOCKED_DEPENDS_ON_RELATIONSHIP_NODES[2].endNode.name),
    ).toBeInTheDocument();
  });

  it('should render the empty state when there are no relationships', async () => {
    const { findByText, getByText } = render(
      <CompassTestProvider>
        <ApolloAutoMockProvider mocks={MOCKED_EMPTY_RELATIONSHIPS_VIEW}>
          <RelationshipsView currentComponent={MOCKED_COMPONENT} />
        </ApolloAutoMockProvider>
      </CompassTestProvider>,
    );

    // the empty state title should show once loaded
    // use findBy to wait for page to load
    const title = await findByText(/Map your software infrastructure/i);
    expect(title).toBeInTheDocument();

    // The empty state has a search picker
    const searchPicker = getByText(/Select a component/i);
    expect(searchPicker).toBeInTheDocument();
  });

  it('should be able to add and delete relationships when there are existing relationships', async () => {
    const { baseElement, findByText } = render(
      <CompassTestProvider>
        <ApolloAutoMockProvider
          mocks={MOCKED_RELATIONSHIPS_VIEW}
          resolvers={RELATIONSHIP_VIEW_ACTION_SUCCESS_RESOLVER}
        >
          <RelationshipsView currentComponent={MOCKED_COMPONENT} />
        </ApolloAutoMockProvider>
      </CompassTestProvider>,
    );

    // check the description to wait until the page has loaded
    const description = await findByText(
      /Define upstream dependencies to understand whether you're affected if downtime occurs./i,
    );
    expect(description).toBeInTheDocument();

    // store the data of the component that the new relationship will be with
    const newRelationshipComponent = MOCKED_NODES[1].component;

    // create a RegExp matcher for the above component
    const newRelationshipComponentMatcher = new RegExp(
      newRelationshipComponent.name,
      'i',
    );

    // create a new relationship
    await createRelationshipInRelationshipView(
      baseElement,
      newRelationshipComponentMatcher,
      false,
    );

    // the new relationship should now be shown in the list
    let newRelationshipListItem = await findByText(
      newRelationshipComponentMatcher,
    );
    expect(newRelationshipListItem).toBeInTheDocument();

    // delete the new relationship
    await deleteRelationshipInRelationshipView(newRelationshipComponent.name);

    // the new relationship should now be removed from the list
    await wait(() => expect(newRelationshipListItem).not.toBeInTheDocument());

    // add the same relationship back
    await createRelationshipInRelationshipView(
      baseElement,
      newRelationshipComponentMatcher,
      false,
    );

    // the relationship should be in the document again
    // reassign as reference was lost when it was removed from the document previously
    newRelationshipListItem = await findByText(newRelationshipComponentMatcher);
    expect(newRelationshipListItem).toBeInTheDocument();
  });

  it('should be able to add and delete relationships when there are no existing relationships', async () => {
    const { baseElement, findByText } = render(
      <CompassTestProvider>
        <ApolloAutoMockProvider
          mocks={MOCKED_EMPTY_RELATIONSHIPS_VIEW}
          resolvers={RELATIONSHIP_VIEW_ACTION_SUCCESS_RESOLVER}
        >
          <RelationshipsView currentComponent={MOCKED_COMPONENT} />
        </ApolloAutoMockProvider>
      </CompassTestProvider>,
    );

    // check the empty state title to wait until the page has loaded
    let title = await findByText(/Map your software infrastructure/i);
    expect(title).toBeInTheDocument();

    // store the data of the component that the new relationship will be with
    const newRelationshipComponent = MOCKED_NODES[1].component;

    // create a RegExp matcher for the above component
    const newRelationshipComponentMatcher = new RegExp(
      newRelationshipComponent.name,
      'i',
    );

    // create a new relationship
    await createRelationshipInRelationshipView(
      baseElement,
      newRelationshipComponentMatcher,
      true,
    );

    // the new relationship should now be shown in the list and the empty state should no longer be shown
    let newRelationshipListItem = await findByText(
      newRelationshipComponentMatcher,
    );
    expect(newRelationshipListItem).toBeInTheDocument();
    expect(title).not.toBeInTheDocument();

    // delete the new relationship
    await deleteRelationshipInRelationshipView(newRelationshipComponent.name);

    // the new relationship should now be removed from the list
    await wait(() => expect(newRelationshipListItem).not.toBeInTheDocument());

    // the empty state should be shown again
    // reassign as reference was lost when it was removed from the document previously
    title = await findByText(/Map your software infrastructure/i);
    expect(title).toBeInTheDocument();

    // add the same relationship back
    await createRelationshipInRelationshipView(
      baseElement,
      newRelationshipComponentMatcher,
      true,
    );

    // the relationship should be in the document again and the empty state should no longer be shown
    // reassign as reference was lost when it was removed from the document previously
    newRelationshipListItem = await findByText(newRelationshipComponentMatcher);
    expect(newRelationshipListItem).toBeInTheDocument();
    expect(title).not.toBeInTheDocument();
  });

  const MANAGED_EMPTY_STATE_ACTION_BUTTON_TEXT = 'Define in compass.yml';
  const NON_MANAGED_EMPTY_STATE_ADD_BUTTON_TEXT = 'Add dependency';
  const DEPENDS_ON_SECTION_TEST_ID =
    'relationships.depends_on.outward--section';
  const DEPENDS_ON_EMPTY_STATE_TEST_ID =
    'relationships.depends_on.outward--empty-state';
  const DEPENDED_ON_BY_SECTION_TEST_ID =
    'relationships.depends_on.inward--section';
  const DEPENDED_ON_BY_EMPTY_STATE_TEST_ID =
    'relationships.depends_on.inward--empty-state';

  describe.each`
    isManagedComponent
    ${true}
    ${false}
  `(
    'component is externally managed: $isManagedComponent',
    ({ isManagedComponent }) => {
      describe('when there are no dependencies', () => {
        it('should show correct full-page empty state', async () => {
          render(
            <RelationshipViewExample
              isManagedComponent={isManagedComponent}
              hasUpstreamDependencies={false}
              hasDownstreamDependencies={false}
            />,
          );

          // Check that empty state has been rendered
          await screen.findByText('Map your software infrastructure');

          const managedEmptyStateButton = screen.queryByRole('button', {
            name: MANAGED_EMPTY_STATE_ACTION_BUTTON_TEXT,
          });
          const unmanagedEmptyStateButton = screen.queryByRole('button', {
            name: NON_MANAGED_EMPTY_STATE_ADD_BUTTON_TEXT,
          });

          if (isManagedComponent) {
            expect(managedEmptyStateButton).toBeInTheDocument();
            expect(unmanagedEmptyStateButton).not.toBeInTheDocument();
          } else {
            expect(managedEmptyStateButton).not.toBeInTheDocument();
            expect(unmanagedEmptyStateButton).toBeInTheDocument();
          }
        });
      });

      describe('when there are upstream dependencies but not downstream', () => {
        it('should show only a populated "Depends on" section but not "Depended on by"', async () => {
          render(
            <RelationshipViewExample
              isManagedComponent={isManagedComponent}
              hasUpstreamDependencies={true}
              hasDownstreamDependencies={false}
            />,
          );

          // 'Depends on' section should exist and have a list of dependencies
          const dependsOnSection = await screen.findByTestId(
            DEPENDS_ON_SECTION_TEST_ID,
          );
          const dependsOnList = dependsOnSection.querySelector('ul');
          const dependsOnEmptyState = screen.queryByTestId(
            DEPENDS_ON_EMPTY_STATE_TEST_ID,
          );
          expect(dependsOnSection).toBeInTheDocument();
          expect(dependsOnList).toBeInTheDocument();
          expect(dependsOnEmptyState).not.toBeInTheDocument();

          // 'Depended on by' section should not exist
          const dependedOnBySection = screen.queryByTestId(
            DEPENDED_ON_BY_SECTION_TEST_ID,
          );
          expect(dependedOnBySection).not.toBeInTheDocument();
        });
      });

      describe('when there are downstream dependencies but not upstream', () => {
        it('should show an empty "Depends on" section and a populated "Depended on by" section', async () => {
          render(
            <RelationshipViewExample
              isManagedComponent={isManagedComponent}
              hasUpstreamDependencies={false}
              hasDownstreamDependencies={true}
            />,
          );

          // 'Depends on' section should show an empty state
          const dependsOnSection = await screen.findByTestId(
            DEPENDS_ON_SECTION_TEST_ID,
          );
          const dependsOnList = dependsOnSection.querySelector('ul');
          const dependsOnEmptyState = screen.queryByTestId(
            DEPENDS_ON_EMPTY_STATE_TEST_ID,
          );
          expect(dependsOnSection).toBeInTheDocument();
          expect(dependsOnList).not.toBeInTheDocument();
          expect(dependsOnEmptyState).toBeInTheDocument();

          // 'Depended on by' section should exist and have a list of dependencies
          const dependedOnBySection = await screen.findByTestId(
            DEPENDED_ON_BY_SECTION_TEST_ID,
          );
          const dependedOnByList = dependedOnBySection.querySelector('ul');
          const dependedOnByEmptyState = screen.queryByTestId(
            DEPENDED_ON_BY_EMPTY_STATE_TEST_ID,
          );
          expect(dependedOnBySection).toBeInTheDocument();
          expect(dependedOnByList).toBeInTheDocument();
          expect(dependedOnByEmptyState).not.toBeInTheDocument();
        });
      });

      describe('when there are downstream and upstream dependencies', () => {
        it('should show the populated "Depends on" and "Depended on by" sections', async () => {
          render(
            <RelationshipViewExample
              isManagedComponent={isManagedComponent}
              hasUpstreamDependencies={true}
              hasDownstreamDependencies={true}
            />,
          );

          // 'Depends on' section should exist and have a list of dependencies
          const dependsOnSection = await screen.findByTestId(
            DEPENDS_ON_SECTION_TEST_ID,
          );
          const dependsOnList = dependsOnSection.querySelector('ul');
          const dependsOnEmptyState = screen.queryByTestId(
            DEPENDS_ON_EMPTY_STATE_TEST_ID,
          );
          expect(dependsOnSection).toBeInTheDocument();
          expect(dependsOnList).toBeInTheDocument();
          expect(dependsOnEmptyState).not.toBeInTheDocument();

          // 'Depended on by' section should exist and have a list of dependencies
          const dependedOnBySection = await screen.findByTestId(
            DEPENDED_ON_BY_SECTION_TEST_ID,
          );
          const dependedOnByList = dependedOnBySection.querySelector('ul');
          const dependedOnByEmptyState = screen.queryByTestId(
            DEPENDED_ON_BY_EMPTY_STATE_TEST_ID,
          );
          expect(dependedOnBySection).toBeInTheDocument();
          expect(dependedOnByList).toBeInTheDocument();
          expect(dependedOnByEmptyState).not.toBeInTheDocument();
        });
      });
    },
  );
});
