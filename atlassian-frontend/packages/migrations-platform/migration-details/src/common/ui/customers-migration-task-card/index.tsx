import React, { FC } from 'react';

import { InjectedIntl, InjectedIntlProps, injectIntl } from 'react-intl';

import { CustomerMigrationMode, CustomersConfig } from '../../types';
import { Selection, TaskCard } from '../task-card';

import messages from './messages';
import { CustomersErrorData, Props } from './types';

const getCustomerSelectionText = (
  selection: CustomersConfig,
  intl: InjectedIntl,
): Selection => {
  if (selection.mode === 'ALL') {
    return {
      title: intl.formatMessage(messages.allCustomersSelectionTitle),
      description: intl.formatMessage(
        messages.allCustomersSelectionDescription,
        {
          customers: selection.customersCount,
        },
      ),
    };
  } else if (selection.mode === 'REFERENCED') {
    return {
      title: intl.formatMessage(
        messages.referencedProjectCustomersSelectionTitle,
      ),
      description: intl.formatMessage(
        messages.referencedProjectCustomersSelectionDescription,
        { customers: selection.customersCount },
      ),
    };
  } else {
    return {
      title: intl.formatMessage(messages.noCustomersSelectionTitle, {
        customers: 0,
      }),
      description: intl.formatMessage(messages.noCustomersSelectionDescription),
    };
  }
};

const getCustomersSelection = (
  selection: CustomersConfig,
  intl: InjectedIntl,
): Selection => {
  return getCustomerSelectionText(selection, intl);
};

const getCustomersErrorData = (
  intl: InjectedIntl,
  isSkipMigratingProject?: boolean,
  selectionMode?: CustomerMigrationMode,
  isMigratingProjectAttachmentsOnly?: boolean,
  onSelectAllCustomers?: () => void,
  onSkipAllCustomers?: () => void,
): CustomersErrorData => {
  if (selectionMode === 'REFERENCED') {
    if (isMigratingProjectAttachmentsOnly) {
      return {
        hasError: true,
        fixErrorButtonText: intl.formatMessage(
          messages.skipAllCustomersButtonText,
        ),
        onFixError: onSkipAllCustomers,
      };
    }
    if (isSkipMigratingProject) {
      return {
        hasError: true,
        fixErrorButtonText: intl.formatMessage(
          messages.selectAllCustomersButtonText,
        ),
        onFixError: onSelectAllCustomers,
      };
    }
  }

  return {
    hasError: false,
  };
};

const CustomersTaskCard: FC<Props & InjectedIntlProps> = ({
  intl,
  selection,
  onSelect,
  isDisabled,
  disabledDescription,
  isLoading,
  isSelectLoading,
  isSkipLoading,
  hasMadeProjectsSelection,
  isNotMigratingAnyProjects,
  isMigratingProjectAttachmentsOnly,
  onSelectAllCustomers,
  onSkipAllCustomers,
  isBeta,
}) => {
  let selections: Selection[] = [];
  if (selection) {
    selections = [getCustomersSelection(selection, intl)];
  }

  const shouldDisable = isDisabled || !hasMadeProjectsSelection;

  const errorData = getCustomersErrorData(
    intl,
    isNotMigratingAnyProjects,
    selection?.mode,
    isMigratingProjectAttachmentsOnly,
    onSkipAllCustomers,
    onSelectAllCustomers,
  );

  return (
    <TaskCard
      taskName={intl.formatMessage(messages.taskName)}
      selections={selections}
      noSelectionDescription={intl.formatMessage(messages.noSelectionText)}
      shouldAllowSkip={false}
      onSelect={onSelect}
      isDisabled={shouldDisable}
      disabledDescription={
        disabledDescription || intl.formatMessage(messages.noSelectionText)
      }
      isLoading={isLoading}
      isSelectLoading={isSelectLoading}
      isSkipLoading={isSkipLoading}
      isError={errorData.hasError}
      onFixError={errorData.onFixError}
      fixErrorButtonText={errorData.fixErrorButtonText}
      isBeta={isBeta}
    />
  );
};

export default injectIntl(CustomersTaskCard);
