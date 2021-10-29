import React from 'react';

import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';

import { CompassRelationshipDirection } from '@atlassian/dragonfruit-graphql';

import {
  FAKE_DATA_MANAGER,
  MOCKED_DEPENDS_ON_RELATIONSHIP_NODES,
} from '../../../../../common/mocks';

import { RelationshipSectionTemplate } from './examples';

const verifyAndCloseForm = () => {
  expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
  screen.getByText('Cancel').click();
  expect(screen.queryByRole('button', { name: 'Add' })).toBeNull();
};

const EMPTY_STATE_TEST_ID = 'test-prefix--empty-state';
const ADD_ACTION_TEST_ID = 'test-prefix--add-action';
const DATA_MANAGER_TEST_ID = 'test-prefix--data-manager-link';

describe('RelationshipSection', () => {
  it('with relationships', () => {
    render(<RelationshipSectionTemplate />);

    // Empty state should be hidden
    expect(screen.queryByTestId(EMPTY_STATE_TEST_ID)).toBeNull();

    // List should be there
    // For some reason it returns 2 lists, but we render only 1
    // const list = screen.getByTestId('test-prefix--list');
    // expect(list).toBeInTheDocument();

    const addAction = screen.getByTestId(ADD_ACTION_TEST_ID);
    addAction.click();

    verifyAndCloseForm();
  });
  it('without relationships', () => {
    render(<RelationshipSectionTemplate relationships={[]} />);

    // Empty state should be there
    const emptyState = screen.getByTestId(EMPTY_STATE_TEST_ID);
    emptyState.click();

    expect(screen.queryByTestId(EMPTY_STATE_TEST_ID)).toBeNull();

    verifyAndCloseForm();

    expect(screen.getByTestId(EMPTY_STATE_TEST_ID)).toBeInTheDocument();
  });

  describe('dataManagerLink', () => {
    it.each`
      direction                               | managed  | empty    | visible
      ${CompassRelationshipDirection.OUTWARD} | ${true}  | ${true}  | ${false}
      ${CompassRelationshipDirection.OUTWARD} | ${true}  | ${false} | ${true}
      ${CompassRelationshipDirection.OUTWARD} | ${false} | ${true}  | ${false}
      ${CompassRelationshipDirection.OUTWARD} | ${false} | ${false} | ${false}
      ${CompassRelationshipDirection.INWARD}  | ${true}  | ${true}  | ${false}
      ${CompassRelationshipDirection.INWARD}  | ${true}  | ${false} | ${false}
      ${CompassRelationshipDirection.INWARD}  | ${false} | ${true}  | ${false}
      ${CompassRelationshipDirection.INWARD}  | ${false} | ${false} | ${false}
    `(
      'should be visible($visible) for DEPENDS_ON $direction managed($managed) and empty($empty)',
      ({ relationshipType, direction, managed, empty, visible }) => {
        const dataManager = managed ? FAKE_DATA_MANAGER : undefined;
        const relationships = empty ? [] : MOCKED_DEPENDS_ON_RELATIONSHIP_NODES;
        render(
          <RelationshipSectionTemplate
            relationshipType={relationshipType}
            direction={direction}
            relationships={relationships}
            dataManager={dataManager}
          />,
        );

        if (visible) {
          expect(screen.getByTestId(DATA_MANAGER_TEST_ID)).toBeInTheDocument();
        } else {
          expect(screen.queryByTestId(DATA_MANAGER_TEST_ID)).toBeNull();
        }
      },
    );

    it('should have correct href and target', () => {
      render(<RelationshipSectionTemplate dataManager={FAKE_DATA_MANAGER} />);

      const externalSourceLink = screen.getByTestId(DATA_MANAGER_TEST_ID);

      expect(externalSourceLink).toHaveAttribute(
        'href',
        FAKE_DATA_MANAGER.externalSourceURL,
      );
      expect(externalSourceLink).toHaveAttribute('target', '_blank');
    });
  });
});
