/**
 * Experiment: Confluence Section Notification Banner Component
 * Description: This banner is designed to notify users that they now have Confluence as part of a series of Auto
 *              Provisioning Experiments (Trello -> Confluence, JSW -> Confluence). The rendering logic is determined
 *              by the host product with some additional checks for props and Confluence.
 * Owner: Brandon Giraldo (@brandon)
 * Experiment ticket: https://atl-growth.atlassian.net/browse/MDS-617
 * Clean up ticket: https://atl-growth.atlassian.net/browse/MDS-702
 **/

import React, { useCallback } from 'react';
import EditorCloseIcon from '@atlaskit/icon/glyph/editor/close';
import styled, { keyframes } from 'styled-components';
import {
  SwitcherProductType,
  WithConfluenceAutoProvisionedSiteFromTrello,
} from '../../../types';
import { ViewedTracker } from '../../../common/utils/analytics';

export interface SwitchToSectionBannerNotificationProps {
  children: JSX.Element;
  productType?: SwitcherProductType;
}

export const SwitchToSectionBannerNotification = ({
  confluenceAutoProvisionedSiteFromTrello,
  children,
  productType,
}: SwitchToSectionBannerNotificationProps &
  Partial<WithConfluenceAutoProvisionedSiteFromTrello>) => {
  const onConfluenceBannerNotificationClicked = useCallback(() => {
    confluenceAutoProvisionedSiteFromTrello?.onConfluenceBannerNotificationClicked();
  }, [confluenceAutoProvisionedSiteFromTrello]);

  const shouldShowConfluenceBannerNotification: boolean =
    !!confluenceAutoProvisionedSiteFromTrello?.showConfluenceBannerNotification &&
    !!confluenceAutoProvisionedSiteFromTrello?.onConfluenceBannerNotificationClicked &&
    productType === 'CONFLUENCE' &&
    !!confluenceAutoProvisionedSiteFromTrello?.displayedBannerMessage;

  return shouldShowConfluenceBannerNotification ? (
    <>
      <ViewedTracker subject="confluenceNotificationBanner" />
      <BorderWrapper>
        <>
          {children}
          <MessageContainer>
            <CloseButtonWrapper
              onClick={onConfluenceBannerNotificationClicked}
              data-testid="notification-close-button"
            >
              <EditorCloseIcon label="Close" />
            </CloseButtonWrapper>
            {confluenceAutoProvisionedSiteFromTrello?.displayedBannerMessage}
          </MessageContainer>
        </>
      </BorderWrapper>
    </>
  ) : (
    <>{children}</>
  );
};

const fadeIn = keyframes`
  to {
    opacity: 1;
  }
`;

export const FadeIn = styled.div`
  animation: ${fadeIn} 500ms ease forwards;
  opacity: 0;
`;

const MessageContainer = styled.div`
  background: #f4f5f7;
  border-radius: 4px;
  padding: 8px 25px 8px 11px;
  margin: 6px;
  position: relative;
`;

const CloseButtonWrapper = styled.div`
  position: absolute;
  right: 3px;
  :hover {
    cursor: pointer;
  }
`;

const BorderWrapper = styled.div`
  border: #dfe1e6 solid 2px;
  border-radius: 3px;
  animation: ${fadeIn} 500ms ease forwards;
  opacity: 0;
  & > ${MessageContainer} ${CloseButtonWrapper} {
    animation: ${fadeIn} 500ms ease forwards;
    opacity: 0;
  }
`;
