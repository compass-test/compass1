import React, { FC } from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';

import { AdvancedRoadmapsConfig } from '../../types';
import { Selection, TaskCard } from '../task-card';

import messages from './messages';

export type Props = {
  selection?: AdvancedRoadmapsConfig;
  // Method to execute when customer hits Select button (when no selection yet) and Edit button (after selection has been made)
  onSelect: () => void;
  // Method to execute when customer indicates that they are not migrating plans
  onSkip: () => void;
  isLoading?: boolean;
  isSelectLoading?: boolean;
  isSkipLoading?: boolean;
  onUnselectAllPlans?: () => void;
  isMigratingProjectAttachmentsOnly?: boolean;
  isMigratingProjectConfigurationsOnly?: boolean;
};

const AdvancedRoadmapsTaskCard: FC<Props & InjectedIntlProps> = ({
  intl,
  selection,
  onSelect,
  onSkip,
  isLoading,
  isSelectLoading,
  isSkipLoading,
  onUnselectAllPlans,
  isMigratingProjectAttachmentsOnly,
  isMigratingProjectConfigurationsOnly,
}) => {
  let selections: Selection[] = [];

  if (selection != null) {
    selections = [
      {
        title: intl.formatMessage(messages.selectedPlansTitle, {
          count: selection.numberOfPlans,
        }),
        description:
          selection.numberOfPlans === 0
            ? intl.formatMessage(messages.notMigratingText)
            : intl.formatMessage(messages.selectedPlansDescription),
      },
    ];
  }

  const isDisabled =
    isMigratingProjectAttachmentsOnly || isMigratingProjectConfigurationsOnly;
  const disabledDescription = isMigratingProjectAttachmentsOnly
    ? intl.formatMessage(messages.attachmentsOnlyDisabledText)
    : intl.formatMessage(messages.configOnlyDisabledText);
  const isError =
    (selection?.numberOfPlans || 0) > 0 &&
    (isMigratingProjectAttachmentsOnly || isMigratingProjectConfigurationsOnly);

  return (
    <TaskCard
      taskName={intl.formatMessage(messages.taskName)}
      selections={selections}
      noSelectionDescription={intl.formatMessage(messages.noSelectionText)}
      shouldAllowSkip={true}
      onSelect={onSelect}
      onSkip={onSkip}
      isDisabled={isDisabled}
      isLoading={isLoading}
      isSelectLoading={isSelectLoading}
      isSkipLoading={isSkipLoading}
      skipButtonText={intl.formatMessage(messages.skipButtonText)}
      isError={isError}
      fixErrorButtonText={intl.formatMessage(messages.fixErrorButtonText)}
      onFixError={onUnselectAllPlans}
      disabledDescription={disabledDescription}
    />
  );
};

export default injectIntl(AdvancedRoadmapsTaskCard);
