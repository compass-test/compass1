import React from 'react';

import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import ComponentTypeSelect from './index';

const CLASS_NAME_PREFIX = 'dragonfruit-component-type-select';

describe('ComponentTypeSelect', () => {
  enum Options {
    SERVICE,
    API,
    LIBRARY,
    OTHER,
  }

  const handleChange = jest.fn();

  it('selecting values invokes onChange callback and changes value displayed', async () => {
    render(
      <CompassTestProvider>
        <ComponentTypeSelect onChange={handleChange} />
      </CompassTestProvider>,
    );

    // Open dropdown menu
    const valueContainer = document.querySelector(
      `.${CLASS_NAME_PREFIX}__value-container`,
    );

    act(() => {
      userEvent.click(valueContainer!);
    });

    // Select the library option
    const allOptions = document.querySelectorAll(
      `.${CLASS_NAME_PREFIX}__option`,
    );

    const optionToSelect = allOptions[Options.LIBRARY];

    act(() => {
      userEvent.click(optionToSelect!);
    });

    // Check for selected option
    const selectedValue = await document.querySelector(
      `.${CLASS_NAME_PREFIX}__single-value`,
    );

    expect(selectedValue!.textContent).toContain('Library');
    expect(handleChange).toHaveBeenCalled();
  });
});
