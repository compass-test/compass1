import React from 'react';

import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';

import { CompassRelationshipDirection } from '@atlassian/dragonfruit-graphql';

import { SectionHeaderTemplate } from './examples';

describe('SectionHeader', () => {
  describe('title', () => {
    it.each`
      direction                               | expectedTitle
      ${CompassRelationshipDirection.OUTWARD} | ${'Depends on'}
      ${CompassRelationshipDirection.INWARD}  | ${'Depended on by'}
    `(
      'should be [$expectedTitle] for DEPENDS_ON - $direction',
      ({ direction, expectedTitle }) => {
        render(<SectionHeaderTemplate direction={direction} />);
        expect(screen.getByText(expectedTitle)).toBeInTheDocument();
      },
    );
  });

  describe('addButton', () => {
    it.each`
      direction                               | managed  | empty    | visible
      ${CompassRelationshipDirection.OUTWARD} | ${true}  | ${true}  | ${false}
      ${CompassRelationshipDirection.OUTWARD} | ${true}  | ${false} | ${false}
      ${CompassRelationshipDirection.OUTWARD} | ${false} | ${true}  | ${false}
      ${CompassRelationshipDirection.OUTWARD} | ${false} | ${false} | ${true}
      ${CompassRelationshipDirection.INWARD}  | ${true}  | ${true}  | ${false}
      ${CompassRelationshipDirection.INWARD}  | ${true}  | ${false} | ${false}
      ${CompassRelationshipDirection.INWARD}  | ${false} | ${true}  | ${false}
      ${CompassRelationshipDirection.INWARD}  | ${false} | ${false} | ${false}
    `(
      'should be visible($visible) for DEPENDS_ON $direction managed($managed) and empty($empty)',
      ({ direction, managed, empty, visible }) => {
        render(
          <SectionHeaderTemplate
            direction={direction}
            isManaged={managed}
            isSectionEmpty={empty}
          />,
        );

        if (visible) {
          expect(screen.getByTestId('prefix--add-action')).toBeInTheDocument();
        } else {
          expect(screen.queryByTestId('prefix--add-action')).toBeNull();
        }
      },
    );
    it('should call onActionClick function when clicked', () => {
      const mockFn = jest.fn();
      render(<SectionHeaderTemplate onActionClick={mockFn} />);
      screen.getByTestId('prefix--add-action').click();
      expect(mockFn).toBeCalledTimes(1);
    });
  });
});
