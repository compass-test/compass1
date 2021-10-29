import React, { useState } from 'react';

import { DefaultList, List } from '@atlassian/dragonfruit-common-ui';
import {
  CompassComponent,
  CompassComponentDataManager,
  CompassLink,
  CompassLinkType,
} from '@atlassian/dragonfruit-graphql';
import { useIntl } from '@atlassian/dragonfruit-utils';

import { EditInExternalSourceLink } from '../../../common/ui/styled';
import { useCreateLinkErrorFlags } from '../../../common/ui/utils/links';

import { AddLink } from './add-link';
import { AddLinkEmptyState } from './add-link-empty-state';
import { AddLinkForm } from './add-link-form';
import messages from './messages';
import { SmartLinkWithDelete } from './smart-link-with-delete';
import { DisabledMessage } from './styled';

export type Props = {
  componentId: CompassComponent['id'];
  componentName: CompassComponent['name'];
  links: CompassLink[];
  type: CompassLinkType;
  dataManager?: CompassComponentDataManager;
  position?: 'main' | 'sidebar';
  maxLinks: number;
};

export function LinkList(props: Props) {
  const {
    links,
    componentId,
    componentName,
    type,
    dataManager,
    position = 'main',
    maxLinks,
  } = props;

  const { formatMessage } = useIntl();
  const { showLinkLimitReachedFlag } = useCreateLinkErrorFlags();

  const [addLinkFormOpen, setAddLinkFormOpen] = useState(false);

  const open = () => {
    if (dataManager) {
      return;
    }
    if (links.length >= maxLinks) {
      showLinkLimitReachedFlag(type);
    } else {
      setAddLinkFormOpen(true);
    }
  };
  const close = () => {
    setAddLinkFormOpen(false);
  };

  const hasLinks = links.length > 0;
  const isEmptyAndNotAdding = !addLinkFormOpen && !hasLinks;

  const renderLinks = () => {
    return links.map((link) => (
      <SmartLinkWithDelete
        key={link.id}
        link={link}
        componentId={componentId}
        componentName={componentName}
        isDisabled={!!dataManager}
        position={position}
      />
    ));
  };

  const maxLinkReached = links.length >= maxLinks;
  const inSidebar = position === 'sidebar';
  const hasLinksUi = (
    <>
      {inSidebar ? (
        <DefaultList>{renderLinks()}</DefaultList>
      ) : (
        <List>{renderLinks()}</List>
      )}
      {!addLinkFormOpen && !dataManager && !(inSidebar && maxLinkReached) && (
        <AddLink type={type} onClick={open} />
      )}
      {dataManager && (
        <DisabledMessage>
          <EditInExternalSourceLink
            href={dataManager.externalSourceURL}
            target="_blank"
            rel="noopener"
          >
            {formatMessage(messages.disabledByConfigAsCodeMessage)}
          </EditInExternalSourceLink>
        </DisabledMessage>
      )}
    </>
  );

  const emptyStateUi = (
    <AddLinkEmptyState type={type} onClick={open} dataManager={dataManager} />
  );

  const addLinkFormUi = (
    <AddLinkForm
      componentId={componentId}
      linkType={type}
      onCancel={close}
      onSuccess={close}
    />
  );
  return (
    <>
      {hasLinks && hasLinksUi}
      {isEmptyAndNotAdding && emptyStateUi}
      {addLinkFormOpen && addLinkFormUi}
    </>
  );
}

export { AddLinkForm } from './add-link-form';
