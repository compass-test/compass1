import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

import DropdownMenu from '../../../../components/DropdownMenu/DropdownMenu';
import { triggerAnalyticsForDropdownMenuItemClick } from '../../../../components/analytics';
import { CLOUD_ADMIN_URL } from '../../../../utils';

jest.mock('../../../../components/analytics', () => {
  return {
    ...jest.requireActual<Object>('../../../../components/analytics'),
    triggerAnalyticsForDropdownMenuItemClick: jest.fn(),
  };
});

describe('DropdownMenu', () => {
  const renderDropdownMenu = () =>
    render(
      <IntlProvider messages={{}} locale="en">
        <DropdownMenu cloudId="test-cloud-id" />
      </IntlProvider>,
    );

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render properly', async () => {
    expect(renderDropdownMenu).not.toThrowError();
  });

  it('should provide a link to cloud admin, and fire an UI event on clicked', async () => {
    const { getByTestId } = renderDropdownMenu();

    expect(
      getByTestId('testId-invite-people-dropdown-menu'),
    ).toBeInTheDocument();

    fireEvent.click(getByTestId('testId-invite-people-dropdown-menu--trigger'));

    await waitForElement(() =>
      getByTestId('testId-invite-people-manage-access-settings-menu-item'),
    );

    const manageAccessSettingsLink = getByTestId(
      'testId-invite-people-manage-access-settings-menu-item',
    );

    expect(manageAccessSettingsLink).toHaveAttribute(
      'href',
      `${CLOUD_ADMIN_URL}/s/test-cloud-id/signup`,
    );
    expect(manageAccessSettingsLink).toHaveAttribute('target', 'new');

    fireEvent.click(manageAccessSettingsLink);

    expect(triggerAnalyticsForDropdownMenuItemClick).toHaveBeenCalledTimes(1);
  });
});
