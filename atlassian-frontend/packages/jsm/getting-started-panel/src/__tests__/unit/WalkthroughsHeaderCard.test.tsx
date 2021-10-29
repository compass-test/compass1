import React, { ComponentProps } from 'react';
import { IntlProvider } from 'react-intl';
import { mount, ReactWrapper } from 'enzyme';

import { fireUIAnalytics } from '@atlassian/analytics-bridge';
import Button from '@atlaskit/button';
import MediaServicesFitToPageIcon from '@atlaskit/icon/glyph/media-services/fit-to-page';
import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left';

import { isAdvancedUser } from '../_testUtils';

import {
  mockGspState,
  mockOpsgenieBaseUrl,
  mockServiceDeskBaseUrl,
} from '../../common/mocks';
import { ProductTours, ProductTourKey, HeaderState } from '../../common/types';
import {
  VisibilityContainer,
  VisibilityData,
} from '../../common/services/visibility';
import {
  mockVisibilityDataStandard,
  mockVisibilityDataAdvanced,
  mockVisibilityDataSomeOg,
  mockVisibilityDataEmpty,
} from '../../common/services/visibility/mocks';
import { TourAvatar } from '../../common/ui/avatar';
import HeaderCardWithIntl, {
  HeaderCard,
} from '../../ui/walkthroughs-section/header-card';

jest.mock('@atlassian/analytics-bridge', () => ({
  ...jest.requireActual<Object>('@atlassian/analytics-bridge'),
  fireUIAnalytics: jest.fn(),
}));

const { Welcome, IncidentManagement, ChangeManagement } = ProductTourKey;
const { Expanded, Minimized } = HeaderState;

const sampleData = (
  activeTour: ProductTourKey,
  headerState: HeaderState,
): ProductTours => ({
  activeTour,
  headerState,
});

const actionMocks = {
  onTourSelected: jest.fn(),
  onHeaderStateChanged: jest.fn(),
  onBack: jest.fn(),
  onClose: jest.fn(),
};

const mountHeaderCard = (
  tourKey: ProductTourKey,
  headerState: HeaderState = Expanded,
  visibilityData: VisibilityData,
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

  const wrapper = mount(
    <IntlProvider locale="en">
      <VisibilityContainer
        gspState={gspState}
        serviceDeskBaseUrl={mockServiceDeskBaseUrl}
        opsgenieBaseUrl={mockOpsgenieBaseUrl}
      >
        <HeaderCardWithIntl
          productTours={sampleData(tourKey, headerState)}
          {...actionMocks}
        />
      </VisibilityContainer>
    </IntlProvider>,
  );
  return wrapper.find(HeaderCard);
};

