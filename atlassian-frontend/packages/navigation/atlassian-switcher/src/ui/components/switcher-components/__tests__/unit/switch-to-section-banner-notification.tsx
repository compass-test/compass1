import React from 'react';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { SwitchToSectionBannerNotification } from '../../switch-to-section-banner-notification';
import { SwitcherProductType } from '../../../../../types';

describe('<SwitchToSectionBannerNotification />', () => {
  const mockOnConfluenceBannerNotificationClicked = jest.fn();

  const createMockProps = () => ({
    productType: 'CONFLUENCE' as SwitcherProductType,
    confluenceAutoProvisionedSiteFromTrello: {
      showConfluenceBannerNotification: true,
      onConfluenceBannerNotificationClicked: mockOnConfluenceBannerNotificationClicked,
      displayedBannerMessage: "You've got Confluence for free!",
    },
  });

  it('Should render children and show banner', async () => {
    const { getByText } = render(
      <SwitchToSectionBannerNotification {...createMockProps()}>
        <p>Find me!</p>
      </SwitchToSectionBannerNotification>,
    );

    expect(getByText('Find me!')).toBeInTheDocument();
    expect(getByText("You've got Confluence for free!")).toBeInTheDocument();
  });

  it('Should render children only and not show banner if show confluence banner notification prop is false', async () => {
    const modifiedProps = createMockProps();
    modifiedProps.confluenceAutoProvisionedSiteFromTrello.showConfluenceBannerNotification = false;
    const { getByText } = render(
      <SwitchToSectionBannerNotification {...modifiedProps}>
        <p>Find me!</p>
      </SwitchToSectionBannerNotification>,
    );

    expect(getByText('Find me!')).toBeInTheDocument();
    expect(
      screen.queryByText("You've got Confluence for free!"),
    ).not.toBeInTheDocument();
  });

  it('Should render children only and not show banner if no banner message is included', async () => {
    const modifiedProps = createMockProps();
    delete modifiedProps.confluenceAutoProvisionedSiteFromTrello
      .displayedBannerMessage;
    const { getByText } = render(
      <SwitchToSectionBannerNotification {...modifiedProps}>
        <p>Find me!</p>
      </SwitchToSectionBannerNotification>,
    );

    expect(getByText('Find me!')).toBeInTheDocument();
    expect(
      screen.queryByText("You've got Confluence for free!"),
    ).not.toBeInTheDocument();
  });

  it('Should render children only and not show banner if no callback function is provided', async () => {
    const modifiedProps = createMockProps();
    delete modifiedProps.confluenceAutoProvisionedSiteFromTrello
      .onConfluenceBannerNotificationClicked;
    const { getByText } = render(
      <SwitchToSectionBannerNotification {...modifiedProps}>
        <p>Find me!</p>
      </SwitchToSectionBannerNotification>,
    );

    expect(getByText('Find me!')).toBeInTheDocument();
    expect(
      screen.queryByText("You've got Confluence for free!"),
    ).not.toBeInTheDocument();
  });

  it('Should execute callback function when close button is clicked', async () => {
    const { findByTestId } = render(
      <SwitchToSectionBannerNotification {...createMockProps()}>
        <p>Find me!</p>
      </SwitchToSectionBannerNotification>,
    );
    const closeButton = await findByTestId('notification-close-button');
    expect(closeButton).toBeInTheDocument();
    closeButton.click();
    expect(mockOnConfluenceBannerNotificationClicked).toHaveBeenCalled();
  });
});
