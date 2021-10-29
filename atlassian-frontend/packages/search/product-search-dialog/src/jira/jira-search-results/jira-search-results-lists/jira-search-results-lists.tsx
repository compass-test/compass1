import React from 'react';
import { InjectedIntlProps, InjectedIntl, injectIntl } from 'react-intl';
import BoardIcon from '@atlaskit/icon/glyph/board';
import FilterIcon from '@atlaskit/icon/glyph/filter';
import PlanIcon from './plan-icon';
import { LinkComponent } from '@atlassian/search-dialog';
import { messages } from '../../../messages';
import {
  Scope,
  AttributeType,
  AttributeFromScope,
  Result,
} from '../../clients/response-types';
import { UnreachableError } from '../../../utils/safety';
import { useSearchSessionId } from '../../../common/search-session-provider';
import Icon from './icon';
import { ScreenType } from '../../../common/analytics/events';
import { ProductSearchResult } from '../../../common/product-search-result';
import { attachJiraReferralIds } from '../../jira-search-results/jira-search-results-lists/attach-referral-ids';

function getTimeDetailForJiraIssueResult(
  intl: InjectedIntl,
  isRecentResult?: boolean,
  formatDate?: (updated: string) => JSX.Element,
  updated?: string,
): JSX.Element | undefined {
  if (isRecentResult) {
    const message = intl.formatMessage(
      messages.common_recently_viewed_section_heading,
    );
    return <span title={message}>{message}</span>;
  }

  if (formatDate && updated) {
    return formatDate(updated);
  }

  return undefined;
}

export type SearchResultsListProps<S extends Scope = Scope> = {
  results: Result<AttributeFromScope<S>>[];
  linkComponent?: LinkComponent;
  onSelect: (event: React.MouseEvent | KeyboardEvent, href: string) => void;
  screenType: ScreenType;
  analyticContext: {
    sectionIndex: number;
    // This is the total number of items that were rendered in sections that appear before this
    totalNumberOfItemsInPreviousSections: number;
  };
  isCollapsed?: boolean;
  formatDate?: (updated: string) => JSX.Element;
};

function IssueSearchResultsListWithoutIntl({
  results,
  linkComponent,
  onSelect,
  screenType,
  isCollapsed,
  intl,
  formatDate,
  analyticContext: { sectionIndex, totalNumberOfItemsInPreviousSections },
}: SearchResultsListProps<Scope.JiraIssue> & InjectedIntlProps) {
  const searchSessionId = useSearchSessionId();

  return (
    <>
      {results.map(
        (
          {
            name,
            resultId,
            attributes: {
              key,
              container,
              avatar,
              issueTypeName,
              containerId,
              updated,
              isRecentResult,
            },
            href,
            isCached,
          },
          index,
        ) => {
          const hrefWithReferrals = attachJiraReferralIds(href, {
            searchSessionId,
            searchObjectId: resultId,
            searchContainerId: containerId,
            searchContentType: 'issue',
          });

          return (
            <ProductSearchResult
              key={key}
              label={key}
              title={name}
              isCollapsed={isCollapsed}
              href={hrefWithReferrals}
              onSelect={(e: React.MouseEvent | KeyboardEvent) =>
                onSelect(e, hrefWithReferrals)
              }
              icon={
                <Icon
                  avatar={avatar}
                  alt={issueTypeName}
                  isCollapsed={isCollapsed}
                />
              }
              containerDetail={container?.title ?? ''}
              timeDetail={getTimeDetailForJiraIssueResult(
                intl,
                isRecentResult,
                formatDate,
                updated,
              )}
              linkComponent={linkComponent}
              screen={screenType}
              analyticContext={{
                sectionId: 'jira-issue',
                sectionIndex,
                globalIndex: totalNumberOfItemsInPreviousSections + index,
                indexWithinSection: index,
                containerId: containerId,
                isCached,
              }}
            />
          );
        },
      )}
    </>
  );
}

export const IssueSearchResultsList = injectIntl(
  IssueSearchResultsListWithoutIntl,
);

