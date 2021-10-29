import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import { fireUIAnalytics } from '@atlassian/analytics-bridge';
import { AccordionItemLink } from '@atlassiansox/checklist';

import PanelFooter from '../../ui/panel-footer';

jest.mock('@atlassian/analytics-bridge', () => ({
  fireUIAnalytics: jest.fn(),
}));

describe('PanelFooter', () => {
  const onExitQuickStart = jest.fn();

  const mountPanelFooter = () =>
    mount(
      <IntlProvider locale="en">
        <PanelFooter onExitQuickStart={onExitQuickStart} />
      </IntlProvider>,
    );

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render exit your coach button', () => {
    const wrapper = mountPanelFooter();
    const exitButton = wrapper.find(AccordionItemLink);

    expect(exitButton.exists()).toBe(true);
    expect(exitButton.text()).toEqual('Exit Your Coach');
  });

  it('should fire UI analytics event and call onExitQuickStart when button clicked', () => {
    const wrapper = mountPanelFooter();
    const exitButton = wrapper.find(AccordionItemLink);
    exitButton.simulate('click');

    expect(fireUIAnalytics).toHaveBeenCalledTimes(1);
    expect(fireUIAnalytics).toHaveBeenCalledWith(
      expect.objectContaining({
        payload: expect.objectContaining({
          action: 'clicked',
          actionSubject: 'button',
        }),
      }),
      'jsmGettingStartedPanelExitQuickStartButton',
    );
    expect(onExitQuickStart).toHaveBeenCalledTimes(1);
  });
});
