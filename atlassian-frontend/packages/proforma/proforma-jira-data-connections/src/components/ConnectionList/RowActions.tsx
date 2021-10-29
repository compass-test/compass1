import React from 'react';

import { observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl';

import Button, { ButtonGroup } from '@atlaskit/button';
import {
  CommonMessage,
  IntlCommonMessages,
} from '@atlassian/proforma-common-core/jira-common';

interface RowActionsProps {
  editRow: () => void;
  showDelete: boolean;
  deleteRow: () => void;
}

export const RowActions = observer(
  ({ editRow, showDelete, deleteRow }: RowActionsProps) => {
    return (
      <div className="align-right">
        <ButtonGroup>
          <Button spacing="compact" onClick={editRow}>
            <FormattedMessage {...IntlCommonMessages[CommonMessage.Edit]} />
          </Button>
          {showDelete && (
            <Button spacing="compact" onClick={deleteRow}>
              <FormattedMessage {...IntlCommonMessages[CommonMessage.Delete]} />
            </Button>
          )}
        </ButtonGroup>
      </div>
    );
  },
);
