import React from 'react';

import Button from '@atlaskit/button';
import { NoOwnerIcon } from '@atlassian/dragonfruit-common-ui/assets';
import { CompassComponentDataManager } from '@atlassian/dragonfruit-graphql';
import {
  openInNewTab,
  useIntl,
  withErrorBoundary,
} from '@atlassian/dragonfruit-utils';

import UpdateOwnerModal from '../../../common/ui/update-owner-modal';
import { useUpdateModalController } from '../../../controllers/update-modal-controller';

import messages from './messages';
import { ImageWrapper, Message, Title, Wrapper } from './styled';

interface Props {
  componentId: string;
  dataManager?: CompassComponentDataManager;
}

function ComponentOwnerEmptyState({ componentId, dataManager }: Props) {
  const { formatMessage } = useIntl();

  const [
    { isEditModalOpen },
    { openEditModal, closeEditModal, updateOwner },
  ] = useUpdateModalController();

  return (
    <>
      {isEditModalOpen && (
        <UpdateOwnerModal
          onCancel={closeEditModal}
          updateOwner={updateOwner}
          defaultValues={undefined}
          isEditModal={false}
          componentId={componentId}
        />
      )}
      <Wrapper data-testid="dragonfruit.teams.component-owner-empty-state">
        <Title>{formatMessage(messages.emptyViewTitle)}</Title>
        <ImageWrapper>
          <img src={NoOwnerIcon} />
        </ImageWrapper>
        <Message>
          {dataManager
            ? formatMessage(messages.emptyViewBodyManaged)
            : formatMessage(messages.emptyViewBody)}
        </Message>
        <Button
          appearance="primary"
          shouldFitContainer
          onClick={
            dataManager
              ? () => openInNewTab(dataManager.externalSourceURL)
              : openEditModal
          }
        >
          {dataManager
            ? formatMessage(messages.emptyViewButtonManaged)
            : formatMessage(messages.emptyViewButton)}
        </Button>
      </Wrapper>
    </>
  );
}

export default withErrorBoundary(ComponentOwnerEmptyState, {
  componentName: 'ComponentOwnerEmptyState',
});
