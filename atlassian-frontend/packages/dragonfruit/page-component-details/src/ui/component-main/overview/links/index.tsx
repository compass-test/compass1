import React from 'react';

import { LinkSection } from '@atlassian/dragonfruit-components';
import {
  CompassComponent,
  CompassComponentDataManager,
  CompassLink,
  CompassLinkType,
} from '@atlassian/dragonfruit-graphql';

import { LinkSectionWrapper } from './styled';

type Props = {
  componentId: CompassComponent['id'];
  componentName: CompassComponent['name'];
  dataManager?: CompassComponentDataManager;
  links: CompassLink[];
};

export function LinkView(props: Props) {
  const { componentId, componentName, links, dataManager } = props;

  return (
    <LinkSectionWrapper>
      <LinkSection
        componentId={componentId}
        componentName={componentName}
        dataManager={dataManager}
        links={links}
        linkType={CompassLinkType.REPOSITORY}
      />
      <LinkSection
        componentId={componentId}
        componentName={componentName}
        dataManager={dataManager}
        links={links}
        linkType={CompassLinkType.DOCUMENT}
      />
      <LinkSection
        componentId={componentId}
        componentName={componentName}
        dataManager={dataManager}
        links={links}
        linkType={CompassLinkType.PROJECT}
      />
      <LinkSection
        componentId={componentId}
        componentName={componentName}
        dataManager={dataManager}
        links={links}
        linkType={CompassLinkType.DASHBOARD}
      />
      <LinkSection
        componentId={componentId}
        componentName={componentName}
        dataManager={dataManager}
        links={links}
        linkType={CompassLinkType.OTHER_LINK}
      />
    </LinkSectionWrapper>
  );
}
