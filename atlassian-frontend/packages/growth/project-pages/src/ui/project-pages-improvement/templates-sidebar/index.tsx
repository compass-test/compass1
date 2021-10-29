import React from 'react';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import OriginTracing from '@atlassiansox/origin-tracing';
import { SpotlightManager, SpotlightTarget } from '@atlaskit/onboarding';
import { EngagementSpotlight } from '@atlassiansox/engagekit';
import TemplateList from './template-list';
import { Template } from '../../../controllers/template/types';
import {
  HeaderBlanket,
  HeaderContainer,
  SidebarWrapper,
  Subtitle,
  Title,
} from './styled';

interface Props {
  templates: Template[];
  activeTemplate?: Template;
  onTemplateClick?: (template: Template) => void;
  onTemplateMouseEnter?: (template: Template) => void;
  onMouseLeave?: () => void;
  hoverRef?: React.Ref<any>;
  isDisabled: boolean;
  origin?: OriginTracing | null;
  title: FormattedMessage.MessageDescriptor;
  subtitle: FormattedMessage.MessageDescriptor;
}

const TemplatesSidebar = ({
  intl,
  templates,
  onTemplateClick,
  onTemplateMouseEnter,
  onMouseLeave,
  hoverRef,
  isDisabled,
  activeTemplate,
  origin,
  title,
  subtitle,
}: Props & InjectedIntlProps) => (
  <SpotlightManager>
    <SpotlightTarget name="silentBundlingTemplateSpotlight">
      <SidebarWrapper data-test-id="confluence-project-pages.template-sidebar">
        <HeaderContainer>
          {isDisabled && <HeaderBlanket />}
          <Title>{intl.formatMessage(title)}</Title>
          <Subtitle>{intl.formatMessage(subtitle)}</Subtitle>
        </HeaderContainer>
        <TemplateList
          templates={templates}
          activeTemplate={activeTemplate}
          onTemplateClick={onTemplateClick}
          onTemplateMouseEnter={onTemplateMouseEnter}
          onMouseLeave={onMouseLeave}
          hoverRef={hoverRef}
          isDisabled={isDisabled}
          origin={origin}
        />
      </SidebarWrapper>
    </SpotlightTarget>
    <EngagementSpotlight
      engagementId="silentBundlingTemplateSpotlight"
      dialogPlacement="left top"
    />
  </SpotlightManager>
);

export default injectIntl(TemplatesSidebar);
