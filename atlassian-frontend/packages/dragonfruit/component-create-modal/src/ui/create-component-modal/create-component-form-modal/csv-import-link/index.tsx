import React from 'react';

import { useRouterActions } from 'react-resource-router';

import { UIAnalyticsEvent } from '@atlaskit/analytics-next';
import Button from '@atlaskit/button';
import { KeyboardOrMouseEvent, OnCloseHandler } from '@atlaskit/modal-dialog';
import { routes } from '@atlassian/dragonfruit-routes';
import { useIntl } from '@atlassian/dragonfruit-utils';

import message from './messages';
import { CsvImportLinkWrapper } from './styled';

type CsvImportLinkProps = {
  onClick: OnCloseHandler;
};

export function CsvImportLink(props: CsvImportLinkProps) {
  const { formatMessage } = useIntl();
  const { push } = useRouterActions();

  const handleOnclick = (
    e: KeyboardOrMouseEvent,
    analyticEvent: UIAnalyticsEvent,
  ) => {
    props.onClick(e, analyticEvent);
    push(routes.CSV_IMPORT());
  };

  return (
    <CsvImportLinkWrapper>
      <Button
        testId={'import-csv-button'}
        appearance="subtle-link"
        autoFocus={false}
        isSelected={false}
        onClick={handleOnclick}
      >
        {formatMessage(message.csvImportLink)}
      </Button>
    </CsvImportLinkWrapper>
  );
}
