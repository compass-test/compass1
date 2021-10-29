import React, { useState } from 'react';

import { observer } from 'mobx-react';

import { DataConnectionsUtils } from '../utils/DataConnectionsUtils';

import { ConnectionList } from './ConnectionList/ConnectionList';
import {
  DataConnection,
  ExistingDataConnection,
  ModifyConnection,
  NewDataConnection,
} from './ModifyConnection/ModifyConnection';

interface DataConnectionsProps {
  dataConnectionsUtils: DataConnectionsUtils;
}

export const DataConnections: React.FC<DataConnectionsProps> = observer(
  ({ dataConnectionsUtils }) => {
    const [dataConnection, setDataConnection] = useState<DataConnection>();
    const clearDataConnection = (): void => {
      setDataConnection(undefined);
    };

    if (dataConnection) {
      return (
        <ModifyConnection
          dataConnection={dataConnection}
          dataConnectionsUtils={dataConnectionsUtils}
          clearDataConnection={clearDataConnection}
        />
      );
    }
    return (
      <ConnectionList
        dataConnectionsUtils={dataConnectionsUtils}
        addDataConnection={() => setDataConnection(NewDataConnection)}
        editDataConnection={(connectionId: string) =>
          setDataConnection(new ExistingDataConnection(connectionId))
        }
      />
    );
  },
);
