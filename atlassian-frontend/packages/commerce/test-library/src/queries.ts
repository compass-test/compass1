/* eslint-disable import/no-extraneous-dependencies */
import { BoundFunctions, queries, screen, within } from '@testing-library/dom';

import { FindBy } from './locators';

/**
 * No Match - throws Exception
 * 1 Match - returns the element
 * 1+ match - throws execption
 * @param target
 */
export const findElement = async (
  target: FindBy,
  scope: HTMLElement | BoundFunctions<typeof queries> = screen,
) => {
  try {
    const locatorType = target.by;
    const value = target.value;
    const options = target.options;

    switch (locatorType) {
      case 'text':
        return asRootElement(scope).findByText(value, options);

      case 'testId':
        return asRootElement(scope).findByTestId(value, options);

      case 'labelText':
        return asRootElement(scope).findByLabelText(value, options);

      case 'role':
        return asRootElement(scope).findByRole(value, options);

      default:
        throw Error(`${locatorType} is not a valid Selector type`);
    }
  } catch (error) {
    throw Error(
      `Cannot find Element By '${target.by.toUpperCase()}' with value '${
        target.value
      }' and options ${JSON.stringify(target.options)}. ${error}`,
    );
  }
};

/**
 * 1 Match - returns the element
 * 1+ match - throws execption
 * To be used if the Page/Elements are already rendered and await not required
 * @param target
 */
export const getElement = (
  target: FindBy,
  scope: HTMLElement | BoundFunctions<typeof queries> = screen,
): HTMLElement => {
  try {
    const locatorType = target.by;
    const value = target.value;
    const options = target.options;

    switch (locatorType) {
      case 'text':
        return asRootElement(scope).getByText(value, options);

      case 'testId':
        return asRootElement(scope).getByTestId(value, options);

      case 'labelText':
        return asRootElement(scope).getByLabelText(value, options);

      case 'role':
        return asRootElement(scope).getByRole(value, options);

      default:
        throw new Error(`${locatorType} is not a valid Selector type`);
    }
  } catch (error) {
    throw new Error(
      `Cannot find Element By '${target.by.toUpperCase()}' with value '${
        target.value
      }' and options ${JSON.stringify(target.options)}. ${error}`,
    );
  }
};

/**
 * No Match - returns null
 * 1 Match - returns the element
 * 1+ match - throws execption
 * To be used while asserting presence/disappearance of elements inside wait methods
 * @param target
 */
export const queryElement = (
  target: FindBy,
  scope: HTMLElement | BoundFunctions<typeof queries> = screen,
): HTMLElement | null => {
  const locatorType = target.by;
  const value = target.value;
  const options = target.options;

  switch (locatorType) {
    case 'text':
      return asRootElement(scope).queryByText(value, options);

    case 'testId':
      return asRootElement(scope).queryByTestId(value, options);

    case 'labelText':
      return asRootElement(scope).queryByLabelText(value, options);

    case 'role':
      return asRootElement(scope).queryByRole(value, options);

    default:
      throw new Error(`${locatorType} is not a valid Selector type`);
  }
};

export const queryElements = (target: FindBy): HTMLElement[] => {
  const locatorType = target.by;
  const value = target.value;
  const options = target.options;

  switch (locatorType) {
    case 'text':
      return screen.queryAllByText(value, options);

    case 'testId':
      return screen.queryAllByTestId(value, options);

    case 'labelText':
      return screen.queryAllByLabelText(value, options);

    case 'role':
      return screen.queryAllByRole(value, options);

    default:
      throw new Error(`${locatorType} is not a valid Selector type`);
  }
};

const asRootElement = (
  target: HTMLElement | BoundFunctions<typeof queries>,
): BoundFunctions<typeof queries> =>
  target instanceof HTMLElement ? within(target) : target;
