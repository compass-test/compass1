import React, { FC } from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';

import type { AppsMigrationConfig } from '../../types';
import { Selection, TaskCard } from '../task-card';

import messages from './messages';

export type Props = {
  selection?: AppsMigrationConfig;
  // Method to execute when customer hits Select button (when no selection yet) and Edit button (after selection has been made)
  onSelect: () => void;
  isDisabled?: boolean;
  disabledDescription?: string;
  isLoading?: boolean;
  isSelectLoading?: boolean;
  isSkipLoading?: boolean;
};

const AppsMigrationTaskCard: FC<Props & InjectedIntlProps> = ({
  intl,
  selection,
  onSelect,
  isDisabled,
  isLoading,
  isSelectLoading,
  isSkipLoading,
}) => {
  let selections: Selection[] = [];

  if (selection != null) {
    selections = [
      {
        title: intl.formatMessage(messages.selectedAppsTitle, {
          count: selection.numberOfApps,
        }),
        description:
          selection.numberOfApps === 0
            ? intl.formatMessage(messages.notMigratingText)
            : intl.formatMessage(messages.selectedAppsDescription),
      },
    ];
  }

  return (
    <TaskCard
      taskName={intl.formatMessage(messages.taskName)}
      selections={selections}
      noSelectionDescription={intl.formatMessage(messages.noSelectionText)}
      shouldAllowSkip={false}
      onSelect={onSelect}
      isDisabled={isDisabled}
      isLoading={isLoading}
      isSelectLoading={isSelectLoading}
    />
  );
};

export default injectIntl(AppsMigrationTaskCard);
