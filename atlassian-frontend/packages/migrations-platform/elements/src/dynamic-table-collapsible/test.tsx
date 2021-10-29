import React from 'react';

import {
  fireEvent,
  render,
  RenderResult,
  // eslint-disable-next-line import/no-extraneous-dependencies
} from '@testing-library/react';

import {
  DynamicTableWithCollapsibleRows,
  DynamicTableWithoutCollapsibleRows,
} from './examples';

describe('<DynamicTableCollapsible />', () => {
  describe('Given there is collapsibleContent passed in', () => {
    let renderResult: RenderResult;

    beforeEach(() => {
      renderResult = render(<DynamicTableWithCollapsibleRows />);
    });

    it('then the row with the content should have an arrow button', () => {
      const { getAllByRole } = renderResult;
      const dropdownButton = getAllByRole('button')[0];

      expect(dropdownButton).toBeInTheDocument();
      expect(dropdownButton.getAttribute('aria-expanded')).toBe('false');
    });

    it('then the content should be visible you click on the arrow button ', async () => {
      const { getAllByRole, queryByText } = renderResult;
      const dropdownButton = getAllByRole('button')[0];

      expect(dropdownButton).toBeInTheDocument();
      expect(dropdownButton.getAttribute('aria-expanded')).toBe('false');

      fireEvent.click(dropdownButton);

      const content = queryByText(
        'Labore deserunt labore pariatur ea aliquip et exercitation.',
      );

      expect(content).toBeInTheDocument();
      expect(dropdownButton.getAttribute('aria-expanded')).toBe('true');
    });

    it('then the content should be collapsed When you click the arrow button when content is displayed', async () => {
      const { getAllByRole, getByText } = renderResult;
      const dropdownButton = getAllByRole('button')[0];

      expect(dropdownButton).toBeInTheDocument();
      expect(dropdownButton.getAttribute('aria-expanded')).toBe('false');

      fireEvent.click(dropdownButton);

      const content = getByText(
        'Labore deserunt labore pariatur ea aliquip et exercitation.',
      );

      expect(dropdownButton).toBeInTheDocument();
      expect(dropdownButton.getAttribute('aria-expanded')).toBe('true');
      expect(content).toBeInTheDocument();

      fireEvent.click(dropdownButton);

      expect(dropdownButton.getAttribute('aria-expanded')).toBe('false');
      expect(content).not.toBeInTheDocument();
    });
  });

  describe('Given there is "no" collapsibleContent passed in', () => {
    let renderResult: RenderResult;

    beforeEach(() => {
      renderResult = render(<DynamicTableWithoutCollapsibleRows />);
    });

    it('then there should not be a button in the last column', () => {
      const { container, queryByRole } = renderResult;

      const dropdownButton = queryByRole('button');
      expect(dropdownButton).not.toBeInTheDocument();

      expect(container.querySelectorAll('tbody tr td')[5].innerHTML).toBe('');
    });

    it('then there should not be an expanded row in the dom', () => {
      const { container, queryByText } = renderResult;

      const content = queryByText(
        'Labore deserunt labore pariatur ea aliquip et exercitation.',
      );
      expect(content).not.toBeInTheDocument();
      expect(container.querySelectorAll('tbody tr')).toHaveLength(1);
    });
  });
});
