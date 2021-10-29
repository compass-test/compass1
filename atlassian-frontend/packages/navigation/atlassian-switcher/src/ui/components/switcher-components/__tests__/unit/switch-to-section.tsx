import React from 'react';
import SettingsGlyph from '@atlaskit/icon/glyph/settings';
import { mount } from 'enzyme';
import { SwitchToSection } from '../../switch-to-section';
import { SectionWithLinkItem } from '../../../../primitives';
import { IntlProvider } from 'react-intl';
import { AnalyticsListener, UIAnalyticsEvent } from '@atlaskit/analytics-next';
import createStream from '../../../../../../test-helpers/stream';
import { createIcon } from '../../../../../common/utils/icon-themes';

const TEST_ATTRS = {
  switcherStartLink: '[data-testid="section-title__link"]',
};

describe('SwitchToSection', () => {
  // Define setup + expectations based on showStartLink
  [
    {
      showStartLink: false,
      expected: {
        TitleComponent: SectionWithLinkItem,
        titleText: 'Switch to',
      },
    },
    {
      showStartLink: true,
      expected: {
        TitleComponent: SectionWithLinkItem,
        titleText: 'Switch to',
        startLinkText: 'Atlassian Start',
      },
    },
  ].forEach(({ showStartLink, expected }) => {
    const PRECEDING_EVENTS = 1;
    it(`should render with expected title "${expected.titleText}" when showStartLink is ${showStartLink}`, async () => {
      const eventStream = createStream<UIAnalyticsEvent>();
      const wrapper = mount(
        <AnalyticsListener channel="*" onEvent={eventStream}>
          <IntlProvider locale="en">
            <SwitchToSection
              adminLinks={[]}
              appearance="drawer"
              fixedLinks={[
                {
                  key: 'admin',
                  label: 'Administration',
                  Icon: createIcon(SettingsGlyph, { size: 'medium' }),
                  href: 'http://admin.atlassian.com',
                },
              ]}
              licensedProductLinks={[]}
              onDiscoverMoreClicked={jest.fn()}
              showStartLink={showStartLink}
              getExtendedAnalyticsAttributes={() => ({})}
            />
          </IntlProvider>
        </AnalyticsListener>,
      );
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.find(expected.TitleComponent)).toHaveLength(1);
      expect(wrapper.find(expected.TitleComponent).find('h1').text()).toEqual(
        expected.titleText,
      );

      // Test analytics if showStartLink is true
      if (showStartLink) {
        eventStream.skip(PRECEDING_EVENTS);
        const switcherStartLink = wrapper.find(TEST_ATTRS.switcherStartLink);
        expect(switcherStartLink.hostNodes().text()).toEqual(
          expected.startLinkText,
        );
        switcherStartLink.hostNodes().simulate('click');
        const { payload } = await eventStream.next();
        expect(payload).toEqual({
          action: 'clicked',
          actionSubject: 'atlassianSwitcherItem',
          eventType: 'ui',
        });
      } else {
        expect(wrapper.find(TEST_ATTRS.switcherStartLink)).toHaveLength(0);
      }
    });
  });
});
