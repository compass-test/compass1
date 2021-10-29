import React from 'react';

import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import { ContentSection } from '@atlassian/dragonfruit-common-ui';
import {
  CompassComponent,
  CompassComponentDataManager,
  CompassLink,
  CompassLinkType,
  MAX_COMPASS_LINKS_PER_SECTION,
} from '@atlassian/dragonfruit-graphql';
import { useIntl, withErrorBoundary } from '@atlassian/dragonfruit-utils';

import { LinkList } from './link-list';
import messages from './messages';

export type Props = {
  componentId: CompassComponent['id'];
  componentName: CompassComponent['name'];
  dataManager?: CompassComponentDataManager;
  position?: 'main' | 'sidebar';
  links: CompassLink[];
  linkType: CompassLinkType;
};

function getLabel(linkType: CompassLinkType) {
  switch (linkType) {
    case CompassLinkType.DOCUMENT:
      return CommonMessages.documentation;
    case CompassLinkType.DASHBOARD:
      return CommonMessages.dashboards;
    case CompassLinkType.PROJECT:
      return CommonMessages.projects;
    case CompassLinkType.REPOSITORY:
      return CommonMessages.repositories;
    case CompassLinkType.OTHER_LINK:
      return CommonMessages.otherLinks;
    case CompassLinkType.CHAT_CHANNEL:
      return CommonMessages.chatChannels;
    case CompassLinkType.ON_CALL:
      return CommonMessages['on-callSchedules'];
    default:
      throw Error('Unsupported link type');
  }
}

const getDescriptionMessage = (linkType: CompassLinkType) => {
  switch (linkType) {
    case CompassLinkType.DOCUMENT:
    case CompassLinkType.DASHBOARD:
    case CompassLinkType.PROJECT:
    case CompassLinkType.REPOSITORY:
    case CompassLinkType.OTHER_LINK:
      return null;
    case CompassLinkType.CHAT_CHANNEL:
      return messages.chatChannelSectionDescription;
    case CompassLinkType.ON_CALL:
      return messages.onCallSectionDescription;
    default:
      throw Error('Unsupported link type');
  }
};

function Section(props: Props) {
  const {
    componentId,
    componentName,
    links,
    linkType,
    position = 'main',
    dataManager,
  } = props;
  const { formatMessage } = useIntl();
  const typeName = formatMessage(getLabel(linkType));

  const filteredLinks = links.filter(
    (link) => link.type === linkType && !link._isDeleted,
  );

  const noLinks = filteredLinks.length === 0;
  let description;
  if (noLinks) {
    const descriptionMessage = getDescriptionMessage(linkType);
    if (descriptionMessage) {
      description = formatMessage(descriptionMessage);
    }
  }

  return (
    <ContentSection
      title={typeName}
      name={linkType.toLowerCase()}
      position={position}
      description={description}
    >
      <LinkList
        links={filteredLinks}
        componentId={componentId}
        componentName={componentName}
        dataManager={dataManager}
        position={position}
        type={linkType}
        maxLinks={MAX_COMPASS_LINKS_PER_SECTION}
      />
    </ContentSection>
  );
}

export const LinkSection = withErrorBoundary(Section, {
  componentName: 'componentDetailsLinkSection',
});

export { AddLinkForm } from './link-list';
