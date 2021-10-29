import React from 'react';

import { fireEvent, render, RenderResult } from '@testing-library/react';

import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import Actions from './main';

describe('Actions', () => {
  let result: RenderResult;
  let menu: HTMLElement | null;

  const handleDelete = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();

    result = render(
      <CompassTestProvider locale="en">
        <Actions
          onDelete={handleDelete}
          testId="dragonfruit-scorecard-templates.criteria-row.actions"
        />
      </CompassTestProvider>,
    );

    menu = result.getByTestId(
      'dragonfruit-scorecard-templates.criteria-row.actions.menu',
    );
  });

  it('should render the actions menu', () => {
    expect(menu).toBeInTheDocument();
  });

  it('should render the Delete action in the dropdown menu', () => {
    fireEvent.click(menu!);

    const deleteAction = result.getByTestId(
      'dragonfruit-scorecard-templates.criteria-row.actions.delete',
    );
    expect(deleteAction).toBeInTheDocument();
    expect(deleteAction.textContent).toEqual('Remove');
  });

  it('clicking the Delete action should trigger the deleting function', () => {
    fireEvent.click(menu!);

    const deleteAction = result.getByTestId(
      'dragonfruit-scorecard-templates.criteria-row.actions.delete',
    );

    fireEvent.click(deleteAction);

    expect(handleDelete).toHaveBeenCalledTimes(1);
  });
});
