import { useCallback } from 'react';

import { messages } from './i18n';
import type { MessageKey } from './types';
import useIntl from './useIntl';

export default function useMessages() {
  const { intl } = useIntl();

  return useCallback(
    (messageKey: MessageKey) => intl.formatMessage(messages[messageKey]),
    [intl],
  );
}
