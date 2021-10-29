import React, { useCallback, useState } from 'react';
import TableTree, { Cell, Row, Rows } from '@atlaskit/table-tree';
import { UIAnalyticsEvent } from '@atlaskit/analytics-next';
import { fireUIAnalytics } from '@atlassian/analytics-bridge';
import OriginTracing from '@atlassiansox/origin-tracing';

import { Contributors } from '../../components/Contributors';
import { ErrorState } from '../../components/ErrorState';
import { injectIntl } from 'react-intl';
import ErrorRow from '../../components/ErrorRow';
import { PageTreeItem } from '../../types';
import LastUpdated from '../last-updated';
import Link from '../link-with-analytics';
import { HoverWrapper, TableTreeWrapper } from './styled';
import PageControls from './page-controls';
import { InjectedIntlProps } from 'react-intl';
import {
  PageTreeBaseForEmbeddedPagesProps,
  PageTreeItemProperties,
} from './types';
import { useConfluencePageTreeContext } from '../../controllers/page-tree';
import Tooltip from '@atlaskit/tooltip';
import Lozenge from '@atlaskit/lozenge';
import { gridSize } from '@atlaskit/theme/constants';
import styled from '@emotion/styled';
import messages from './messages';
import { pageAnalyticsAttributes } from './utils';
import { useDraftsToggle } from '../../controllers/drafts-toggle';
import { getPageTreeItemProperties } from '../../controllers/page-tree/utils';

const TooltipContainer = styled.span`
  display: inline-block;
  padding-left: ${gridSize()}px;
  cursor: pointer;
  flex-shrink: 0;
`;

const StyledLink = styled(Link)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: block;
`;

const PageTreeBaseForEmbeddedPages = ({
  readOnly,
  cloudId = null,
  onEdit,
  onView,
  onAddChildPage,
  intl: { formatMessage },
}: PageTreeBaseForEmbeddedPagesProps & InjectedIntlProps) => {
  const {
    items,
    errorType,
    rootContentId,
    spaceKey,
    expandSubtree,
    collapseSubtree,
  } = useConfluencePageTreeContext();
  const [stickyRowContentId, setStickyRowContentId] = useState<string | null>(
    null,
  );
  const [{ isDraftsShown }] = useDraftsToggle();
  const handleRowExpand = useCallback(
    async (rowData: PageTreeItem, analyticsEvent: UIAnalyticsEvent) => {
      fireUIAnalytics(analyticsEvent, 'confluencePageTree');
      await expandSubtree(rowData.id);
    },
    [expandSubtree],
  );

  const handleRowCollapse = useCallback(
    (rowData: PageTreeItem, analyticsEvent: UIAnalyticsEvent) => {
      collapseSubtree(rowData.id);
      fireUIAnalytics(analyticsEvent, 'confluencePageTree');
    },
    [collapseSubtree],
  );

  const handleClickOnPageLink = useCallback(
    (
      event: React.MouseEvent,
      pageProperties: PageTreeItemProperties,
      analyticsEvent: UIAnalyticsEvent,
      origin: OriginTracing,
    ) => {
      fireUIAnalytics(analyticsEvent, 'confluencePageTreeLink', {
        ...origin.toAnalyticsAttributes({ hasGeneratedId: true }),
        ...pageAnalyticsAttributes(pageProperties),
      });
      if (!(event.ctrlKey || event.metaKey || event.shiftKey)) {
        if (typeof onView === 'function' && !pageProperties.isDraft) {
          event.preventDefault();
          onView(pageProperties);
        } else if (typeof onEdit === 'function') {
          event.preventDefault();
          onEdit(pageProperties);
        }
      }
    },
    [onView, onEdit],
  );

  const handleShareToggle = useCallback(
    (page: PageTreeItemProperties, isOpen: boolean) => {
      setStickyRowContentId(isOpen ? page.id : null);
    },
    [],
  );

  const getTableRow = useCallback(
    ({ error, children, ...page }: PageTreeItem): React.ReactNode => {
      if (error) {
        return <ErrorRow />;
      }
      const {
        id,
        childTypes,
        hasDraftChildren,
        title,
        history: { contributors, lastUpdated } = {},
        isExpanded,
      } = page;

      const origin = new OriginTracing({ product: 'jira' });
      const pageItem = getPageTreeItemProperties(page);
      pageItem.url = origin.addToUrl(pageItem.url);
      pageItem.editUrl = origin.addToUrl(pageItem.editUrl);

      return (
        <Row
          itemId={id}
          items={children}
          hasChildren={
            childTypes.page.value || (hasDraftChildren && isDraftsShown)
          }
          isExpanded={isExpanded}
          onExpand={handleRowExpand}
          onCollapse={handleRowCollapse}
        >
          <Cell width="55%" singleLine className="cell x-start">
            <StyledLink
              onClick={(
                event: React.MouseEvent,
                analyticsEvent: UIAnalyticsEvent,
              ) =>
                handleClickOnPageLink(event, pageItem, analyticsEvent, origin)
              }
              href={pageItem.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {title ? title : formatMessage(messages.defaultPageTitle)}
            </StyledLink>
            {pageItem.isDraft && (
              <Tooltip
                content={formatMessage(messages.draftPageTooltip)}
                position="top"
              >
                <TooltipContainer>
                  <Lozenge appearance="inprogress">
                    {formatMessage(messages.draftPageLozenge)}
                  </Lozenge>
                </TooltipContainer>
              </Tooltip>
            )}
          </Cell>
          <Cell width="10%" className="cell">
            <Contributors
              cloudId={cloudId}
              contributors={contributors}
              isAvatarTooltipDisabled
            />
          </Cell>
          <Cell width="35%" singleLine className="cell x-end">
            {stickyRowContentId !== id && (
              <span className="hoverHide">
                <LastUpdated lastUpdated={lastUpdated} />
              </span>
            )}
            <span
              className={stickyRowContentId === id ? undefined : 'hoverShow'}
            >
              <PageControls
                page={pageItem}
                onEditClick={onEdit}
                onShareToggle={handleShareToggle}
                onAddChildClick={onAddChildPage}
                readOnly={readOnly}
                origin={origin}
              />
            </span>
          </Cell>
        </Row>
      );
    },
    [
      cloudId,
      formatMessage,
      handleClickOnPageLink,
      handleRowCollapse,
      handleRowExpand,
      handleShareToggle,
      isDraftsShown,
      onAddChildPage,
      onEdit,
      readOnly,
      stickyRowContentId,
    ],
  );

  let tableBody;
  if (rootContentId === null && spaceKey === null) {
    tableBody = null;
  } else if (errorType) {
    if (spaceKey) {
      tableBody = (
        <ErrorState type={errorType} spaceKey={spaceKey} readOnly={readOnly} />
      );
    } else {
      tableBody = <ErrorState type={errorType} readOnly={readOnly} />;
    }
  } else {
    tableBody = (
      <HoverWrapper>
        <Rows key={rootContentId} items={items} render={getTableRow} />
      </HoverWrapper>
    );
  }

  return (
    <TableTreeWrapper>
      <TableTree>{tableBody}</TableTree>
    </TableTreeWrapper>
  );
};

export default injectIntl(PageTreeBaseForEmbeddedPages);
