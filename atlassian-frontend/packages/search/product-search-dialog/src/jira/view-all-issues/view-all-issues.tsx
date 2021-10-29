import React, { useCallback } from 'react';
import SearchIcon from '@atlaskit/icon/glyph/search';
import {
  ReturnIcon,
  useKeyboardNavigation,
  LinkComponent,
} from '@atlassian/search-dialog';
import {
  AdvancedSearchLink,
  AdvancedSearchContent,
  CenteredAdvancedSearchGroup,
} from '../../common/advanced-search-link';
import { messages } from '../../messages';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';
import { getTrigger, isNewTab, withAnalytics } from '../../common/analytics';
import {
  AdvancedSearchLinkSubjectId,
  AdvancedSearchAnalyticsProps,
  Trigger,
  onAdvancedSearchSelected,
} from '../../common/analytics/events';
import { useFiltersAdvancedSearchUrlFactory } from '../jira-advanced-search-url-factory';
import { useJiraSearchClientContext } from '../clients';

interface Props {
  query: string;
  linkComponent?: LinkComponent;
  advancedSearchSelected: (props: AdvancedSearchAnalyticsProps) => any;
  onClick: (href: string, event: React.MouseEvent | KeyboardEvent) => void;
}

const onAdvancedSearchClicked = (
  e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  props: Props,
  href: string,
) => {
  const { advancedSearchSelected, onClick } = props;
  advancedSearchSelected({
    trigger: getTrigger(e),
    actionSubjectId: AdvancedSearchLinkSubjectId.JIRA_ISSUES,
    isLoading: false,
    newTab: isNewTab(e),
  });
  onClick(href, e);
};

const onKeyDown = (
  e: KeyboardEvent,
  href: string,
  advancedSearchSelected: (props: AdvancedSearchAnalyticsProps) => any,
  onClick: (href: string, event: React.MouseEvent | KeyboardEvent) => void,
) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    advancedSearchSelected({
      trigger: Trigger.RETURN,
      actionSubjectId: AdvancedSearchLinkSubjectId.JIRA_ISSUES,
      isLoading: false,
      newTab: false,
    });
    onClick(href, e);
  }
};

function ViewAllIssuesLink(props: Props & InjectedIntlProps) {
  const { query, linkComponent, advancedSearchSelected, intl, onClick } = props;
  const { siteUrl } = useJiraSearchClientContext();
  const href = useFiltersAdvancedSearchUrlFactory()(query, siteUrl);

  const [isKeyboardHighlighted, ref] = useKeyboardNavigation<HTMLSpanElement>({
    onKeydownCallback: useCallback(
      (e) => onKeyDown(e, href, advancedSearchSelected, onClick),
      [advancedSearchSelected, href, onClick],
    ),
  });

  return (
    <span
      ref={ref}
      data-test-id={'jira-view-all-issues'}
      style={{ width: '100%', display: 'flex' }}
    >
      <AdvancedSearchLink
        onClick={(e: any) => onAdvancedSearchClicked(e, props, href)}
        href={href}
        isKeyboardHighlighted={isKeyboardHighlighted}
        linkComponent={linkComponent}
      >
        <CenteredAdvancedSearchGroup>
          <SearchIcon
            size="small"
            label={intl.formatMessage(messages.jira_view_all_issues)}
          />
          <AdvancedSearchContent>
            <FormattedMessage {...messages.jira_view_all_issues} />
          </AdvancedSearchContent>
        </CenteredAdvancedSearchGroup>
        <ReturnIcon inverted={isKeyboardHighlighted} />
      </AdvancedSearchLink>
    </span>
  );
}

export const ViewAllIssuesLinkWithIntl = injectIntl(ViewAllIssuesLink);

export default withAnalytics({
  advancedSearchSelected: onAdvancedSearchSelected,
})(injectIntl(ViewAllIssuesLink));
