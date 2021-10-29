import React from 'react';
import { IntlProvider } from 'react-intl';
import { mount } from 'enzyme';

import { fireUIAnalytics } from '@atlassian/analytics-bridge';
import Button from '@atlaskit/button';
import ArrowRightIcon from '@atlaskit/icon/glyph/arrow-right';

import NavigationCard from '../../ui/home-section/navigation-card';
import {
  CardTitle,
  CardDescription,
} from '../../ui/home-section/navigation-card/styled';

jest.mock('@atlassian/analytics-bridge', () => ({
  ...jest.requireActual<Object>('@atlassian/analytics-bridge'),
  fireUIAnalytics: jest.fn(),
}));

describe('home section navigation card', () => {
  const onClickMock = jest.fn();

  const mountNavigationCard = (link?: string) => {
    return mount(
      <IntlProvider locale="en">
        <NavigationCard
          onClick={onClickMock}
          icon={<ArrowRightIcon label="some label" />}
          title="some title"
          description="some description"
          cardId="some-id"
          link={link}
        />
      </IntlProvider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should contain a title, subtitle and an icon', () => {
    const wrapper = mountNavigationCard();

    expect(wrapper.find(CardTitle).text()).toEqual('some title');
    expect(wrapper.find(CardDescription).text()).toEqual('some description');
    expect(wrapper.find(ArrowRightIcon)).toHaveLength(1);
    expect(wrapper.find(ArrowRightIcon).prop('label')).toBe('some label');
  });

  it('should call onClick when the card is clicked', () => {
    const card = mountNavigationCard();

    card.find(Button).simulate('click');

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it('should not call onClick when the card is clicked using non-primary button', () => {
    const card = mountNavigationCard();

    card.find(Button).simulate('auxclick');

    expect(onClickMock).not.toHaveBeenCalled();
  });

  it('should pass the link as the button href with target _blank', () => {
    const akButton = mountNavigationCard('https://some-link.com').find(Button);

    expect(akButton.prop('href')).toEqual('https://some-link.com');
    expect(akButton.prop('target')).toEqual('_blank');
  });

  it('should fire a UI event when the card is clicked', () => {
    const card = mountNavigationCard();

    card.find(Button).simulate('click');

    expect(fireUIAnalytics).toHaveBeenCalledTimes(1);
    expect(fireUIAnalytics).toHaveBeenCalledWith(
      expect.anything(),
      'jsmGettingStartedPanelHomeSectionNavigationCard',
      { cardId: 'some-id' },
    );
  });

  it('should not fire a UI event when a card without a link is clicked using non-primary button', () => {
    const card = mountNavigationCard();

    card.find(Button).simulate('auxclick');

    expect(fireUIAnalytics).not.toHaveBeenCalled();
  });

  it('should fire a UI event when a card with a link is clicked using non-primary button', () => {
    const card = mountNavigationCard('https://some-link.com');

    card.find(Button).simulate('auxclick');

    expect(fireUIAnalytics).toHaveBeenCalledTimes(1);
    expect(fireUIAnalytics).toHaveBeenCalledWith(
      expect.anything(),
      'jsmGettingStartedPanelHomeSectionNavigationCard',
      { cardId: 'some-id' },
    );
  });
});
