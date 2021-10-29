import ReactDOM from 'react-dom';

const COLLAPSIBLE_ROW_KEY = 'data-row-collapsible';

export const createCollapsibleRow = (
  key: string,
  rowContent: JSX.Element,
): HTMLTableRowElement => {
  const collapsibleRow = document.createElement('tr');

  // Set the collapsible row key for easy query later
  collapsibleRow.setAttribute(COLLAPSIBLE_ROW_KEY, key);

  // Render the row content into the collapsible row
  ReactDOM.render(rowContent, collapsibleRow);
  return collapsibleRow;
};

export const insertCollapsibleRow = (
  collapsibleRow: HTMLTableRowElement,
  targetEl: HTMLElement,
) => {
  // Querying the closet parent row of the target element
  const targetRow = targetEl.closest('tr');

  targetRow?.parentNode?.insertBefore(collapsibleRow, targetRow.nextSibling);
};

export const removeCollapsibleRow = (key: string) => {
  const collapsibleRow = document.querySelector(
    `tr[${COLLAPSIBLE_ROW_KEY}="${key}"]`,
  );

  if (collapsibleRow) {
    ReactDOM.unmountComponentAtNode(collapsibleRow);
    collapsibleRow.parentNode?.removeChild(collapsibleRow);
  }
};

export const removeAllCollapsibleRows = () => {
  const collapsibleRows = document.querySelectorAll(`[${COLLAPSIBLE_ROW_KEY}]`);

  collapsibleRows.forEach((collapsibleRow) => {
    ReactDOM.unmountComponentAtNode(collapsibleRow);
    collapsibleRow.parentNode?.removeChild(collapsibleRow);
  });
};
