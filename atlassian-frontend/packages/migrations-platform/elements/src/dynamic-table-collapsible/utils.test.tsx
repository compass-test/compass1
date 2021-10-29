import React from 'react';

import { render } from '@testing-library/react';

import * as utils from './utils';

describe('createCollapsibleRow()', () => {
  it('should return a <tr /> element with attribute of data-row-collapsible="fake-key"', () => {
    const collapsibleRow = utils.createCollapsibleRow(
      'fake-key',
      <td>Fake content</td>,
    );

    expect(collapsibleRow.getAttribute('data-row-collapsible')).toBe(
      'fake-key',
    );
    expect(collapsibleRow.innerText).toBe('Fake content');
  });
});

describe('insertCollapsibleRow()', () => {
  const collapsibleRow = utils.createCollapsibleRow(
    'fake-key',
    <td>fake collapsible row</td>,
  );
  const targetEl = (
    <table>
      <tbody>
        <tr>
          <td>Normal row</td>
        </tr>
      </tbody>
    </table>
  );

  it('should mutate the targetEl by inserting collapsible row', () => {
    const { getByText } = render(targetEl);
    const table = getByText(/normal row/i);

    utils.insertCollapsibleRow(collapsibleRow, table);
    expect(getByText(/fake collapsible row/i)).toBeInTheDocument();
  });
});

describe('removeCollapsibleRow()', () => {
  const key = 'fake-key';
  it('should remove collapsible row based on key provided', () => {
    const { getByText, queryByText } = render(
      <table>
        <tbody>
          <tr>
            <td>Normal row</td>
          </tr>
        </tbody>
      </table>,
    );

    // Create row
    const collapsibleRow = utils.createCollapsibleRow(
      'fake-key',
      <td>Collapsible row</td>,
    );

    // Insert row
    const row = getByText(/normal row/i);
    utils.insertCollapsibleRow(collapsibleRow, row);

    expect(getByText(/collapsible row/i)).toBeInTheDocument();

    utils.removeCollapsibleRow(key);
    expect(queryByText(/collapsible row/i)).not.toBeInTheDocument();
  });
});

describe('removeAllCollapsibleRows()', () => {
  describe('given there are multiple collapsible rows open', () => {
    it('should remove collapsible content', () => {
      const { getByText, queryByText } = render(
        <table>
          <tbody>
            <tr>
              <td>Normal row 1</td>
            </tr>
            <tr>
              <td>Normal row 2</td>
            </tr>
          </tbody>
        </table>,
      );

      // Create rows
      const collapsibleRow1 = utils.createCollapsibleRow(
        'fake-key',
        <td>Collapsible row 1</td>,
      );
      const collapsibleRow2 = utils.createCollapsibleRow(
        'fake-key',
        <td>Collapsible row 2</td>,
      );

      // Insert collapsible rows
      const row1 = getByText(/normal row 1/i);
      const row2 = getByText(/normal row 2/i);
      utils.insertCollapsibleRow(collapsibleRow1, row1);
      utils.insertCollapsibleRow(collapsibleRow2, row2);

      expect(getByText(/collapsible row 1/i)).toBeInTheDocument();
      expect(getByText(/collapsible row 2/i)).toBeInTheDocument();

      utils.removeAllCollapsibleRows();
      expect(queryByText(/collapsible row 1/i)).not.toBeInTheDocument();
      expect(queryByText(/collapsible row 2/i)).not.toBeInTheDocument();
    });
  });
});
