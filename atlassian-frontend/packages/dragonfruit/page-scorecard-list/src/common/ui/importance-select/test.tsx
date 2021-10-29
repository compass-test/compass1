import React from 'react';

import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import ImportanceSelect from './index';

const CLASS_NAME_PREFIX = 'dragonfruit-importance-select';

describe('ImportanceSelect', () => {
  enum Options {
    REQUIRED,
    RECOMMENDED,
    USER_DEFINED,
  }

  const handleChange = jest.fn();

  describe('when user is an administrator', () => {
    it('scorecard form should display REQUIRED as an option for scorecard importance', () => {
      render(
        <CompassTestProvider locale="en">
          <ImportanceSelect onChange={handleChange} isAdmin={true} />
        </CompassTestProvider>,
      );

      // Open dropdown menu
      const valueContainer = document.querySelector(
        `.${CLASS_NAME_PREFIX}__value-container`,
      );

      act(() => {
        userEvent.click(valueContainer!);
      });

      const allOptions = document.querySelectorAll(
        `.${CLASS_NAME_PREFIX}__option`,
      );
      const firstOption = allOptions[Options.REQUIRED];
      expect(firstOption.textContent).toContain('Required');
    });
  });

  describe('when user is not an administrator', () => {
    it('scorecard form should not display REQUIRED as an option for scorecard importance', () => {
      render(
        <CompassTestProvider locale="en">
          <ImportanceSelect onChange={handleChange} isAdmin={false} />
        </CompassTestProvider>,
      );
      // Open dropdown menu
      const valueContainer = document.querySelector(
        `.${CLASS_NAME_PREFIX}__value-container`,
      );

      act(() => {
        userEvent.click(valueContainer!);
      });

      const allOptions = document.querySelectorAll(
        `.${CLASS_NAME_PREFIX}__option`,
      );
      const firstOption = allOptions[Options.REQUIRED];
      expect(firstOption.textContent).not.toContain('Required');
    });
  });
  it('selecting values invokes onChange callback and changes value displayed', async () => {
    render(
      <CompassTestProvider locale="en">
        <ImportanceSelect onChange={handleChange} isAdmin={true} />
      </CompassTestProvider>,
    );

    // Open dropdown menu
    const valueContainer = document.querySelector(
      `.${CLASS_NAME_PREFIX}__value-container`,
    );

    act(() => {
      userEvent.click(valueContainer!);
    });

    // Select the recommended option
    const allOptions = document.querySelectorAll(
      `.${CLASS_NAME_PREFIX}__option`,
    );

    const optionToSelect = allOptions[Options.RECOMMENDED];

    act(() => {
      userEvent.click(optionToSelect!);
    });

    // Check for selected option
    const selectedValue = await document.querySelector(
      `.${CLASS_NAME_PREFIX}__single-value`,
    );

    expect(selectedValue!.textContent).toContain('Recommended');
    expect(handleChange).toHaveBeenCalled();
  });
});
