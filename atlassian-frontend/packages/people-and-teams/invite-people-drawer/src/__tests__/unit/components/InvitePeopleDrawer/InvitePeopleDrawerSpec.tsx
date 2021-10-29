import React from 'react';
import {
  render,
  fireEvent,
  waitForElement,
  cleanup,
} from '@testing-library/react';
import { IntlProvider } from 'react-intl';

import InvitePeopleDrawer, { InvitePeopleDrawerProps } from '../../../../';
import { AnalyticsListener } from '@atlaskit/analytics-next';

import {
  triggerAnalyticsForClickCloseDrawerButton,
  triggerAnalyticsForDrawerViewed,
} from '../../../../components/analytics';

jest.mock('../../../../components/analytics', () => {
  return {
    ...jest.requireActual<Object>('../../../../components/analytics'),
    triggerAnalyticsForClickCloseDrawerButton: jest.fn(),
    triggerAnalyticsForDrawerViewed: jest.fn(),
  };
});

const mockEvent: any = {
  context: [],
  update: jest.fn(() => mockEvent),
  fire: jest.fn(() => mockEvent),
  clone: jest.fn(() => mockEvent),
};

const mockAddFlags = jest.fn();
const cloudId = '0125594b-5d14-4f19-ba76-9c8840d22e99';
const mockSiteUrl = 'https://hello.atlassian.net';

const defaultProps = {
  testId: 'test',
  cloudId: cloudId,
  product: 'confluence',
  addFlag: () => mockAddFlags,
  onCloseHandler: () => jest.fn(),
  continueUrl: mockSiteUrl,
  isOpen: true,
  source: 'peopleMenu',
};

const renderInvitePeopleDrawer = (props?: Partial<InvitePeopleDrawerProps>) =>
  render(
    <AnalyticsListener channel="*" onEvent={jest.fn()}>
      <IntlProvider messages={{}} locale="en">
        <InvitePeopleDrawer {...defaultProps} {...props} />
      </IntlProvider>
    </AnalyticsListener>,
  );

describe('InvitePeopleDrawer', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    cleanup();
  });
  it('should render the invite drawer component', async () => {
    const { getByTestId } = renderInvitePeopleDrawer();
    await waitForElement(() => getByTestId('testId-invite-people-drawer'));
    expect(getByTestId('testId-invite-people-drawer')).toBeInTheDocument();
    expect(getByTestId('testId-invite-people-drawer-img')).toBeInTheDocument();

    await waitForElement(() => getByTestId('testId-invite-people-form'));
    expect(getByTestId('testId-invite-people-form')).toBeInTheDocument();
  });

  it('should fire a UI event when the user closes the drawer', async () => {
    const { getByTestId } = renderInvitePeopleDrawer();
    await waitForElement(() => getByTestId('testId-invite-people-drawer'));
    const input = document.querySelector(
      '[data-testid="DrawerPrimitiveSidebarCloseButton"]',
    )!;
    fireEvent.click(input);
    expect(triggerAnalyticsForClickCloseDrawerButton).toHaveBeenCalled();
  });

  it('should not render the invite drawer component when the `isOpen` prop is `false`', async () => {
    const { getByTestId } = renderInvitePeopleDrawer({
      isOpen: false,
    });
    await waitForElement(() => getByTestId('testId-invite-people-drawer'));
    expect(getByTestId('testId-invite-people-drawer').firstChild).toBeNull();
  });

  it('should fire a screen event when the drawer is opened', async () => {
    const { getByTestId } = renderInvitePeopleDrawer();
    await waitForElement(() => getByTestId('testId-invite-people-drawer-img'));
    expect(triggerAnalyticsForDrawerViewed).toHaveBeenCalled();
  });
});
