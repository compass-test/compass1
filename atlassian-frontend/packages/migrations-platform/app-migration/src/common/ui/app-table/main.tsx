import React, { FC, ReactNode } from 'react';

import { FormattedMessage } from 'react-intl';

import DynamicTable from '@atlaskit/dynamic-table';
import type { StatefulProps } from '@atlaskit/dynamic-table/types';
import EmptyState from '@atlaskit/empty-state';
import { AnalyticsButton } from '@atlassian/mpt-elements';

import illustrationUrl from './assets/empty-table.svg';
import messages from './messages';

export type Props = StatefulProps & {
  // It's used in the empty view for customized description.
  // Only allowed children of a `<p />` should be provided.
  emptyDescription?: ReactNode;
  // It's used in the empty view for customized header.
  emptyHeader?: string;
  // It's used in the empty view for user to quickly navigate back to the home page.
  onHome?: () => void;
};

const AppTable: FC<Props> = ({
  emptyDescription,
  emptyHeader = '',
  onHome,
  head,
  ...tableProps
}) => {
  const rowsCount = tableProps?.rows?.length || 0;
  const isLoading = tableProps?.isLoading || false;
  const mappedHead = head && {
    ...head,
    cells: head.cells.map((cell) => {
      return {
        ...cell,
        // Disable sorting of all headers if no children or the table is currently loading
        isSortable: cell.isSortable && rowsCount > 0 && !isLoading,
      };
    }),
  };

  return (
    <DynamicTable
      {...tableProps}
      isFixedSize
      loadingSpinnerSize="large"
      head={mappedHead}
      emptyView={
        <div data-testid="emptyState">
          <EmptyState
            header={emptyHeader}
            imageUrl={illustrationUrl}
            description={
              <>
                {emptyDescription && (
                  <>
                    <span>{emptyDescription}</span>
                    <br />
                  </>
                )}
                <FormattedMessage {...messages.emptyDescription} />
              </>
            }
            primaryAction={
              onHome && (
                <AnalyticsButton
                  appearance="primary"
                  analyticsId="migrationHomeButton"
                  testId="homeButton"
                  onClick={onHome}
                >
                  <FormattedMessage {...messages.migrationHomeCta} />
                </AnalyticsButton>
              )
            }
          />
        </div>
      }
    />
  );
};

export default AppTable;
