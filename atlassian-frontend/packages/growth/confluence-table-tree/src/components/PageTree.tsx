import React, { Component } from 'react';
import TableTree, {
  Headers,
  Header,
  Rows,
  Row,
  Cell,
  TableTreeDataHelper,
} from '@atlaskit/table-tree';
import {
  UIAnalyticsEvent,
  withAnalyticsEvents,
  CreateUIAnalyticsEvent,
} from '@atlaskit/analytics-next';
import {
  fireUIAnalytics,
  fireOperationalAnalytics,
} from '@atlassian/analytics-bridge';
import OriginTracing from '@atlassiansox/origin-tracing';
import { OriginAnalyticsAttributes } from '@atlassiansox/origin-tracing/types';

import { Contributors } from './Contributors';
import LastUpdated from './LastUpdated';
import { ErrorState } from './ErrorState';
import { getChildren } from '../api/confluence';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';
import ErrorRow from './ErrorRow';
import { Errors, TreeStates } from '../types';
import Link from './Link';
import messages from '../messages';

interface PageTreeBaseProps {
  contentId?: string | null;
  cloudId?: string | null;
  spaceKey?: string | null;
  readOnly?: boolean;
  onError?: (error: Error) => void;
  onStateChanged?: (status: TreeStates) => void;
  createAnalyticsEvent?: CreateUIAnalyticsEvent;
}

interface PageTreeBaseState {
  items: Object[] | null;
  errorType: Errors | null;
}

const tableTreeDataHelper = new TableTreeDataHelper({ key: 'id' });

export class PageTreeBase extends Component<
  PageTreeBaseProps & InjectedIntlProps,
  PageTreeBaseState
> {
  static defaultProps: Partial<PageTreeBaseProps> = {
    readOnly: false,
    contentId: null,
  };

  state: PageTreeBaseState = {
    items: null,
    errorType: null,
  };

  componentDidMount() {
    // eslint-disable-next-line
    this.loadChildrenFor();
    this.handleUpdateStatus(TreeStates.Loading);
  }

  // TODO: componentWillReceiveProps is being deprecated in a future version of React
  // Investigate replacing this with getDerivedStateFromProps
  // https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html
  componentWillReceiveProps(nextProps: PageTreeBaseProps) {
    const { contentId } = this.props;
    const { contentId: nextContentId } = nextProps;

    if (nextContentId !== contentId) {
      this.setState({
        errorType: null,
      });
    }
  }

  componentDidUpdate(
    prevProps: PageTreeBaseProps,
    prevState: PageTreeBaseState,
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

  loadChildrenFor = async (parentItem?: Object) => {
    const { contentId = '', createAnalyticsEvent } = this.props;
    const { items } = this.state;
    if (contentId === null) {
      return;
    }
    if (!parentItem) {
      try {
        const children = await getChildren(contentId);
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
        const children = await getChildren((parentItem as any).id);
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
    rowData: Object,
    analyticsEvent: UIAnalyticsEvent,
  ) => {
    fireUIAnalytics(analyticsEvent, 'confluencePageTree');
    await this.loadChildrenFor(rowData);
  };

  handleRowCollapse = (rowData: Object, analyticsEvent: UIAnalyticsEvent) => {
    fireUIAnalytics(analyticsEvent, 'confluencePageTree');
  };

  handleClickOnPageLink = (
    _: any,
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

  render() {
    const {
      cloudId = '',
      spaceKey,
      contentId,
      readOnly,
      createAnalyticsEvent,
    } = this.props;
    const { errorType, items } = this.state;
    let tableBody;
    const origin = new OriginTracing({ product: 'jira' });
    const originAttributes = origin.toAnalyticsAttributes({
      hasGeneratedId: true,
    });

    const getTableRow = ({
      id,
      title,
      contributors,
      lastUpdated,
      childTypes,
      _links,
      error,
      children,
    }: any) =>
      error ? (
        <ErrorRow />
      ) : (
        <Row
          itemId={id}
          items={children}
          hasChildren={childTypes.page.value}
          onExpand={this.handleRowExpand}
          onCollapse={this.handleRowCollapse}
        >
          <Cell singleLine>
            <Link
              onClick={(_: any, analyticsEvent: UIAnalyticsEvent) =>
                this.handleClickOnPageLink(_, analyticsEvent, originAttributes)
              }
              href={origin.addToUrl(`/wiki${_links.webui}`)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {title}
            </Link>
          </Cell>
          <Cell>
            <Contributors cloudId={cloudId} contributors={contributors} />
          </Cell>
          <Cell>
            <LastUpdated lastUpdated={lastUpdated} />
          </Cell>
        </Row>
      );

    if (contentId === null) {
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
      <TableTree>
        <Headers>
          <Header
            width="55%"
            onClick={() => {
              if (createAnalyticsEvent) {
                const event = createAnalyticsEvent({
                  action: 'clicked',
                  actionSubject: 'tableTreeHeader',
                });
                fireUIAnalytics(event, 'confluencePageTreeTitleHeader');
              }
            }}
          >
            <FormattedMessage {...messages.title} />
          </Header>
          <Header
            width="25%"
            onClick={() => {
              if (createAnalyticsEvent) {
                const event = createAnalyticsEvent({
                  action: 'clicked',
                  actionSubject: 'tableTreeHeader',
                });
                fireUIAnalytics(event, 'confluencePageTreeContributorsHeader');
              }
            }}
          >
            <FormattedMessage {...messages.contributors} />
          </Header>
          <Header
            width="20%"
            onClick={() => {
              if (createAnalyticsEvent) {
                const event = createAnalyticsEvent({
                  action: 'clicked',
                  actionSubject: 'tableTreeHeader',
                });
                fireUIAnalytics(event, 'confluencePageTreeLastModifiedHeader');
              }
            }}
          >
            <FormattedMessage {...messages.lastModified} />
          </Header>
        </Headers>
        {tableBody}
      </TableTree>
    );
  }
}

export default withAnalyticsEvents()(injectIntl(PageTreeBase));
