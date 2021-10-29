import React from 'react';
import { EmptyState } from '@atlassian/search-dialog';
import { asyncComponent } from 'react-async-component';

import { InjectedIntlProps, injectIntl } from 'react-intl';
import { messages } from '../../messages';

const Image = asyncComponent({
  resolve: () =>
    import(
      /* webpackChunkName: "@atlaskit-internal_product-search-dialog/async-chunk/prequery-image" */ './image'
    ),
});

const PreQueryErrorScreen: React.FunctionComponent<InjectedIntlProps> = ({
  intl,
}) => (
  <EmptyState
    title={intl.formatMessage(messages.common_error_state_prequery_heading)}
    Image={Image}
  />
);

export default injectIntl(PreQueryErrorScreen);
