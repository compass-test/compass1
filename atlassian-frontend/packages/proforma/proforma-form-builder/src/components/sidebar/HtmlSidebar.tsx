import React from 'react';

import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import SectionMessage from '@atlaskit/section-message';
import TextArea from '@atlaskit/textarea';

import { HtmlExtensionSelection } from '../editor/ExtensionSelection';

import {
  HtmlSidebarMessages,
  IntlHtmlSidebarMessages,
} from './HtmlSidebarMessages.intl';
import { messages } from './messages';

interface HtmlSidebarProps extends HtmlExtensionSelection {}

export const HtmlSidebar: React.FC<HtmlSidebarProps> = ({ extension }) => {
  return (
    <SidebarPadding>
      <h3>
        <FormattedMessage
          {...IntlHtmlSidebarMessages[HtmlSidebarMessages.Heading]}
        />
      </h3>
      <p />
      <TextArea
        name="html"
        placeholder=""
        value={extension.parameters.htmlContent}
        isDisabled
      />
      <p />
      <SectionMessage appearance="warning">
        <FormattedMessage {...messages.htmlQuestionsNoLongerSupported} />
      </SectionMessage>
    </SidebarPadding>
  );
};

const SidebarPadding = styled.div`
  margin-bottom: 30px;
  padding: 24px 16px 0 16px;
`;
