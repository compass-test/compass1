import React, { useState } from 'react';

import { useRouterActions } from 'react-resource-router';

import Button from '@atlaskit/button';
import { ModalTransition } from '@atlaskit/modal-dialog';
import { CreateComponentModal } from '@atlassian/dragonfruit-component-create-modal';
import {
  CompassComponent,
  CompassComponentType,
} from '@atlassian/dragonfruit-graphql';
import { routes } from '@atlassian/dragonfruit-routes';
import { useIntl } from '@atlassian/dragonfruit-utils';

import messages from './messages';

type CreateComponentButtonProps = {
  type: CompassComponentType;
};

export function CreateComponentButton(props: CreateComponentButtonProps) {
  const { type } = props;

  const { formatMessage } = useIntl();
  const { push } = useRouterActions();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSuccess = (componentId: CompassComponent['id']) => {
    push(routes.COMPONENT_DETAILS(componentId));
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)} appearance="primary">
        {formatMessage(getButtonMessage(type))}
      </Button>

      <ModalTransition>
        {isModalOpen && (
          <CreateComponentModal
            defaultValues={{ type }}
            onSuccess={handleSuccess}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </ModalTransition>
    </>
  );
}

function getButtonMessage(type: CompassComponentType) {
  switch (type) {
    case CompassComponentType.SERVICE:
      return messages.createService;
    case CompassComponentType.APPLICATION:
      return messages.createApplication;
    case CompassComponentType.LIBRARY:
      return messages.createLibrary;
    case CompassComponentType.OTHER:
      return messages.createOther;
  }

  throw new Error('Missing message for create component button');
}
