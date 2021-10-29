import React from 'react';

import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';

import { CompassRelationshipDirection } from '@atlassian/dragonfruit-graphql';

import { FAKE_DATA_MANAGER } from '../../../../../../common/mocks';

import { SectionEmptyStateTemplate } from './examples';

describe('SectionEmptyState', () => {
  describe('description', () => {
    it.each`
      direction                               | isManaged | expectedMessage
      ${CompassRelationshipDirection.OUTWARD} | ${false}  | ${'Add upstream dependencies to this component'}
      ${CompassRelationshipDirection.INWARD}  | ${false}  | ${null}
      ${CompassRelationshipDirection.OUTWARD} | ${true}   | ${'Add upstream dependencies in compass.yml'}
      ${CompassRelationshipDirection.INWARD}  | ${true}   | ${null}
    `(
      'show correct message for DEPENDS_ON $direction managed($isManaged)',
      ({ direction, isManaged, expectedMessage }) => {
        const dataManager = isManaged ? FAKE_DATA_MANAGER : null;
        render(
          <SectionEmptyStateTemplate
            direction={direction}
            dataManager={dataManager}
          />,
        );
        if (expectedMessage) {
          expect(screen.getByText(expectedMessage)).toBeInTheDocument();
        } else {
          expect(screen.queryByTestId('prefix--empty-state')).toBeNull();
        }
      },
    );
  });
  describe('icon', () => {
    describe('when managed', () => {
      it('should be a shortcut', () => {
        render(<SectionEmptyStateTemplate dataManager={FAKE_DATA_MANAGER} />);
        expect(
          screen.queryByTestId('prefix--icon--shortcut'),
        ).toBeInTheDocument();
      });
    });
    describe('when not managed', () => {
      it('should be a plus', () => {
        render(<SectionEmptyStateTemplate />);
        expect(screen.queryByTestId('prefix--icon--shortcut')).toBeNull();
      });
    });
  });

  describe('when clicked', () => {
    describe('managed', () => {
      it('should open a new tab with dataManager url', function () {
        const mockFn = jest.fn();
        const windowOpenFn = jest.spyOn(window, 'open');
        render(
          <SectionEmptyStateTemplate
            onClick={mockFn}
            dataManager={FAKE_DATA_MANAGER}
          />,
        );
        screen.getByTestId('prefix--empty-state').click();
        expect(mockFn).toBeCalledTimes(0);
        expect(windowOpenFn).toBeCalledTimes(1);
      });
    });
    describe('not managed', () => {
      it('should call the onClick function', function () {
        const mockFn = jest.fn();
        render(<SectionEmptyStateTemplate onClick={mockFn} />);
        screen.getByTestId('prefix--empty-state').click();
        expect(mockFn).toBeCalledTimes(1);
      });
    });
  });
});
