import { CustomersConfig } from '../../types';

export type Props = {
  // When this is null or undefined, it means the customer has not made their selection yet
  selection?: CustomersConfig;
  // Method to execute when customer hits Select button (when no selection yet) and Edit button (after selection has been made)
  onSelect: () => void;
  isDisabled?: boolean;
  disabledDescription?: string;
  isLoading?: boolean;
  isSelectLoading?: boolean;
  isSkipLoading?: boolean;
  hasMadeProjectsSelection?: boolean;
  isNotMigratingAnyProjects?: boolean;
  isMigratingProjectAttachmentsOnly?: boolean;
  onSelectAllCustomers?: () => void;
  onSkipAllCustomers?: () => void;
  isBeta?: boolean;
};

export type CustomersErrorData = {
  hasError: boolean;
  fixErrorButtonText?: string;
  onFixError?: () => void;
};
