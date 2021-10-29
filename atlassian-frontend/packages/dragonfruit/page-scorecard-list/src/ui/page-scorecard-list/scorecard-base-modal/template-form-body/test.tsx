import React from 'react';

import { act, render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DiProvider, injectable } from 'react-magnetic-di';

import { OptionType } from '@atlaskit/select';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import {
  AvailableFieldsProvider,
  useAvailableFields,
} from '../../../../controllers/available-fields';
import { useCriteriaController } from '../../../../controllers/criteria-controller';
import { mockExistingCriteriaList } from '../../../../controllers/criteria-controller/mocks';
import { Criteria } from '../../../../controllers/criteria-controller/types';

import TemplateFormBody from './main';

describe('AddCriteriaAction', () => {
  let useCriteriaControllerDI: Function;

  beforeEach(() => {
    const expected = mockExistingCriteriaList;
    const addCriteria = jest.fn();
    const removeCriteria = jest.fn();
    const updateCriteria = jest.fn();

    const useCriteriaControllerMock: () => [
      { criteria: Criteria[] },
      {
        addCriteria: () => void;
        removeCriteria: (id?: string | null) => void;
        updateCriteria: (
          id?: string | null,
          weight?: string | null,
          field?: string | null,
        ) => void;
      },
    ] = () => [
      { criteria: expected },
      { addCriteria, removeCriteria, updateCriteria },
    ];

    useCriteriaControllerDI = injectable(
      useCriteriaController,
      useCriteriaControllerMock,
    );
  });

  it('should render the add criterion action when there is at least one field available', async () => {
    const claimField = jest.fn(
      (oldField, newField) => `${oldField}, ${newField}`,
    );

    const fakeFields = [
      { label: 'fake-field-1', value: 'fake-field-1' },
      { label: 'fake-field-2', value: 'fake-field-2' },
      { label: 'fake-field-3', value: 'fake-field-3' },
    ];

    const useAvailableFieldsMock: () => [
      { fields: OptionType[] },
      {
        claimField: (
          oldField: string | null | undefined,
          newField: string | null | undefined,
        ) => void;
      },
    ] = () => [{ fields: fakeFields }, { claimField }];

    const useAvailableFieldsDI = injectable(
      useAvailableFields,
      useAvailableFieldsMock,
    );

    const result = render(
      <DiProvider use={[useAvailableFieldsDI, useCriteriaControllerDI]}>
        <CompassTestProvider locale="en">
          <TemplateFormBody testId="dragonfruit-scorecard-templates.fake-form" />
        </CompassTestProvider>
        ,
      </DiProvider>,
    );

    const addCriteriaAction = await result.getByTestId(
      'dragonfruit-scorecard-templates.fake-form.add-criteria.add-criteria-link',
    );
    expect(addCriteriaAction).toBeInTheDocument();
    expect(addCriteriaAction!.innerText).toEqual('Add criterion');
  });

  it('should not render the add criterion action when there are no fields available', async () => {
    const claimField = jest.fn(
      (oldField, newField) => `${oldField}, ${newField}`,
    );

    const useAvailableFieldsMock: () => [
      { fields: OptionType[] },
      {
        claimField: (
          oldField: string | null | undefined,
          newField: string | null | undefined,
        ) => void;
      },
    ] = () => [{ fields: [] }, { claimField }];

    const useAvailableFieldsDI = injectable(
      useAvailableFields,
      useAvailableFieldsMock,
    );

    const result = render(
      <DiProvider use={[useAvailableFieldsDI, useCriteriaControllerDI]}>
        <CompassTestProvider locale="en">
          <TemplateFormBody testId="dragonfruit-scorecard-templates.fake-form" />
        </CompassTestProvider>
        ,
      </DiProvider>,
    );

    const addCriteriaAction = await result.queryByTestId(
      'dragonfruit-scorecard-templates.fake-form.add-criteria.add-criteria-link',
    );
    expect(addCriteriaAction).toBeNull();
  });
});