describe('HeaderCard', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe.each([
    [Minimized, Welcome, IncidentManagement, mockVisibilityDataEmpty],
    [Expanded, Welcome, ChangeManagement, mockVisibilityDataEmpty],
    [Minimized, IncidentManagement, ChangeManagement, mockVisibilityDataEmpty],
    [Expanded, IncidentManagement, Welcome, mockVisibilityDataEmpty],
    [Minimized, ChangeManagement, Welcome, mockVisibilityDataEmpty],
    [Expanded, ChangeManagement, IncidentManagement, mockVisibilityDataEmpty],
    [Minimized, Welcome, ChangeManagement, mockVisibilityDataStandard],
    [Minimized, ChangeManagement, Welcome, mockVisibilityDataAdvanced],
    [Minimized, IncidentManagement, Welcome, mockVisibilityDataSomeOg],
    [Expanded, Welcome, IncidentManagement, mockVisibilityDataStandard],
  ])(
    'in the %s state with the %s tour active',
    (headerState, activeTour, inactiveTour, visibilityData) => {
      let headerCard: ReactWrapper<ComponentProps<typeof HeaderCard>>;
      beforeEach(() => {
        headerCard = mountHeaderCard(activeTour, headerState, visibilityData);
      });

      it('should show the active tour at the top', () => {
        expect(headerCard.find(TourAvatar).first().prop('tourKey')).toBe(
          activeTour,
        );
      });

      it('should call onBack when the back button is clicked', () => {
        const button = headerCard
          .find(Button)
          .filterWhere((b) => b.find(ArrowLeftIcon).exists());

        button.simulate('click');

        expect(actionMocks.onBack).toHaveBeenCalled();
      });

      it('should fire a back UI event when the close button is clicked', () => {
        const button = headerCard
          .find(Button)
          .filterWhere((b) => b.find(ArrowLeftIcon).exists());

        button.simulate('click');

        expect(fireUIAnalytics).toHaveBeenCalledTimes(1);
        expect(fireUIAnalytics).toHaveBeenCalledWith(
          expect.any(Object),
          'jsmGettingStartedPanelBackButton',
        );
      });

      it('should call onClose when the close button is clicked', () => {
        const button = headerCard
          .find(Button)
          .filterWhere((b) => b.find(MediaServicesFitToPageIcon).exists());

        button.simulate('click');

        expect(actionMocks.onClose).toHaveBeenCalledTimes(1);
      });

      it('should fire a close UI event when the close button is clicked', () => {
        const button = headerCard
          .find(Button)
          .filterWhere((b) => b.find(MediaServicesFitToPageIcon).exists());

        button.simulate('click');

        expect(fireUIAnalytics).toHaveBeenCalledTimes(1);
        expect(fireUIAnalytics).toHaveBeenCalledWith(
          expect.any(Object),
          'jsmGettingStartedPanelCloseButton',
        );
      });

      it('should not call onTourSelected when an active tour is clicked', () => {
        const avatar = headerCard
          .find(TourAvatar)
          .filterWhere((a) => a.prop('tourKey') === activeTour);

        avatar.simulate('click');

        expect(actionMocks.onTourSelected).not.toHaveBeenCalled();
      });

      if (headerState === Minimized) {
        it('should include only one tour', () => {
          expect(headerCard.find(TourAvatar)).toHaveLength(1);
        });

        it('should not show an avatar border for the active tour', () => {
          expect(headerCard.find(TourAvatar).prop('isActive')).toBeFalsy();
        });

        if (isAdvancedUser(visibilityData)) {
          it('should expand the header when show more is clicked', () => {
            const button = headerCard
              .find(Button)
              .filterWhere((b) => b.text() === 'Show More');

            button.simulate('click');

            expect(actionMocks.onHeaderStateChanged).toHaveBeenCalledWith(
              Expanded,
            );
          });
        } else {
          it('should not show the Show More button', () => {
            const button = headerCard
              .find(Button)
              .filterWhere((b) => b.text() === 'Show More');

            expect(button).toHaveLength(0);
          });
        }
      }

      if (headerState === Expanded) {
        if (isAdvancedUser(visibilityData)) {
          it('should show all three tours', () => {
            expect(headerCard.find(TourAvatar)).toHaveLength(3);
          });

          it('should minimize the header when show less is clicked', () => {
            const button = headerCard
              .find(Button)
              .filterWhere((b) => b.text() === 'Show Less');

            button.simulate('click');

            expect(actionMocks.onHeaderStateChanged).toHaveBeenCalledWith(
              Minimized,
            );
          });

          it('should show an avatar border for the active tour', () => {
            const avatar = headerCard
              .find(TourAvatar)
              .filterWhere((a) => a.prop('tourKey') === activeTour);

            expect(avatar.prop('isActive')).toBeTruthy();
          });

          it('should not show an avatar border for inactive tours', () => {
            const avatar = headerCard
              .find(TourAvatar)
              .filterWhere((a) => a.prop('tourKey') === inactiveTour);

            expect(avatar.prop('isActive')).toBeFalsy();
          });

          it('should call onTourSelected when an inactive tour is clicked', () => {
            const avatar = headerCard
              .find(TourAvatar)
              .filterWhere((a) => a.prop('tourKey') === inactiveTour);

            avatar.simulate('click');

            expect(actionMocks.onTourSelected).toHaveBeenCalledWith(
              inactiveTour,
            );
          });

          it('should fire a checklist tour clicked UI event when an inactive tour is clicked', () => {
            const avatar = headerCard
              .find(TourAvatar)
              .filterWhere((a) => a.prop('tourKey') === inactiveTour);

            avatar.simulate('click');

            expect(fireUIAnalytics).toHaveBeenCalledTimes(1);
            expect(fireUIAnalytics).toHaveBeenCalledWith(
              expect.objectContaining({
                payload: expect.objectContaining({
                  action: 'clicked',
                  actionSubject: 'productTour',
                }),
              }),
              'jsmGettingStartedPanelProductTour',
              { productTour: inactiveTour },
            );
          });
        } else {
          it('should not show Show Less button', () => {
            const button = headerCard
              .find(Button)
              .filterWhere((b) => b.text() === 'Show Less');

            expect(button).toHaveLength(0);
          });

          it('should not find any other than Welcome tour', () => {
            const avatarWelcome = headerCard
              .find(TourAvatar)
              .filterWhere((a) => a.prop('tourKey') === Welcome);
            const avatarIM = headerCard
              .find(TourAvatar)
              .filterWhere((a) => a.prop('tourKey') === IncidentManagement);
            const avatarCM = headerCard
              .find(TourAvatar)
              .filterWhere((a) => a.prop('tourKey') === ChangeManagement);

            expect(avatarWelcome).toHaveLength(1);
            expect(avatarWelcome.prop('isActive')).toBeTruthy();
            expect(avatarIM).toHaveLength(0);
            expect(avatarCM).toHaveLength(0);
          });
        }
      }
    },
  );
});
