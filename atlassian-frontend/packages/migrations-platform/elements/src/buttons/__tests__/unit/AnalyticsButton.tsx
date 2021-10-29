import React from 'react';

import { render, RenderResult } from '@testing-library/react';
import userEvents from '@testing-library/user-event';

import { AnalyticsListener } from '@atlassian/mpt-analytics';

import AnalyticsButton from '../../AnalyticsButton';

describe('<AnalyticsButton />', () => {
  let createUIEvent: jest.Mock;
  let renderResult: RenderResult;

  beforeEach(() => {
    createUIEvent = jest.fn();
  });

  it('should fires button:clicked analytic event on click', () => {
    renderResult = render(
      <AnalyticsListener
        createScreenEvent={jest.fn()}
        createTrackEvent={jest.fn()}
        createUIEvent={createUIEvent}
        fallbackSourceScreen="DefaultScreen"
      >
        <AnalyticsButton analyticsId="FakeOpenButton">Open</AnalyticsButton>
      </AnalyticsListener>,
    );
    userEvents.click(renderResult.getByTestId('FakeOpenButton'));

    expect(createUIEvent).toBeCalledTimes(1);
    expect(createUIEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        eventType: 'UI',
        action: 'clicked',
        actionSubjectId: 'FakeOpenButton',
        actionSubject: 'button',
      }),
    );
  });

  it('should fires button:clicked analytic event on click a link', () => {
    renderResult = render(
      <AnalyticsListener
        createScreenEvent={jest.fn()}
        createTrackEvent={jest.fn()}
        createUIEvent={createUIEvent}
        fallbackSourceScreen="DefaultScreen"
      >
        <AnalyticsButton analyticsId="FakeOpenButton" analyticsLink>
          Open
        </AnalyticsButton>
      </AnalyticsListener>,
    );
    userEvents.click(renderResult.getByTestId('FakeOpenButton'));

    expect(createUIEvent).toBeCalledTimes(1);
    expect(createUIEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        eventType: 'UI',
        action: 'clicked',
        actionSubjectId: 'FakeOpenButton',
        actionSubject: 'link',
      }),
    );
  });
});
