import { useContext } from 'react';

import IntlContext from './IntlContext';

export default function useIntl() {
  return useContext(IntlContext);
}
