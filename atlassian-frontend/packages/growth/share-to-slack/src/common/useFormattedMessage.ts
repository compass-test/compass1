import { useMemo } from 'react';

import type { MessageKey } from './types';
import useMessages from './useMessages';

export default function useFormattedMessage(messageKey: MessageKey) {
  const formatMessage = useMessages();

  return useMemo(() => formatMessage(messageKey), [formatMessage, messageKey]);
}
