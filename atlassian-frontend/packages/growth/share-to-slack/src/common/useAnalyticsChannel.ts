import { useContext } from 'react';

import AnalyticsChannelContext from './AnalyticsChannelContext';

export default function useAnalyticsChannel() {
  return useContext(AnalyticsChannelContext) ?? {};
}
