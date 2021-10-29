import React, { useState, useRef } from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';
import {
  ConfluenceClientsProvider,
  CrossProductSearchDialog,
  Products,
  UserDetails,
} from '../src';

import * as en from 'react-intl/locale-data/en';

addLocaleData([...en]);

const confluenceConfig = {
  aggregatorUrl: 'https://pug.jira-dev.com/gateway/api/xpsearch-aggregator',
  baseUrl: 'https://pug.jira-dev.com/wiki',
  cloudId: 'DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5',
  collaborationGraphUrl: 'https://api-private.stg.atlassian.com/collaboration',
  isUserAnonymous: false,
  siteUrl: 'https://pug.jira-dev.com',
};

const SearchDialog = ({ user }: { user: UserDetails }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  const onClose = () => {
    setIsOpen(false);
  };

  const onOpen = (e?: React.MouseEvent | KeyboardEvent) => {
    e && e.preventDefault();
    setIsOpen(true);
    ref.current?.focus();
  };

  return (
    <IntlProvider key="en" locale="en">
      <ConfluenceClientsProvider config={confluenceConfig}>
        <CrossProductSearchDialog
          isExpanded={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          onNavigate={(href) => {
            window.open(href, '_blank');
          }}
          products={[Products.confluence]}
          user={user}
          ref={ref}
        />
      </ConfluenceClientsProvider>
    </IntlProvider>
  );
};

export default SearchDialog;
