import React from 'react';
import { EmptyState, LinkComponent } from '@atlassian/search-dialog';
import { asyncComponent } from 'react-async-component';

import { InjectedIntlProps, injectIntl, FormattedMessage } from 'react-intl';
import { getTrigger, isNewTab } from '../../common/analytics';
import {
  AdvancedSearchAnalyticsProps,
  AdvancedSearchLinkSubjectId,
} from '../../common/analytics/events';
import { I18nTemplatedLink } from '../../common/i18n-templated-link';
import { messages } from '../../messages';
import Button from '@atlaskit/button';
import { ClearFiltersButtonWrapper } from './no-results.styled';

const Image = asyncComponent({
  resolve: () =>
    import(
      /* webpackChunkName: "@atlaskit-internal_product-search-dialog/async-chunk/no-result-image" */ './image'
    ),
});

export interface Props {
  advancedSearchUrl: string;
  linkComponent?: LinkComponent;
  advancedSearchSelected: (props: AdvancedSearchAnalyticsProps) => any;
  onClick?: (href: string, event: React.MouseEvent | KeyboardEvent) => void;
  isMultiSite?: boolean;
}

interface ContextProps {
  hasFilters?: boolean;
  clearFilters?: () => void;
}

export class NoResults extends React.Component<
  Props & InjectedIntlProps & ContextProps
> {
  onAdvancedSearchClicked = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ) => {
    const { advancedSearchSelected, onClick, advancedSearchUrl } = this.props;
    advancedSearchSelected({
      trigger: getTrigger(e),
      actionSubjectId: AdvancedSearchLinkSubjectId.NO_RESULTS,
      isLoading: false,
      newTab: isNewTab(e),
    });
    onClick && onClick(advancedSearchUrl, e);
  };

  getContent = () => {
    const {
      linkComponent,
      advancedSearchUrl,
      intl,
      hasFilters,
      clearFilters,
      isMultiSite,
    } = this.props;
    if (!hasFilters) {
      return (
        <span role="none" onClick={this.onAdvancedSearchClicked}>
          {isMultiSite || !advancedSearchUrl ? (
            <FormattedMessage
              {...messages.common_empty_state_body_no_advanced_search}
            />
          ) : (
            <I18nTemplatedLink
              linkComponent={linkComponent}
              href={advancedSearchUrl}
              i18nTemplateString={intl.formatMessage(
                messages.common_empty_state_body,
              )}
            />
          )}
        </span>
      );
    } else {
      return (
        <>
          <FormattedMessage tagName="div" {...messages.filters_applied} />
          <ClearFiltersButtonWrapper>
            <Button appearance="primary" onClick={clearFilters}>
              <FormattedMessage {...messages.clear_filters} />
            </Button>
          </ClearFiltersButtonWrapper>
        </>
      );
    }
  };

  render() {
    const { intl } = this.props;

    return (
      <EmptyState
        title={intl.formatMessage(messages.common_empty_state_heading)}
        Image={Image}
        content={this.getContent()}
      />
    );
  }
}

export default injectIntl(NoResults);
