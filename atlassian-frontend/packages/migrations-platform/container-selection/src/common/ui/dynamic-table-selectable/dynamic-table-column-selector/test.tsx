import React from 'react';

import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AnalyticsListener } from '@atlassian/mpt-analytics';

import { DynamicTableColumnSelectorMultipleProjects } from './examples';

describe('<PlanSelectionTable />', () => {
  let spyScreenEvent: jest.Mock;
  let spyTrackEvent: jest.Mock;
  let spyUIEvent: jest.Mock;
  let renderResult: RenderResult;

  beforeEach(() => {
    spyScreenEvent = jest.fn();
    spyTrackEvent = jest.fn();
    spyUIEvent = jest.fn();
    renderResult = render(
      <AnalyticsListener
        createScreenEvent={spyScreenEvent}
        createTrackEvent={spyTrackEvent}
        createUIEvent={spyUIEvent}
        fallbackSourceScreen="PageB"
      >
        <DynamicTableColumnSelectorMultipleProjects />,
      </AnalyticsListener>,
    );
  });

  it('should fire an analytics event when all on current page selected', () => {
    userEvent.click(renderResult.getByTestId('table-selector-dropdown-icon'));
    userEvent.click(renderResult.getByTestId('selector-dropdown-current-page'));

    expect(spyScreenEvent).toBeCalledTimes(0);
    expect(spyTrackEvent).toBeCalledTimes(0);
    expect(spyUIEvent).toBeCalledTimes(1);
    expect(spyUIEvent).toBeCalledWith(
      expect.objectContaining({
        eventType: 'UI',
        action: 'Clicked',
        actionSubject: 'Button',
        actionSubjectId: 'SelectAllOnCurrentPage',
      }),
    );
  });

  it('should fire an analytics event when all selected', () => {
    userEvent.click(renderResult.getByTestId('table-selector-dropdown-icon'));
    userEvent.click(renderResult.getByTestId('selector-dropdown-all'));

    expect(spyScreenEvent).toBeCalledTimes(0);
    expect(spyTrackEvent).toBeCalledTimes(0);
    expect(spyUIEvent).toBeCalledTimes(1);
    expect(spyUIEvent).toBeCalledWith(
      expect.objectContaining({
        eventType: 'UI',
        action: 'Clicked',
        actionSubject: 'Button',
        actionSubjectId: 'SelectAll',
      }),
    );
  });

  it('should fire an analytics event when clear selected', () => {
    userEvent.click(renderResult.getByTestId('table-selector-dropdown-icon'));
    userEvent.click(renderResult.getByTestId('selector-dropdown-clear-all'));

    expect(spyScreenEvent).toBeCalledTimes(0);
    expect(spyTrackEvent).toBeCalledTimes(0);
    expect(spyUIEvent).toBeCalledTimes(1);
    expect(spyUIEvent).toBeCalledWith(
      expect.objectContaining({
        eventType: 'UI',
        action: 'Clicked',
        actionSubject: 'Button',
        actionSubjectId: 'ClearAllSelection',
      }),
    );
  });
});
