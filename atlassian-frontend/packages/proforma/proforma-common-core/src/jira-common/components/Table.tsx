import React from 'react';

import { observer } from 'mobx-react';

import { DynamicTableStateless } from '@atlaskit/dynamic-table';
import { RowCellType } from '@atlaskit/dynamic-table/types';

import { SearchStore } from '../stores/domain/Search-store';

@observer
// eslint-disable-next-line @repo/internal/react/no-class-components
export class Table<RowType> extends React.Component<{
  store: SearchStore<RowType>;
  columns: any;
  renderRow: any;
  filter?: (r: RowType) => boolean;
}> {
  store: SearchStore<RowType>;

  columns: any;

  renderRow: any;

  filter: (r: RowType) => boolean;

  constructor(props: any) {
    super(props);
    this.store = props.store;
    this.columns = props.columns;
    this.renderRow = props.renderRow;
    this.filter = props.filter;
  }

  render() {
    const { loading, sortKey, sortOrder, items } = this.store;

    const filteredItems = this.filter ? items.filter(this.filter) : items;

    return (
      <div>
        <DynamicTableStateless
          head={this.columns}
          rows={filteredItems.map((item, index) => this.renderRow(item, index))}
          loadingSpinnerSize="large"
          isLoading={loading}
          isFixedSize
          sortKey={sortKey}
          sortOrder={sortOrder}
          onSort={(e: RowCellType) => this.store.sortBy(e)}
        />
      </div>
    );
  }
}
