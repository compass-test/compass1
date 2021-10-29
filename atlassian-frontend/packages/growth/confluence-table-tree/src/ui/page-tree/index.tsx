import React, { Component } from 'react';
import TableTree, {
  Rows,
  Row,
  Cell,
  TableTreeDataHelper,
} from '@atlaskit/table-tree';
import {
  UIAnalyticsEvent,
  withAnalyticsEvents,
} from '@atlaskit/analytics-next';
import {
  fireUIAnalytics,
  fireOperationalAnalytics,
} from '@atlassian/analytics-bridge';
import OriginTracing from '@atlassiansox/origin-tracing';
import { OriginAnalyticsAttributes } from '@atlassiansox/origin-tracing/types';

import { Contributors } from '../../components/Contributors';
import { ErrorState } from '../../components/ErrorState';
import { getChildren } from '../../services/confluence';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import ErrorRow from '../../components/ErrorRow';
import { Errors, TreeStates, PageData, PageTreeItem } from '../../types';
import LastUpdated from '../last-updated';
import Link from '../link-with-analytics';
import { TableTreeWrapper } from './styled';

import {
  PageTreeBaseWithoutHeadingProps,
  PageTreeBaseWithoutHeadingState,
} from './types';

const tableTreeDataHelper = new TableTreeDataHelper({ key: 'id' });

export class PageTreeBaseWithoutHeading extends Component<
  PageTreeBaseWithoutHeadingProps & InjectedIntlProps,
  PageTreeBaseWithoutHeadingState
