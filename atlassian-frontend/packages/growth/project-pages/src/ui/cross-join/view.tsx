import { UIAnalyticsEvent } from '@atlaskit/analytics-next';
import React, { useCallback } from 'react';
import { connectUIAnalytics } from '../../common/analytics/util';
import CollaboratorsAvatarGroup from './collaborators-avatar-group';
import { StateProps } from './types';
import { AccessRequestCapabilityType } from '../../state/confluence/access-request-capabilities/types';
import folderImage from './assets/cross-join-folder.svg';
import styled from 'styled-components';
import { gridSize } from '@atlaskit/theme/constants';
import RequestAccess from './request-access';
import PendingRequest from './pending-request';
import JoinProduct from './join-product';
import DeniedAccess from './denied-access';
import AccessRevoked from './access-revoked';
import UnknownError from './unknown-error';

const HeroImageWrapper = styled.div`
  margin-bottom: ${2 * gridSize()}px;
`;

interface AnalyticsProps {
  onRequestAccessClick: (analyticsEvent: UIAnalyticsEvent) => void;
  onJoinProductClick: (analyticsEvent: UIAnalyticsEvent) => void;
}

const CrossJoinView = ({
  accessRequestCapability,
  origin,
  onRequestAccessClick,
  onJoinProductClick,
  connectedSpace,
  collaborators,
  project,
  cloudId,
  accountId,
}: StateProps & AnalyticsProps) => {
  // enrich analytics event with origin and then fire the event via supplied handler
  const createClickHandlerForAnalytics = useCallback(
    (onClick: (analyticsEvent: UIAnalyticsEvent) => void) => (
      _: React.MouseEvent,
      analyticsEvent: UIAnalyticsEvent,
    ) => {
      if (origin) {
        analyticsEvent.update({
          ...origin.toAnalyticsAttributes({
            hasGeneratedId: true,
          }),
          numberOfCollaborators: collaborators?.length,
        });
      }
      onClick(analyticsEvent);
    },
    [collaborators, origin],
  );

  const isConnected = connectedSpace.connectionState === 'CONNECTED';

  const renderHeroImage = useCallback(
    () => (
      <HeroImageWrapper>
        {isConnected ? (
          <CollaboratorsAvatarGroup
            collaborators={collaborators}
            cloudId={cloudId}
          />
        ) : (
          <img src={folderImage} height={80} width={99.56} />
        )}
      </HeroImageWrapper>
    ),
    [collaborators, isConnected, cloudId],
  );

  // wait until we have connectionState and join scenario before rendering to prevent re-renders
  if (
    connectedSpace.connectionState === 'LOADING' ||
    !accessRequestCapability
  ) {
    return null;
  }

  // for scenarios where collaborators are shown (RA/join with connected space), wait until collaborators are retrieved
  if (
    isConnected &&
    [
      AccessRequestCapabilityType.REQUEST_ACCESS,
      AccessRequestCapabilityType.DIRECT_ACCESS,
    ].includes(accessRequestCapability) &&
    !collaborators
  ) {
    return null;
  }

  switch (accessRequestCapability) {
    case AccessRequestCapabilityType.REQUEST_ACCESS:
      return (
        <RequestAccess
          isConnected={isConnected}
          renderHeroImage={renderHeroImage}
          onClick={createClickHandlerForAnalytics(onRequestAccessClick)}
          projectKey={project.key}
          origin={origin}
          cloudId={cloudId}
          accountId={accountId}
        />
      );

    case AccessRequestCapabilityType.PENDING_REQUEST_EXISTS:
      return <PendingRequest />;

    case AccessRequestCapabilityType.DENIED_REQUEST_EXISTS:
      return <DeniedAccess />;

    case AccessRequestCapabilityType.APPROVED_REQUEST_EXISTS:
      return <AccessRevoked />;

    case AccessRequestCapabilityType.DIRECT_ACCESS:
      return (
        <JoinProduct
          isConnected={isConnected}
          renderHeroImage={renderHeroImage}
          onClick={createClickHandlerForAnalytics(onJoinProductClick)}
          projectKey={project.key}
          projectName={project.name}
          origin={origin}
          cloudId={cloudId}
          accountId={accountId}
        />
      );
    default:
      return <UnknownError />;
  }
};

export default connectUIAnalytics<StateProps>({
  onRequestAccessClick: 'requestAccess',
  onJoinProductClick: 'joinProduct',
})(CrossJoinView);
