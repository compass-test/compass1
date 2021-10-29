import React from 'react';

import { act, fireEvent, render } from '@testing-library/react';

import {
  ProgressStatusDefault,
  ProgressStatusEmpty,
  ProgressStatusLoading,
  ProgressStatusMoved,
  ProgressStatusSuccess,
  ProgressStatusWithTitle,
} from './examples';

jest.useFakeTimers();

describe('<ProgressStatus />', () => {
  describe('given the progress has‘t started yet', () => {
    it('should display zero progress', () => {
      const { getByTestId } = render(<ProgressStatusDefault />);
      const lozenge = getByTestId('lozenge');

      expect(lozenge.textContent).toContain('0%');
    });
  });

  describe('given the progress has completed', () => {
    it('should display 100% progress', () => {
      const { getByTestId } = render(<ProgressStatusSuccess />);
      const lozenge = getByTestId('lozenge');

      expect(lozenge.textContent).toContain('100%');
    });
  });

  describe('given the progress is ongoing', () => {
    it('should display appropriate progress', () => {
      const { getByTestId } = render(<ProgressStatusMoved />);
      const lozenge = getByTestId('lozenge');

      expect(lozenge.textContent).toContain('38%');
    });

    describe('when hover on the component', () => {
      it('should display the title tooltip', () => {
        const { getByTestId, queryByTestId, unmount } = render(
          <ProgressStatusWithTitle />,
        );

        expect(queryByTestId('tooltip')).not.toBeInTheDocument();

        // Migrate to testing-library user-event once the outdated a-f version is upgraded
        // userEvent.hover(getByTestId('lozenge'));
        fireEvent.mouseOver(getByTestId('lozenge'));

        // Waiting for the tooltip to appear
        act(() => {
          jest.runAllTimers();
        });
        expect(queryByTestId('tooltip')).toBeInTheDocument();

        // Waiting for the tooltip to disappear
        act(() => {
          unmount();
        });
      });
    });
  });

  describe('given the progress total step is zero', () => {
    it('should display an empty view', () => {
      const { queryByTestId } = render(<ProgressStatusEmpty />);
      const lozenge = queryByTestId('lozenge');

      expect(lozenge).toBeNull();
    });
  });

  describe('given the progress is loading', () => {
    it('should show the loading view', () => {
      const { getByTestId } = render(<ProgressStatusLoading />);
      const lozenge = getByTestId('lozenge');

      expect(lozenge.textContent).toContain('Loading');
    });
  });
});
