import React, { FC } from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';

import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@atlaskit/dropdown-menu';
import { AnalyticsLink } from '@atlassian/mpt-elements';

import { messages } from './messages';

export type Props = {
  supportLink?: string;
  communityLink: string;
  documentationLink?: string;
  analyticsAttributes?: React.ComponentProps<
    typeof AnalyticsLink
  >['analyticsAttributes'];
};

const NeedHelpButton: FC<Props & InjectedIntlProps> = ({
  intl,
  supportLink,
  communityLink,
  documentationLink,
  analyticsAttributes,
}) => {
  return (
    <DropdownMenu
      trigger={intl.formatMessage(messages.dropdownName)}
      triggerType="button"
    >
      <DropdownItemGroup>
        {supportLink && (
          <DropdownItem
            analyticsId="needHelpSupportButton"
            analyticsAttributes={analyticsAttributes}
            href={supportLink}
            target="_blank"
            rel="noopener noreferrer"
            linkComponent={AnalyticsLink}
          >
            {intl.formatMessage(messages.support)}
          </DropdownItem>
        )}
        <DropdownItem
          analyticsId="needHelpCommunityButton"
          analyticsAttributes={analyticsAttributes}
          href={communityLink}
          target="_blank"
          rel="noopener noreferrer"
          linkComponent={AnalyticsLink}
        >
          {intl.formatMessage(messages.community)}
        </DropdownItem>
        {documentationLink && (
          <DropdownItem
            analyticsId="needHelpDocumentationButton"
            analyticsAttributes={analyticsAttributes}
            href={documentationLink}
            target="_blank"
            rel="noopener noreferrer"
            linkComponent={AnalyticsLink}
          >
            {intl.formatMessage(messages.documentation)}
          </DropdownItem>
        )}
      </DropdownItemGroup>
    </DropdownMenu>
  );
};

export default injectIntl(NeedHelpButton);