describe('TemplateFormBody with criteria', () => {
  let useCriteriaControllerDI: Function;
  let result: RenderResult;

  const expected = mockExistingCriteriaList;
  const addCriteria = jest.fn();
  const removeCriteria = jest.fn();
  const updateCriteria = jest.fn();

  const useCriteriaControllerMock: () => [
    { criteria: Criteria[] },
    {
      addCriteria: () => void;
      removeCriteria: (id?: string | null) => void;
      updateCriteria: (
        id?: string | null,
        weight?: string | null,
        field?: string | null,
      ) => void;
    },
  ] = () => [
    { criteria: expected },
    { addCriteria, removeCriteria, updateCriteria },
  ];

  useCriteriaControllerDI = injectable(
    useCriteriaController,
    useCriteriaControllerMock,
  );

  beforeEach(() => {
    jest.resetAllMocks();

    result = render(
      <DiProvider use={[useCriteriaControllerDI]}>
        <CompassTestProvider>
          <AvailableFieldsProvider>
            <TemplateFormBody testId="dragonfruit-scorecard-templates.fake-form" />
          </AvailableFieldsProvider>
        </CompassTestProvider>
        ,
      </DiProvider>,
    );
  });

  it('should render the add criterion action', () => {
    const addCriteriaAction = result.getByTestId(
      'dragonfruit-scorecard-templates.fake-form.add-criteria.add-criteria-link',
    );

    expect(addCriteriaAction).toBeInTheDocument();
  });

  it('should render the criteria rows', () => {
    const criteriaRows = result.getAllByTestId(
      'dragonfruit-scorecard-templates.fake-form.criteria-row',
    );

    expect(criteriaRows.length).toBe(2);

    const weightSetters = result.getAllByTestId(
      'read-view-dragonfruit-scorecard-templates.fake-form.criteria-row.weight-setter.editor',
    );

    expect(weightSetters[0].textContent).toBe('50');
    expect(weightSetters[1].textContent).toBe('50');
  });

  it('should invoke `addCriteria` when the add action is clicked', async () => {
    const addCriteriaAction = result.getByTestId(
      'dragonfruit-scorecard-templates.fake-form.add-criteria.add-criteria-link',
    );

    expect(addCriteriaAction).toBeInTheDocument();

    act(() => {
      userEvent.click(addCriteriaAction!);
    });

    expect(addCriteria).toHaveBeenCalledTimes(1);
  });

  it('should invoke `removeCriteria` with the appropriate `id` parameter when a row is deleted', async () => {
    const menus = result.getAllByTestId(
      'dragonfruit-scorecard-templates.fake-form.criteria-row.actions.menu',
    );
    const secondDropdownMenu = menus[1];

    act(() => {
      userEvent.click(secondDropdownMenu!);
    });

    const deleteButton = result.getByTestId(
      'dragonfruit-scorecard-templates.fake-form.criteria-row.actions.delete',
    );

    act(() => {
      userEvent.click(deleteButton!);
    });

    expect(removeCriteria).toHaveBeenCalledTimes(1);
    expect(removeCriteria).toHaveBeenCalledWith(expected[1].id);
  });
});

describe('TemplateFormBody empty state', () => {
  const addCriteria = jest.fn();
  const removeCriteria = jest.fn();
  const updateCriteria = jest.fn();

  const useCriteriaControllerMock: () => [
    { criteria: Criteria[] },
    {
      addCriteria: () => void;
      removeCriteria: (id?: string | null) => void;
      updateCriteria: (
        id?: string | null,
        weight?: string | null,
        field?: string | null,
      ) => void;
    },
  ] = () => [{ criteria: [] }, { addCriteria, removeCriteria, updateCriteria }];

  const useCriteriaControllerDI = injectable(
    useCriteriaController,
    useCriteriaControllerMock,
  );

  beforeEach(() => {
    jest.resetAllMocks();

    render(
      <DiProvider use={[useCriteriaControllerDI]}>
        <CompassTestProvider>
          <AvailableFieldsProvider>
            <TemplateFormBody testId="dragonfruit-scorecard-templates.fake-form" />
          </AvailableFieldsProvider>
        </CompassTestProvider>
        ,
      </DiProvider>,
    );
  });

  it('should invoke `addCriteria` to render an empty criteria row when form first renders', () => {
    expect(addCriteria).toHaveBeenCalledTimes(1);
  });
});