export function BoardsProjectFiltersSearchResultsList({
  results,
  linkComponent,
  onSelect,
  screenType,
  isCollapsed,
  analyticContext: { sectionIndex, totalNumberOfItemsInPreviousSections },
}: SearchResultsListProps<Scope.JiraBoardProjectFilterPlan>) {
  const searchSessionId = useSearchSessionId();
  return (
    <>
      {results.map(({ name, attributes, href, isCached, resultId }, index) => {
        const commonProps = {
          key: `${name}_${index}`,
          title: name,
          linkComponent,
          screen: screenType,
          isCollapsed,
        };
        switch (attributes['@type']) {
          case AttributeType.board: {
            const hrefWithIds = attachJiraReferralIds(href, {
              searchSessionId,
              searchObjectId: resultId,
              searchContainerId: attributes.containerId,
              searchContentType: 'board',
            });
            return (
              <ProductSearchResult
                {...commonProps}
                href={hrefWithIds}
                onSelect={(e: React.MouseEvent | KeyboardEvent) =>
                  onSelect(e, hrefWithIds)
                }
                icon={
                  <BoardIcon size={isCollapsed ? 'medium' : 'small'} label="" />
                }
                containerDetail={
                  attributes.containerName ?? attributes.container?.title
                }
                analyticContext={{
                  sectionId: 'jira-board-project-filter',
                  sectionIndex,
                  globalIndex: totalNumberOfItemsInPreviousSections + index,
                  indexWithinSection: index,
                  containerId: attributes.containerId,
                  isCached,
                }}
              />
            );
          }
          case AttributeType.project: {
            const hrefWithIds = attachJiraReferralIds(href, {
              searchSessionId,
              searchObjectId: resultId,
              searchContentType: 'project',
            });
            return (
              <ProductSearchResult
                {...commonProps}
                href={hrefWithIds}
                onSelect={(e: React.MouseEvent | KeyboardEvent) =>
                  onSelect(e, hrefWithIds)
                }
                icon={
                  <Icon
                    avatar={attributes.avatar}
                    alt={attributes.projectType}
                    isCollapsed={isCollapsed}
                  />
                }
                analyticContext={{
                  sectionId: 'jira-board-project-filter',
                  sectionIndex,
                  globalIndex: totalNumberOfItemsInPreviousSections + index,
                  indexWithinSection: index,
                  containerId: null,
                  isCached,
                }}
              />
            );
          }
          case AttributeType.filter: {
            const hrefWithIds = attachJiraReferralIds(href, {
              searchSessionId,
              searchObjectId: resultId,
              searchContentType: 'filter',
            });
            return (
              <ProductSearchResult
                {...commonProps}
                href={hrefWithIds}
                onSelect={(e: React.MouseEvent | KeyboardEvent) =>
                  onSelect(e, hrefWithIds)
                }
                icon={
                  <FilterIcon
                    size={isCollapsed ? 'medium' : 'small'}
                    label=""
                  />
                }
                analyticContext={{
                  sectionId: 'jira-board-project-filter',
                  sectionIndex,
                  globalIndex: totalNumberOfItemsInPreviousSections + index,
                  indexWithinSection: index,
                  containerId: null,
                  isCached,
                }}
              />
            );
          }
          case AttributeType.plan: {
            const hrefWithIds = attachJiraReferralIds(href, {
              searchSessionId,
              searchObjectId: resultId,
              searchContentType: 'plan',
            });
            return (
              <ProductSearchResult
                {...commonProps}
                href={hrefWithIds}
                onSelect={(e: React.MouseEvent | KeyboardEvent) =>
                  onSelect(e, hrefWithIds)
                }
                icon={<PlanIcon label="" isCollapsed={isCollapsed} />}
                analyticContext={{
                  sectionId: 'jira-board-project-filter',
                  sectionIndex,
                  globalIndex: totalNumberOfItemsInPreviousSections + index,
                  indexWithinSection: index,
                  containerId: null,
                  isCached,
                }}
              />
            );
          }
          default:
            throw new UnreachableError(attributes);
        }
      })}
    </>
  );
}
