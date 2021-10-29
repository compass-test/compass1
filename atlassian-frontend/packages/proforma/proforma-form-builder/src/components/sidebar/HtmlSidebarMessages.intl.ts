import { defineMessages } from 'react-intl';

export enum HtmlSidebarMessages {
  Heading = 'Heading',
}

export const IntlHtmlSidebarMessages = defineMessages({
  [HtmlSidebarMessages.Heading]: {
    id: 'form-builder.HtmlSidebar.Heading',
    defaultMessage: 'HTML Content',
  },
});
