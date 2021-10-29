import React, { useEffect } from 'react';
import { Props } from './types';
import { AccessRequestCapabilityType } from '../../state/confluence/access-request-capabilities/types';
import View from './view';
import TreeEmptyState from '../project-pages-improvement/common/empty-page-tree';

const CrossJoin = ({
  connectedSpace,
  accessRequestCapability,
  origin,
  collaborators,
  project,
  triggerConfluenceAccessRequestCheck,
  triggerFetchConfluenceCollaborators,
  cloudId,
  accountId,
}: Props) => {
  useEffect(() => {
    triggerConfluenceAccessRequestCheck();
  }, [triggerConfluenceAccessRequestCheck]);

  const isConnected = connectedSpace.connectionState === 'CONNECTED';

  useEffect(() => {
    if (
      isConnected &&
      accessRequestCapability &&
      [
        AccessRequestCapabilityType.REQUEST_ACCESS,
        AccessRequestCapabilityType.DIRECT_ACCESS,
      ].includes(accessRequestCapability)
    ) {
      // fetch collaborators only for the RA / join product scenario when there is a connected space
      triggerFetchConfluenceCollaborators();
    }
  }, [
    accessRequestCapability,
    isConnected,
    triggerFetchConfluenceCollaborators,
  ]);

  // still loading
  if (!accessRequestCapability) {
    return null;
  }

  return (
    <>
      <TreeEmptyState />
      <View
        accessRequestCapability={accessRequestCapability}
        connectedSpace={connectedSpace}
        origin={origin}
        collaborators={collaborators}
        project={project}
        cloudId={cloudId}
        accountId={accountId}
      />
    </>
  );
};

export default CrossJoin;
