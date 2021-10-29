import { fireEvent, Matcher, wait, within } from '@testing-library/react';

const DOWN_ARROW = { keyCode: 40 };

/**
 * Selecting an option within an AtlasKit Select component can sometimes be tricky.
 * This utility function makes it easier.
 *
 * Usage:
 *   // 1. Find your select element:
 *   const select = getAllByLabelText(/Owner/i)[0];
 *
 *   // 2. Select an option within it:
 *   selectOption(select, /Compass Crux/i);
 *
 *   // 3. Done!
 *
 * @param select
 * @param option
 */
export async function selectOption(select: HTMLElement, option: Matcher) {
  // Open the selector with the keyboard
  fireEvent.keyDown(select, DOWN_ARROW);

  const { getByText } = within(select);

  // Wait for our option to load and then click it
  await wait(() => getByText(option));

  const optionElement = getByText(option);

  if (!(optionElement instanceof HTMLElement)) {
    // It shouldn't be possible to get here because we wait() for the element,
    // but typescript requires a guaranteed element for the click event.
    throw new Error('Option not found in selector');
  }

  fireEvent.click(optionElement);
}