> {
  static defaultProps: Partial<PageTreeBaseWithoutHeadingProps> = {
    readOnly: false,
    contentId: null,
  };

  state: PageTreeBaseWithoutHeadingState = {
    items: null,
    errorType: null,
    stickyRowContentId: null,
  };

  componentDidMount() {
    // eslint-disable-next-line
    this.loadChildrenFor();
    this.handleUpdateStatus(TreeStates.Loading);
  }

  // TODO: componentWillReceiveProps is being deprecated in a future version of React
  // Investigate replacing this with getDerivedStateFromProps
  // https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html
  componentWillReceiveProps(nextProps: PageTreeBaseWithoutHeadingProps) {
    const { contentId } = this.props;
    const { contentId: nextContentId } = nextProps;

    if (nextContentId !== contentId) {
      this.setState({
        errorType: null,
      });
    }
  }

  componentDidUpdate(
    prevProps: PageTreeBaseWithoutHeadingProps,
    prevState: PageTreeBaseWithoutHeadingState,
  ) {
    const { contentId } = this.props;
    const { contentId: prevContentId } = prevProps;

    const { items, errorType } = this.state;
    const { items: prevItems, errorType: prevErrorType } = prevState;
    if (contentId !== prevContentId) {
      this.loadChildrenFor();
      this.handleUpdateStatus(TreeStates.Loading);
    } else if (
      errorType === null &&
      (prevItems === null || prevItems.length === 0) &&
      items !== prevItems
    ) {
      this.handleUpdateStatus(TreeStates.RenderedChildren);
    } else if (errorType !== null && errorType !== prevErrorType) {
      if (errorType === Errors.Empty) {
        this.handleUpdateStatus(TreeStates.Empty);
      } else if (errorType === Errors.Error) {
        this.handleUpdateStatus(TreeStates.Error);
      }
    }
  }

  loadChildrenFor = async (parentItem?: PageTreeItem) => {
    const {
      contentId = '',
      spaceKey = null,
      createAnalyticsEvent,
    } = this.props;
    const { items } = this.state;
    if (contentId === null && spaceKey === null) {
      return;
    }
    if (!parentItem) {
      try {
        const children = await getChildren(spaceKey, contentId);
        const newErrorState = children.length === 0 ? Errors.Empty : null;

        if (!newErrorState) {
          if (createAnalyticsEvent) {
            fireOperationalAnalytics(
              createAnalyticsEvent({}),
              'confluencePageTree shown',
              {
                pageCount: children.length,
                root: true,
              },
            );
          }
        }

        this.setState({
          errorType: newErrorState,
          items: tableTreeDataHelper.updateItems(children, items, null),
        });
      } catch (err) {
        const { message } = err;
        const newErrorState = message.includes('404')
          ? Errors.Empty
          : Errors.Error;
        if (createAnalyticsEvent) {
          fireOperationalAnalytics(
            createAnalyticsEvent({}),
            'confluencePageTree failed',
            {
              root: true,
              error: String(message),
            },
          );
        }
        this.setState({ errorType: newErrorState });
      }
    } else {
      try {
        const children = await getChildren(null, parentItem.id);
        if (createAnalyticsEvent) {
          fireOperationalAnalytics(
            createAnalyticsEvent({}),
            'confluencePageTree shown',
            {
              pageCount: children.length,
              root: false,
            },
          );
        }

        const updatedItems = tableTreeDataHelper.updateItems(
          children,
          items,
          parentItem,
        );

        this.setState({
          items: updatedItems,
        });
      } catch (error) {
        const { onError } = this.props;
        const message =
          typeof error === 'string' ? 'Failed to fetch' : error.message;

        if (createAnalyticsEvent) {
          fireOperationalAnalytics(
            createAnalyticsEvent({}),
            'confluencePageTree failed',
            {
              root: false,
              error: String(message),
            },
          );
        }
        const updatedItems = tableTreeDataHelper.updateItems(
          [{ error: true }],
          items,
          parentItem,
        );
        this.setState({
          items: updatedItems,
        });
        onError && onError(error);
      }
    }
  };

  handleRowExpand = async (
    rowData: PageTreeItem,
    analyticsEvent: UIAnalyticsEvent,
  ) => {
    fireUIAnalytics(analyticsEvent, 'confluencePageTree');
    await this.loadChildrenFor(rowData);
  };

  handleRowCollapse = (_: PageTreeItem, analyticsEvent: UIAnalyticsEvent) => {
    fireUIAnalytics(analyticsEvent, 'confluencePageTree');
  };

  handleClickOnPageLink = (
    analyticsEvent: UIAnalyticsEvent,
    originAttributes: OriginAnalyticsAttributes,
  ) => {
    fireUIAnalytics(analyticsEvent, 'confluencePageTreeLink', {
      ...originAttributes,
    });
  };

  handleUpdateStatus = (status: TreeStates) => {
    const { onStateChanged } = this.props;
    onStateChanged && onStateChanged(status);
  };

  handleShareToggle = (page: PageData, isOpen: boolean) => {
    this.setState({
      stickyRowContentId: isOpen ? page.id : null,
    });
  };

  render() {
    const { cloudId = '', spaceKey, contentId, readOnly } = this.props;
    const { errorType, items } = this.state;
    let tableBody;
    const origin = new OriginTracing({ product: 'jira' });
    const originAttributes = origin.toAnalyticsAttributes({
      hasGeneratedId: true,
    });

    const getTableRow = ({ error, children, ...page }: PageTreeItem) => {
      if (error) {
        return <ErrorRow />;
      }
      const {
        id,
        childTypes,
        _links,
        title,
        history: { contributors, lastUpdated } = {},
      } = page;

      const url = origin.addToUrl(`${_links.base}${_links.webui}`);

      return (
        <Row
          itemId={id}
          items={children}
          hasChildren={childTypes.page.value}
          onExpand={this.handleRowExpand}
          onCollapse={this.handleRowCollapse}
        >
          <Cell width="55%" singleLine className="cell">
            <Link
              onClick={(
                _: React.MouseEvent,
                analyticsEvent: UIAnalyticsEvent,
              ) => this.handleClickOnPageLink(analyticsEvent, originAttributes)}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {title}
            </Link>
          </Cell>
          <Cell width="10%" className="cell">
            <Contributors
              cloudId={cloudId}
              contributors={contributors}
              isAvatarTooltipDisabled
            />
          </Cell>
          <Cell width="35%" singleLine className="cell x-end">
            <LastUpdated lastUpdated={lastUpdated} />
          </Cell>
        </Row>
      );
    };
    if (contentId === null && spaceKey === null) {
      tableBody = null;
    } else if (errorType) {
      if (spaceKey) {
        tableBody = (
          <ErrorState
            type={errorType}
            spaceKey={spaceKey}
            readOnly={readOnly}
          />
        );
      } else {
        tableBody = <ErrorState type={errorType} readOnly={readOnly} />;
      }
    } else {
      tableBody = <Rows key={contentId} items={items} render={getTableRow} />;
    }

    return (
      <TableTreeWrapper>
        <TableTree>{tableBody}</TableTree>
      </TableTreeWrapper>
    );
  }
}

export default withAnalyticsEvents()(injectIntl(PageTreeBaseWithoutHeading));
