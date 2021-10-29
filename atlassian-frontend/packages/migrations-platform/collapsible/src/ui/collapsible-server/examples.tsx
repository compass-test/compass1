import React from 'react';

import { IntlProvider } from 'react-intl';

import CollapsibleServer, { Props } from './index';

type CollapsibleServerExampleProps = Partial<Props>;

export const CollapsibleServerWithContent: React.FC<CollapsibleServerExampleProps> = ({
  content,
  collapseOnChangeOf,
}) => (
  <IntlProvider locale="en">
    <CollapsibleServer
      heading="The collapsible header"
      collapseOnChangeOf={collapseOnChangeOf}
      content={content}
    />
  </IntlProvider>
);
