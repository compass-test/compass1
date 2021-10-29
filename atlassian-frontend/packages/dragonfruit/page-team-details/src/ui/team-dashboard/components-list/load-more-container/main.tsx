import React from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';

import Button from '@atlaskit/button/custom-theme-button';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';

import { LoadMoreWrapper } from './styled';

type Props = {
  loading: boolean;
  onLoadMore?: () => void;
};

export const LoadMoreContainer = injectIntl(
  ({
    intl: { formatMessage },
    loading,
    onLoadMore,
  }: Props & InjectedIntlProps) => {
    return (
      <LoadMoreWrapper>
        <Button
          onClick={() => {
            if (onLoadMore) {
              onLoadMore();
            }
          }}
          isLoading={loading}
          appearance="default"
          testId="dragonfruit-page-component-list.ui.load-more-components"
        >
          {formatMessage(CommonMessages.loadMore)}
        </Button>
      </LoadMoreWrapper>
    );
  },
);
