import React, { useCallback, useState } from 'react';

import { FormattedMessage } from 'react-intl';

import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@atlaskit/dropdown-menu';
import { useFlags } from '@atlaskit/flag';
import MoreIcon from '@atlaskit/icon/glyph/more';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import {
  BaseErrorFlagProps,
  DeleteModal,
} from '@atlassian/dragonfruit-common-ui';
import {
  CompassComponent,
  useDeleteComponent,
} from '@atlassian/dragonfruit-graphql';
import { useIntl } from '@atlassian/dragonfruit-utils';

import messages from './messages';

type Props = {
  componentId: CompassComponent['id'];
};

export const ActionsCell = (props: Props) => {
  const { componentId } = props;

  const { formatMessage } = useIntl();
  const { showFlag } = useFlags();

  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState<boolean>(false);
  const open = useCallback(() => setDeleteModalIsOpen(true), []);
  const close = useCallback(() => setDeleteModalIsOpen(false), []);

  const [handleMutate] = useDeleteComponent();

  const deleteComponent = useCallback(() => {
    handleMutate({ id: componentId }).catch((error) => {
      showFlag({
        ...BaseErrorFlagProps,
        id: 'dragonfruitDeleteComponentGenericError',
        title: (
          <FormattedMessage {...CommonMessages.somethingWentWrongFullStop} />
        ),
        description: (
          <FormattedMessage
            {...CommonMessages.somethingWentWrongPleaseTryAgainFullStop}
          />
        ),
      });
    });
  }, [componentId, handleMutate, showFlag]);

  const deleteModal = (
    <DeleteModal
      heading={formatMessage(messages.removeComponent)}
      isOpen={deleteModalIsOpen}
      onClose={close}
      onSubmit={() => {
        deleteComponent();
        close();
      }}
      data-test-id={`dragonfruit-component-list.ui.components-table.actions-cell.delete-modal-${componentId}`}
    >
      {formatMessage(messages.deleteComponentDescription)}
    </DeleteModal>
  );

  return (
    <>
      <DropdownMenu
        triggerType="button"
        triggerButtonProps={{
          appearance: 'subtle',
          iconBefore: <MoreIcon label="Actions" size="small" />,
          spacing: 'compact',
        }}
        position="bottom right"
        data-test-id={`dragonfruit-component-list.ui.components-table.actions-cell.action-button-${componentId}`}
      >
        <DropdownItemGroup>
          <DropdownItem
            onClick={open}
            data-test-id={`dragonfruit-component-list.ui.components-table.actions-cell.remove-${componentId}`}
          >
            {formatMessage(CommonMessages.remove)}
          </DropdownItem>
        </DropdownItemGroup>
      </DropdownMenu>
      {deleteModal}
    </>
  );
};
