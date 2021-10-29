import React from 'react';
import { mount } from 'enzyme';
import Button from '@atlaskit/button/custom-theme-button';
import { ErrorState } from '../../components/ErrorState';
import { DescriptionContainer, ErrorStateTitleContainer } from '../../styled';
import { Errors, AnalyticsWebClient } from '../../types';
import { AnalyticsProvider } from '../../index';
import messages from '../../messages';

import { IntlProvider } from 'react-intl';

const intlProvider = new IntlProvider({ locale: 'en' });
const { intl } = intlProvider.getChildContext();
const emptyTitle = intl.formatMessage(messages.emptyTitle);
const emptyDescription = intl.formatMessage(messages.emptyDescription);

describe('<ErrorState />', () => {
  let mockAnalyticsWebClient: AnalyticsWebClient;
  beforeEach(() => {
    mockAnalyticsWebClient = {
      sendUIEvent: jest.fn(),
      sendOperationalEvent: jest.fn(),
      sendScreenEvent: jest.fn(),
      sendTrackEvent: jest.fn(),
    };
  });

  test('should render a disabled button when readOnly props is passed', () => {
    const wrapper = mount(
      <IntlProvider locale="en-US" messages={messages}>
        <AnalyticsProvider analyticsClient={mockAnalyticsWebClient}>
          <ErrorState type={Errors.Empty} readOnly />
        </AnalyticsProvider>
      </IntlProvider>,
    );
    expect(wrapper.find(ErrorStateTitleContainer).text()).toEqual(emptyTitle);
    expect(wrapper.find(DescriptionContainer).render().text()).toEqual(
      emptyDescription,
    );
    expect(wrapper.find(Button).prop('isDisabled')).toEqual(true);

    expect(mockAnalyticsWebClient.sendOperationalEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        action: 'emptyStateShown',
        actionSubject: 'confluencePageTree',
        attributes: expect.objectContaining({
          readOnly: true,
        }),
      }),
    );
  });

  test('should render button with create page link when state is empty', () => {
    const wrapper = mount(
      <IntlProvider locale="en-US" messages={messages}>
        <AnalyticsProvider analyticsClient={mockAnalyticsWebClient}>
          <ErrorState type={Errors.Empty} spaceKey="AAA" />
        </AnalyticsProvider>
      </IntlProvider>,
    );

    expect(wrapper.find(Button).props()).toMatchObject({
      href:
        '/wiki/spaces/AAA/overview?createDialog=true&createDialogSpaceKey=AAA',
      isDisabled: false,
    });

    expect(mockAnalyticsWebClient.sendOperationalEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        action: 'emptyStateShown',
        actionSubject: 'confluencePageTree',
        attributes: expect.objectContaining({
          readOnly: false,
        }),
      }),
    );

    wrapper.find(Button).simulate('click');
    expect(mockAnalyticsWebClient.sendUIEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        action: 'clicked',
        actionSubject: 'button',
        actionSubjectId: 'confluencePageTreeEmptyStateCreateButton',
      }),
    );
  });

  test('should render error state when state is error', () => {
    const wrapper = mount(
      <IntlProvider locale="en-US" messages={messages}>
        <AnalyticsProvider analyticsClient={mockAnalyticsWebClient}>
          <ErrorState type={Errors.Error} />
        </AnalyticsProvider>
      </IntlProvider>,
    );

    expect(wrapper.find(ErrorStateTitleContainer).text()).toEqual(
      messages.errorTitle.defaultMessage,
    );
    expect(wrapper.find(DescriptionContainer).render().text()).toEqual(
      messages.errorDescription.defaultMessage,
    );
    expect(wrapper.find(Button).exists()).toEqual(false);
    expect(mockAnalyticsWebClient.sendOperationalEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        action: 'errorStateShown',
        actionSubject: 'confluencePageTree',
      }),
    );
  });
});
