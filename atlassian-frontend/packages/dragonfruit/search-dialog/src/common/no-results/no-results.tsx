import React from 'react';
import { LinkComponent } from '@atlassian/search-dialog';
import { EmptyState } from './empty-state';
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
import {
  ClearFiltersButtonWrapper,
  EmptyStateStyled,
} from './no-results.styled';

const Image = asyncComponent({
  resolve: () =>
    import(
      /* webpackChunkName: "@atlaskit-internal_compass-search-dialog/async-chunk/no-result-image" */ './image'
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
    } = this.props;
    if (!hasFilters) {
      return (
        <span role="none" onClick={this.onAdvancedSearchClicked}>
          <I18nTemplatedLink
            linkComponent={linkComponent}
            href={advancedSearchUrl}
            i18nTemplateString={intl.formatMessage(
              messages.common_empty_state_body,
            )}
          />
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
      <EmptyStateStyled>
        <EmptyState
          title={intl.formatMessage(messages.common_empty_state_heading)}
          Image={Image}
          content={this.getContent()}
        />
      </EmptyStateStyled>
    );
  }
}

export default injectIntl(NoResults);
