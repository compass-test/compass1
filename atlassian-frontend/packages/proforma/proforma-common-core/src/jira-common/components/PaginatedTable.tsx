import React from 'react';

import { observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import Button from '@atlaskit/button';
import { DynamicTableStateless } from '@atlaskit/dynamic-table';

import { CommonMessage, IntlCommonMessages } from '../CommonMessages.intl';
import { SearchStore } from '../stores/domain/Search-store';

@observer
// eslint-disable-next-line @repo/internal/react/no-class-components
export class PaginatedTable<RowType> extends React.Component<{
  store: SearchStore<RowType>;
  columns: any;
  renderRow: any;
}> {
  store: SearchStore<RowType>;

  columns: any;

  renderRow: any;

  constructor(props: any) {
    super(props);
    this.store = props.store;
    this.columns = props.columns;
    this.renderRow = props.renderRow;
  }

  render() {
    const {
      loading,
      pageSize,
      sortKey,
      sortOrder,
      start,
      end,
      total,
      items,
      hasPrevPage,
      hasNextPage,
    } = this.store;

    return (
      <div>
        <DynamicTableStateless
          head={this.columns}
          rows={items.map((item, index) => this.renderRow(item, index))}
          loadingSpinnerSize="large"
          isLoading={loading}
          isFixedSize
          sortKey={sortKey}
          sortOrder={sortOrder}
          onSort={(e: any) => this.store.sortBy(e)}
          onSetPage={() =>
            // eslint-disable-next-line no-console
            console.log('onSetPage')
          }
        />
        {loading ? null : (
          <Pagination
            pageSize={pageSize}
            start={start}
            end={end}
            total={total}
            hasPrev={hasPrevPage}
            hasNext={hasNextPage}
            onPrev={() => this.store.prevPage()}
            onNext={() => this.store.nextPage()}
            onPageSizeChanged={(pageSize: any) =>
              this.store.setPageSize(pageSize)
            }
          />
        )}
      </div>
    );
  }
}

const PaginationWrapper = styled.div`
  margin: 10px 0;
  display: flex;
`;

const PageSizes = styled.div`
  display: inline-flex;
  align-items: center;
  > * {
    margin-right: 20px;
  }
  > a {
    cursor: pointer;
  }
  > a.active {
    font-weight: bold;
    text-decoration: underline;
  }
`;

const PageSummary = styled.div`
  display: inline-flex;
  align-items: center;
  margin-left: auto;
  margin-right: 30px;
`;

export const Pagination = ({
  pageSize,
  start,
  end,
  total,
  hasPrev,
  hasNext,
  onPrev,
  onNext,
  onPageSizeChanged,
}: any) => (
  <PaginationWrapper>
    <PageSizes>
      <span>
        <FormattedMessage {...IntlCommonMessages[CommonMessage.View]} />:
      </span>
      <a
        className={pageSize === 10 ? 'active' : ''}
        onClick={() => onPageSizeChanged(10)}
      >
        10
      </a>
      <a
        className={pageSize === 25 ? 'active' : ''}
        onClick={() => onPageSizeChanged(25)}
      >
        25
      </a>
      <a
        className={pageSize === 50 ? 'active' : ''}
        onClick={() => onPageSizeChanged(50)}
      >
        50
      </a>
    </PageSizes>

    <PageSummary>
      {!total ? (
        ''
      ) : (
        <span>
          <FormattedMessage {...IntlCommonMessages[CommonMessage.Showing]} />{' '}
          {start + 1}-{end}{' '}
          <FormattedMessage {...IntlCommonMessages[CommonMessage.Of]} /> {total}
        </span>
      )}
    </PageSummary>
    <Button
      testId="proforma-pagination-prev"
      appearance="link"
      isDisabled={!hasPrev}
      onClick={() => onPrev()}
    >
      <FormattedMessage {...IntlCommonMessages[CommonMessage.Prev]} />
    </Button>
    <Button appearance="link" isDisabled={!hasNext} onClick={() => onNext()}>
      <FormattedMessage {...IntlCommonMessages[CommonMessage.Next]} />
    </Button>
  </PaginationWrapper>
);
