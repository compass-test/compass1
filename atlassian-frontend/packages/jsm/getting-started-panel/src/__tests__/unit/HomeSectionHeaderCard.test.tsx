import React from 'react';
import { IntlProvider } from 'react-intl';
import { mount } from 'enzyme';

import { fireUIAnalytics } from '@atlassian/analytics-bridge';
import Button from '@atlaskit/button';
import MediaServicesFitToPageIcon from '@atlaskit/icon/glyph/media-services/fit-to-page';

import HeaderCardWithIntl from '../../ui/home-section/header-card';
import { Heading } from '../../ui/home-section/header-card/styled';
import RocketSvg from '../../common/ui/avatar/assets/Rocket';

jest.mock('@atlassian/analytics-bridge', () => ({
  ...jest.requireActual<Object>('@atlassian/analytics-bridge'),
  fireUIAnalytics: jest.fn(),
}));

describe('home section header card', () => {
  const onCloseMock = jest.fn();

  const mountHeaderCard = () => {
    return mount(
      <IntlProvider locale="en">
        <HeaderCardWithIntl onClose={onCloseMock} />
      </IntlProvider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should contain a title, minimize button and rocket background', () => {
    const wrapper = mountHeaderCard();

    expect(wrapper.find(Heading).text()).toEqual('Your Coach');
    expect(wrapper.find(MediaServicesFitToPageIcon)).toHaveLength(1);
    expect(wrapper.find(RocketSvg)).toHaveLength(1);
  });

  it('should call onClose when the minimize button is clicked', () => {
    const button = mountHeaderCard()
      .find(Button)
      .filterWhere((b) => b.find(MediaServicesFitToPageIcon).exists());

    button.prop('onClick')();

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('should fire a minimize UI event when the minimize button is clicked', () => {
    const button = mountHeaderCard()
      .find(Button)
      .filterWhere((b) => b.find(MediaServicesFitToPageIcon).exists());

    button.prop('onClick')();

    expect(fireUIAnalytics).toHaveBeenCalledTimes(1);
    expect(fireUIAnalytics).toHaveBeenCalledWith(
      // undefined because a click with enzyme does not set the event
      // object as a regular browser would.
      undefined,
      'jsmGettingStartedPanelCloseButton',
    );
  });
});
