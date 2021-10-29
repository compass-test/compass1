import messages from './messages';

export const getAppUsageSortKey = ({
  hasMacros,
  isEnabled,
  status,
  value,
}: {
  hasMacros: boolean;
  isEnabled: boolean;
  status: 'Success' | 'Running' | 'Error';
  value?: number;
}) => {
  if (status === 'Running') {
    return 'loading';
  }
  if (status === 'Error') {
    return 'error';
  }

  // Status === 'Success'
  if (!isEnabled) {
    return messages.disabledMessage.defaultMessage;
  }
  if (!hasMacros) {
    return messages.notApplicableMessage.defaultMessage;
  }
  return value;
};
