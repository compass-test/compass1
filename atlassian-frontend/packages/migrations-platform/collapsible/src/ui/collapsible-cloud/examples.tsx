import React from 'react';

import { IntlProvider } from 'react-intl';

import CheckCircleIcon from '@atlaskit/icon/glyph/check-circle';
import * as colors from '@atlaskit/theme/colors';

import CollapsibleCloud, { Props } from './index';

type CollapsibleCloudExampleProps = {
  content: React.ReactNode;
} & Partial<Props>;

export const CollapsibleCloudWithContent: React.FC<CollapsibleCloudExampleProps> = ({
  content,
  collapseOnChangeOf,
}) => (
  <IntlProvider locale="en">
    <CollapsibleCloud
      icon={<CheckCircleIcon label="success" primaryColor={colors.G300} />}
      heading="The collapsible header"
      collapseOnChangeOf={collapseOnChangeOf}
    >
      {content}
    </CollapsibleCloud>
  </IntlProvider>
);
