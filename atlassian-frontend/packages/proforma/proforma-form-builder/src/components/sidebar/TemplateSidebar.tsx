import React, { FC } from 'react';

import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import Button from '@atlaskit/button';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import { TemplateForm } from '@atlassian/proforma-common-core/form-system-models';
import {
  CommonMessage,
  IntlCommonMessages,
} from '@atlassian/proforma-common-core/jira-common';

import { GlobalMetadata, TemplateMetadata } from '../../apis/TemplateApi';

import { TemplatesSidebar } from './templates/TemplatesSidebar';

interface FormsSidebarProps {
  templates: TemplateMetadata[];
  subGroupMeta: GlobalMetadata['subGroups'];
  featured?: GlobalMetadata['featuredGroups'];
  insertTemplate: (templateForm: TemplateForm) => void;
  onClose: () => void;
}

export const TemplateSidebar: FC<FormsSidebarProps> = ({
  templates,
  subGroupMeta,
  featured,
  insertTemplate,
  onClose,
}) => {
  return (
    <SidebarWrapper>
      <CloseBtnWrapper>
        <Button
          iconBefore={<CrossIcon label="close icon" />}
          appearance="subtle"
          onClick={onClose}
        />
      </CloseBtnWrapper>
      <SidebarPadding>
        <h4>
          <FormattedMessage {...IntlCommonMessages[CommonMessage.Templates]} />
        </h4>
        <TemplatesSidebar
          templates={templates}
          subGroupMeta={subGroupMeta}
          featured={featured}
          insertTemplate={insertTemplate}
        />
      </SidebarPadding>
    </SidebarWrapper>
  );
};

const SidebarWrapper = styled.div`
  background-color: white;
  min-height: 100%;
`;

const CloseBtnWrapper = styled.div`
  margin-top: 16px;
  position: absolute
  right: 24px;
`;

const SidebarPadding = styled.div`
  margin-bottom: 30px;
  padding: 24px 16px 0 16px;
`;
