import React from 'react';

import FileIcon from '@atlaskit/icon/glyph/file';
import { Disclosure } from '@atlassian/dragonfruit-common-ui';
import { LinkSection } from '@atlassian/dragonfruit-components';
import {
  UI_COMPONENT_CONTACT_CARD_HIDE_ONCALL_NONSERVICE,
  UI_COMPONENT_CONTACT_CARD_HIDE_ONCALL_NONSERVICE_DEFAULT_VALUE,
  useFeatureFlag,
} from '@atlassian/dragonfruit-feature-flags';
import {
  CompassComponent,
  CompassComponentDataManager,
  CompassComponentType,
  CompassLink,
  CompassLinkType,
} from '@atlassian/dragonfruit-graphql';
import { useIntl, withErrorBoundary } from '@atlassian/dragonfruit-utils';

import { TeamsCardError } from '../../index';

import messages from './messages';
import { LinkSectionWrapper } from './styled';

type ComponentContactCardProps = {
  componentId: CompassComponent['id'];
  componentName: CompassComponent['name'];
  componentType: CompassComponent['type'];
  dataManager?: CompassComponentDataManager;
  links?: CompassLink[] | null;
  testId?: string;
};

const ErrorStateContent = () => {
  const { formatMessage } = useIntl();

  return (
    <TeamsCardError description={formatMessage(messages.errorStateBody)} />
  );
};

const ComponentContactCard = ({
  componentId,
  componentName,
  componentType,
  links,
  testId,
  dataManager,
}: ComponentContactCardProps) => {
  const { formatMessage } = useIntl();

  const hideOnCallEnabledFlag = useFeatureFlag(
    UI_COMPONENT_CONTACT_CARD_HIDE_ONCALL_NONSERVICE,
    UI_COMPONENT_CONTACT_CARD_HIDE_ONCALL_NONSERVICE_DEFAULT_VALUE,
  );

  const hideOnCallSection =
    hideOnCallEnabledFlag && componentType !== CompassComponentType.SERVICE;

  const Links = () => (
    <LinkSectionWrapper>
      <LinkSection
        componentId={componentId}
        componentName={componentName}
        links={links ? links : []}
        dataManager={dataManager}
        linkType={CompassLinkType.CHAT_CHANNEL}
        position="sidebar"
      />
      {!hideOnCallSection && (
        <LinkSection
          componentId={componentId}
          componentName={componentName}
          links={links ? links : []}
          dataManager={dataManager}
          linkType={CompassLinkType.ON_CALL}
          position="sidebar"
        />
      )}
    </LinkSectionWrapper>
  );
  return (
    <Disclosure expanded={true} testId={testId}>
      <Disclosure.ExpandingCard
        heading={formatMessage(messages.headerText)}
        icon={<FileIcon label="file icon" />}
        details={Links}
      />
    </Disclosure>
  );
};

export default withErrorBoundary(ComponentContactCard, {
  Fallback: ErrorStateContent,
  componentName: 'componentContactCard',
});
