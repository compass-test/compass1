import React from 'react';

import { render, RenderResult } from '@testing-library/react';
import userEvents from '@testing-library/user-event';

import { AnalyticsListener } from '@atlassian/mpt-analytics';

import { AnalyticsLink } from '../../AnalyticsLink';

describe('<AnalyticsLink />', () => {
  let onClick: jest.Mock;
  let createUIEvent: jest.Mock;
  let renderResult: RenderResult;

  beforeEach(() => {
    onClick = jest.fn();
    createUIEvent = jest.fn();
  });

  it('should fires analytic event on click when analyticsId is defined', () => {
    renderResult = render(
      <AnalyticsListener
        createScreenEvent={jest.fn()}
        createTrackEvent={jest.fn()}
        createUIEvent={createUIEvent}
        fallbackSourceScreen="DefaultScreen"
      >
        <AnalyticsLink
          analyticsId="fakeId"
          href="http://example.com"
          testId="link"
          onClick={onClick}
        >
          Open page
        </AnalyticsLink>
      </AnalyticsListener>,
    );
    userEvents.click(renderResult.getByTestId('link'));

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(createUIEvent).toHaveBeenCalledTimes(1);
    expect(createUIEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        action: 'clicked',
        actionSubject: 'button',
        actionSubjectId: 'fakeId',
      }),
    );
  });

  it('should not fires analytic event on click when analyticsId is undefined', () => {
    renderResult = render(
      <AnalyticsListener
        createScreenEvent={jest.fn()}
        createTrackEvent={jest.fn()}
        createUIEvent={createUIEvent}
        fallbackSourceScreen="DefaultScreen"
      >
        <AnalyticsLink
          href="http://example.com"
          testId="link"
          onClick={onClick}
        >
          Open page
        </AnalyticsLink>
      </AnalyticsListener>,
    );
    userEvents.click(renderResult.getByTestId('link'));

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(createUIEvent).toHaveBeenCalledTimes(0);
  });
});
