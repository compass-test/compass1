import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import noop from 'lodash/noop';
import Button from '@atlaskit/button';
import { UrlDataProvider } from '../../common/ui/url-data';

import { Product } from '../../common/types';
import {
  fireUIAnalytics,
  FireScreenAnalytics,
} from '@atlassian/analytics-bridge';
import { getComponentTestId } from '../../common/util';
import ArrowRightIcon from '@atlaskit/icon/glyph/arrow-right';
import ShortcutIcon from '@atlaskit/icon/glyph/shortcut';

import HomeSection from '../../ui/home-section';
import { HeaderCard } from '../../ui/home-section/header-card';
import { NavigationCard } from '../../ui/home-section/navigation-card';
import { SectionContainer } from '../../ui/styled';
import { GspSectionKey } from '../../common/types';
import {
  mockGspState,
  mockOpsgenieBaseUrl,
  mockServiceDeskBaseUrl,
} from '../../common/mocks';
import {
  VisibilityContainer,
  VisibilityData,
} from '../../common/services/visibility';
import {
  mockVisibilityDataAllKeys,
  mockVisibilityDataOnlyOg,
} from '../../common/services/visibility/mocks';

jest.mock('@atlassian/analytics-bridge', () => ({
  ...jest.requireActual<Object>('@atlassian/analytics-bridge'),
  fireUIAnalytics: jest.fn(),
}));

describe('HomeSection', () => {
  describe.each([Product.Opsgenie, Product.ServiceDesk])(
    'when rendered in %s',
    (product) => {
      const mountHomeSection = (
        visibilityData: VisibilityData = mockVisibilityDataAllKeys,
      ) => {
        const gspState = {
          ...mockGspState,
          properties: {
            ...mockGspState.properties,
            user: {
              ...mockGspState.properties.user,
              ...visibilityData.user,
            },
            workspace: visibilityData.workspace,
          },
        };
        return mount(
          <IntlProvider locale="en">
            <VisibilityContainer
              gspState={gspState}
              opsgenieBaseUrl={mockOpsgenieBaseUrl}
              serviceDeskBaseUrl={mockServiceDeskBaseUrl}
            >
              <UrlDataProvider
                projectId="should not appear"
                serviceDeskBaseUrl={mockServiceDeskBaseUrl}
                opsgenieBaseUrl="should not appear"
                onTaskComplete={noop}
                product={product}
              >
                <HomeSection
                  onSectionChange={onSectionChangeMock}
                  onClose={onCloseMock}
                />
              </UrlDataProvider>
            </VisibilityContainer>
          </IntlProvider>,
        );
      };

      const onSectionChangeMock = jest.fn();
      const onCloseMock = jest.fn();
      let wrapper = mountHomeSection();

      beforeEach(() => {
        wrapper = mountHomeSection();
      });

      const clickCard = (title: string) => {
        wrapper
          .find(NavigationCard)
          .filterWhere((e) => e.prop('title') === title)
          .find(Button)
          .simulate('click');
      };

      afterEach(() => {
        jest.clearAllMocks();
      });

      it(`should render HomeSection with header card and 4 navigation cards`, () => {
        expect(wrapper.find(SectionContainer)).toHaveLength(1);
        expect(wrapper.find(HeaderCard)).toHaveLength(1);

        const navigationCards = wrapper.find(NavigationCard);
        expect(navigationCards).toHaveLength(4);
        expect(
          navigationCards.filterWhere((e) => e.prop('title') === 'Quickstart'),
        ).toHaveLength(1);
        expect(
          navigationCards.filterWhere(
            (e) => e.prop('title') === 'Walkthroughs',
          ),
        ).toHaveLength(1);
        const documentationCard = navigationCards.filterWhere(
          (e) => e.prop('title') === 'Documentation',
        );
        expect(documentationCard).toHaveLength(1);
        expect(documentationCard.prop('link')).toEqual(
          'https://support.atlassian.com/jira-service-management-cloud/docs/quick-reference-guide-for-starting-your-service-project/',
        );
        const sampleProjectCard = navigationCards.filterWhere(
          (e) => e.prop('title') === 'Sample space',
        );
        expect(sampleProjectCard).toHaveLength(1);
        expect(sampleProjectCard.prop('link')).toEqual(
          `${mockServiceDeskBaseUrl}/jira/servicedesk/itsm-sample-space`,
        );

        expect(wrapper.find(ArrowRightIcon)).toHaveLength(2);
        expect(wrapper.find(ShortcutIcon)).toHaveLength(2);
      });

      it('should render HomeSection with two navigation cards if OG only', () => {
        wrapper = mountHomeSection(mockVisibilityDataOnlyOg);

        expect(wrapper.find(SectionContainer)).toHaveLength(1);
        expect(wrapper.find(HeaderCard)).toHaveLength(1);

        const navigationCards = wrapper.find(NavigationCard);
        expect(navigationCards).toHaveLength(2);
        expect(
          navigationCards.filterWhere((e) => e.prop('title') === 'Quickstart'),
        ).toHaveLength(1);
        const documentationCard = navigationCards.filterWhere(
          (e) => e.prop('title') === 'Documentation',
        );
        expect(documentationCard).toHaveLength(1);
        expect(documentationCard.prop('link')).toEqual(
          'https://docs.opsgenie.com/docs/opsgenie-quick-start-guide',
        );

        expect(wrapper.find(ArrowRightIcon)).toHaveLength(1);
        expect(wrapper.find(ShortcutIcon)).toHaveLength(1);
      });

      it('should call onClose when minimize icon is clicked', () => {
        const wrapper = mountHomeSection();

        wrapper
          .find(
            `[data-testid="${getComponentTestId(
              'homeSectionMinimizeButton',
            )}"]`,
          )
          .last()
          .simulate('click');

        expect(onCloseMock).toBeCalledTimes(1);
      });

      it('should call onSectionChange only when Quickstart and Walkthroughs cards are clicked', () => {
        clickCard('Quickstart');
        clickCard('Walkthroughs');
        clickCard('Documentation');
        clickCard('Sample space');
        expect(onSectionChangeMock).toBeCalledTimes(2);
        expect(onSectionChangeMock).toHaveBeenNthCalledWith(
          1,
          GspSectionKey.Checklist,
        );
        expect(onSectionChangeMock).toHaveBeenNthCalledWith(
          2,
          GspSectionKey.ProductTours,
        );
      });

      it('should fire screen analytics and UI analytics when cards are clicked', () => {
        expect(wrapper.find(FireScreenAnalytics)).toHaveLength(1);

        const assertCard = (title: string, cardId: string) => {
          clickCard(title);
          expect(fireUIAnalytics).toHaveBeenCalledTimes(1);
          expect(fireUIAnalytics).toHaveBeenCalledWith(
            expect.objectContaining({
              payload: expect.objectContaining({
                action: 'clicked',
                actionSubject: 'link',
              }),
            }),
            'jsmGettingStartedPanelHomeSectionNavigationCard',
            {
              cardId,
            },
          );
          jest.clearAllMocks();
        };

        assertCard('Quickstart', 'checklistCard');
        assertCard('Walkthroughs', 'walkthroughsCard');
        assertCard('Documentation', 'documentationCard');
        assertCard('Sample space', 'sampleProjectCard');
      });
    },
  );
});
