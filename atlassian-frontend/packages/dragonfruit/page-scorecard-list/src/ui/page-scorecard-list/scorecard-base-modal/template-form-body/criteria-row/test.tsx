import React from 'react';

import { act, fireEvent, render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DiProvider, injectable } from 'react-magnetic-di';

import { OptionType } from '@atlaskit/select';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import {
  AvailableFieldsProvider,
  useAvailableFields,
} from '../../../../../controllers/available-fields';

import CriteriaRow from './main';

describe('CriteriaRow', () => {
  describe('with no passed down props', () => {
    let result: RenderResult;

    const handleDelete = jest.fn((string) => string);

    beforeEach(() => {
      result = render(
        <CompassTestProvider locale="en">
          <AvailableFieldsProvider>
            <CriteriaRow
              id={'temp'}
              onChange={(value) => value}
              onDelete={handleDelete}
              testId="fake-row"
            />
          </AvailableFieldsProvider>
        </CompassTestProvider>,
      );
    });

    it('should render the weight as 0', () => {
      const weightSetterTestId = 'fake-row.weight-setter';

      const readViewEditorTestId = `read-view-${weightSetterTestId}.editor`;

      const weightSetterEditor = result.getByTestId(readViewEditorTestId);

      expect(weightSetterEditor).toBeInTheDocument();
      expect(weightSetterEditor!.innerText).toEqual('0');
    });

    it('should render the fields select without an option', async () => {
      /**
       * The Select in CriteriaRow component has two props used for testing:
       * className="criteria-row", classNamePrefix='fields'
       * They are used to calculate the classes of elements in this test case
       */
      const container = document.querySelector('div.criteria-row');
      expect(container!.textContent).toEqual('Select criterion');

      const valueContainer = document.querySelector(
        'div.fields__value-container',
      );

      // Open the Select dropdown
      act(() => {
        userEvent.click(valueContainer!);
      });

      // Select the second option
      const allOptions = document.querySelectorAll('div.fields__option');
      const optionToSelect = allOptions[1];
      act(() => {
        userEvent.click(optionToSelect!);
      });

      // Get the selected option
      const selectedOption = await document.querySelector(
        'div.fields__single-value',
      );
      expect(selectedOption!.textContent).toEqual(optionToSelect.textContent);
    });
  });

  describe('with passed down props', () => {
    let result: RenderResult;

    const weightSetterTestId = 'fake-row.weight-setter';
    const readViewEditorTestId = `read-view-${weightSetterTestId}.editor`;
    const editViewEditorTestId = `${weightSetterTestId}.editor`;

    const handleOnChange = jest.fn((value) => value);
    const handleDelete = jest.fn((string) => string);

    const handleClaimField = jest.fn(
      (oldValue, newValue) => `${oldValue} ${newValue}`,
    );

    const fields: OptionType[] = [
      { label: 'Foo', value: 'foo' },
      { label: 'Bar', value: 'bar' },
      { label: 'Moo', value: 'moo' },
    ];

    const useAvailableFieldsMock: () => [
      { fields: OptionType[] },
      {
        claimField: (
          oldField: string | null | undefined,
          newField: string | null | undefined,
        ) => void;
      },
    ] = () => [
      { fields },

      {
        claimField: handleClaimField,
      },
    ];

    const useAvailableFieldsDI = injectable(
      useAvailableFields,
      useAvailableFieldsMock,
    );

    beforeEach(() => {
      jest.resetAllMocks();

      result = render(
        <DiProvider use={[useAvailableFieldsDI]}>
          <CompassTestProvider locale="en">
            <AvailableFieldsProvider>
              <CriteriaRow
                onChange={handleOnChange}
                onDelete={handleDelete}
                testId="fake-row"
                weight="66"
                field="OWNER"
                id="fake-uuid"
              />
            </AvailableFieldsProvider>
          </CompassTestProvider>
          ,
        </DiProvider>,
      );
    });

    it('should render the right weight', () => {
      const weightSetterEditor = result.getByTestId(readViewEditorTestId);

      expect(weightSetterEditor).toBeInTheDocument();
      expect(weightSetterEditor!.innerText).toEqual('66');
    });

    it('should render the fields select without an option', async () => {
      const selectedOption = await document.querySelector(
        'div.fields__single-value',
      );
      expect(selectedOption!.textContent).toEqual('Owner');
    });

    it('should trigger the onChange callback with correct values after change field', async () => {
      const valueContainer = document.querySelector(
        'div.fields__value-container',
      );

      // Open the Select dropdown
      act(() => {
        userEvent.click(valueContainer!);
      });

      // Select the second option
      const allOptions = document.querySelectorAll('div.fields__option');

      // Select the Documentation option
      const optionToSelect = allOptions[0];
      act(() => {
        userEvent.click(optionToSelect!);
      });

      expect(handleOnChange).toHaveBeenCalledTimes(2);
      expect(handleOnChange).toHaveBeenCalledWith({
        field: 'foo',
        id: 'fake-uuid',
        weight: '66',
      });
    });

    it('should trigger the cliamField callback with correct values after change field', async () => {
      const valueContainer = document.querySelector(
        'div.fields__value-container',
      );

      // Open the Select dropdown
      act(() => {
        userEvent.click(valueContainer!);
      });

      // Select the second option
      const allOptions = document.querySelectorAll('div.fields__option');

      // Select the Documentation option
      const optionToSelect = allOptions[0];
      act(() => {
        userEvent.click(optionToSelect!);
      });

      expect(handleClaimField).toHaveBeenCalledTimes(1);

      expect(handleClaimField).toHaveBeenCalledWith('OWNER', 'foo');
    });

    it('should trigger the onChange callback with correct values after change weight', async () => {
      const readViewEditor = result.getByTestId(readViewEditorTestId);

      fireEvent.click(readViewEditor!);

      const editViewEditor = result.getByTestId(editViewEditorTestId);
      fireEvent.change(editViewEditor, { target: { value: '88' } });
      fireEvent.submit(editViewEditor);
      expect(
        await result.getByTestId(readViewEditorTestId).textContent,
      ).toEqual('88');

      expect(handleOnChange).toHaveBeenCalledTimes(2);
      expect(handleOnChange).toHaveBeenCalledWith({
        field: 'OWNER',
        id: 'fake-uuid',
        weight: '88',
      });
    });

    describe('onDelete', async () => {
      it('should claimField', async () => {
        const dropDownMenu = result.getByTestId('fake-row.actions.menu');
        act(() => {
          userEvent.click(dropDownMenu!);
        });

        const deleteButton = result.getByTestId('fake-row.actions.delete');
        act(() => {
          userEvent.click(deleteButton!);
        });

        expect(handleDelete).toHaveBeenCalledTimes(1);

        expect(handleClaimField).toHaveBeenCalledTimes(1);
        expect(handleClaimField).toHaveBeenCalledWith('OWNER', null);
      });
    });
  });
});
