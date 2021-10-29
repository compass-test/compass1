import React from 'react';

import { fireEvent, render, RenderResult } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

import WeightSetter from './main';

describe('WeightSetter', () => {
  let result: RenderResult;
  let readViewEditor: HTMLElement | null;

  const handleEdit = jest.fn((value) => value);
  const weightSetterTestId =
    'dragonfruit-scorecard-templates.criteria-row.weight-setter';
  const readViewEditorTestId = `read-view-${weightSetterTestId}.editor`;
  const editViewEditorTestId = `${weightSetterTestId}.editor`;

  beforeEach(() => {
    jest.resetAllMocks();

    result = render(
      <IntlProvider locale="en">
        <WeightSetter
          value="66"
          onEdit={handleEdit}
          testId={weightSetterTestId}
        />
      </IntlProvider>,
    );

    readViewEditor = result.getByTestId(readViewEditorTestId);
  });

  it('should render the editor with the weight', () => {
    expect(readViewEditor).toBeInTheDocument();
    expect(readViewEditor!.innerText).toEqual('66');
  });

  it('should be able to open the weight editor ', async () => {
    fireEvent.click(readViewEditor!);

    const editViewEditor = result.getByTestId(editViewEditorTestId);

    expect(editViewEditor).toBeInTheDocument();
  });

  it('setting a new weight should trigger the editing function', async () => {
    fireEvent.click(readViewEditor!);

    const editViewEditor = result.getByTestId(editViewEditorTestId);

    fireEvent.change(editViewEditor, { target: { value: '88' } });
    fireEvent.submit(editViewEditor);

    await result.getByTestId(readViewEditorTestId);
    expect(handleEdit).toHaveBeenCalledWith('88');
    expect(handleEdit).toHaveBeenCalledTimes(1);
  });
});
