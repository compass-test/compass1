import React, { useState } from 'react';

import { observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import Button from '@atlaskit/button';
import DynamicTable from '@atlaskit/dynamic-table';
import Lozenge from '@atlaskit/lozenge';
import PageHeading from '@atlaskit/page-header';
import Spinner from '@atlaskit/spinner';
import Tooltip from '@atlaskit/tooltip';
import { LearnMoreLink } from '@atlassian/proforma-common-core/jira-common';
import { DataConnectionStatus } from '@atlassian/proforma-common-core/jira-common-models';

import { ConnectionSummary } from '../../models/Connection';
import { DataConnectionsUtils } from '../../utils/DataConnectionsUtils';
import { DeleteDataConnectionModal } from '../DeleteConnection/DeleteDataConnectionModal';

import { ConnectionEmptyState } from './ConnectionEmptyState';
import {
  ConnectionListMessage,
  IntlConnectionListMessages,
} from './ConnectionListMessages.intl';
import { RowActions } from './RowActions';

interface ConnectionListProps {
  dataConnectionsUtils: DataConnectionsUtils;
  addDataConnection: () => void;
  editDataConnection: (connectionId: string) => void;
}

export const ConnectionList = observer(
  ({
    dataConnectionsUtils,
    addDataConnection,
    editDataConnection,
  }: ConnectionListProps) => {
    const [dataConnectionListStore] = useState(
      dataConnectionsUtils.createDataConnectionListStore(),
    );
    const [deleteConnectionId, setDeleteConnectionId] = useState<string>();
    const deleteDataConnection = (connectionId: string): void => {
      setDeleteConnectionId(connectionId);
    };
    const endDeleteDataConnection = (): void => {
      setDeleteConnectionId(undefined);
      dataConnectionListStore.loadSummaries();
    };

    return (
      <div>
        <PageHeading>
          <FormattedMessage
            {...IntlConnectionListMessages[
              ConnectionListMessage.ConnectionsHeader
            ]}
          />
        </PageHeading>
        <p>
          <FormattedMessage
            {...IntlConnectionListMessages[
              ConnectionListMessage.ConnectionsPara
            ]}
          />{' '}
          <LearnMoreLink href="http://links.thinktilt.net/data-lookups" />
        </p>
        <section>
          {dataConnectionListStore.loadingSummaries ? (
            <Spinner />
          ) : !dataConnectionListStore.hasConnectionSummaries ? (
            <ConnectionEmptyState addDataConnection={addDataConnection} />
          ) : (
            <div>
              <ActionBar>
                <Button onClick={() => addDataConnection()}>
                  <FormattedMessage
                    {...IntlConnectionListMessages[
                      ConnectionListMessage.AddConnectionBtn
                    ]}
                  />
                </Button>
              </ActionBar>
              <DynamicTable
                head={tableHeaders}
                rows={createRows(
                  dataConnectionListStore.connectionSummaries,
                  editDataConnection,
                  deleteDataConnection,
                )}
                isFixedSize
                defaultSortKey="name"
                defaultSortOrder="ASC"
              />
            </div>
          )}
        </section>
        {deleteConnectionId && (
          <DeleteDataConnectionModal
            connectionId={deleteConnectionId}
            dataConnectionsUtils={dataConnectionsUtils}
            deletedCallback={endDeleteDataConnection}
            cancelCallback={endDeleteDataConnection}
          />
        )}
      </div>
    );
  },
);

const tableHeaders = {
  cells: [
    {
      key: 'name',
      content: (
        <FormattedMessage
          {...IntlConnectionListMessages[ConnectionListMessage.TableHeaderName]}
        />
      ),
      isSortable: true,
      width: 20,
    },
    {
      key: 'source',
      content: (
        <FormattedMessage
          {...IntlConnectionListMessages[
            ConnectionListMessage.TableHeaderSource
          ]}
        />
      ),
      isSortable: true,
      width: 50,
    },
    {
      key: 'status',
      content: (
        <FormattedMessage
          {...IntlConnectionListMessages[
            ConnectionListMessage.TableHeaderStatus
          ]}
        />
      ),
      isSortable: true,
      width: 8,
    },
    {
      key: 'actions',
      content: '',
      isSortable: false,
      width: 13,
    },
  ],
};

const createRows = (
  connectionSummaries: ConnectionSummary[],
  editDataConnection: (connectionId: string) => void,
  deleteDataConnection: (connectionId: string) => void,
) => {
  return connectionSummaries.map(connectionSummary => ({
    key: `row-${connectionSummary.id}`,
    cells: [
      {
        key: 'name',
        content: connectionSummary.name,
      },
      {
        key: 'source',
        content: connectionSummary.source,
      },
      {
        key: 'status',
        content: (
          <React.Fragment>
            {connectionSummary.status === DataConnectionStatus.Ok && (
              <Lozenge appearance="success">
                <FormattedMessage
                  {...IntlConnectionListMessages[
                    ConnectionListMessage.ConnectionStatusOk
                  ]}
                />
              </Lozenge>
            )}
            {connectionSummary.status === DataConnectionStatus.Failing && (
              <Lozenge appearance="removed">
                <FormattedMessage
                  {...IntlConnectionListMessages[
                    ConnectionListMessage.ConnectionStatusFailing
                  ]}
                />
              </Lozenge>
            )}
            {connectionSummary.status === DataConnectionStatus.Deleted && (
              <Tooltip
                content={
                  <FormattedMessage
                    {...IntlConnectionListMessages[
                      ConnectionListMessage.ConnectionStatusDeletedTooltip
                    ]}
                  />
                }
                delay={0}
              >
                <Lozenge appearance="default">
                  <FormattedMessage
                    {...IntlConnectionListMessages[
                      ConnectionListMessage.ConnectionStatusDeleted
                    ]}
                  />
                </Lozenge>
              </Tooltip>
            )}
          </React.Fragment>
        ),
      },
      {
        key: 'actions',
        content: (
          <RowActions
            editRow={() => editDataConnection(connectionSummary.id)}
            showDelete={
              connectionSummary.status !== DataConnectionStatus.Deleted
            }
            deleteRow={() => deleteDataConnection(connectionSummary.id)}
          />
        ),
      },
    ],
  }));
};

const ActionBar = styled.div`
  text-align: right;
`;
