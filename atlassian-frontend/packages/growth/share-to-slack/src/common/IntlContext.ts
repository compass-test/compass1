import React from 'react';

import type { InjectedIntlProps } from 'react-intl';

const IntlContext = React.createContext<InjectedIntlProps>(undefined!);

export default IntlContext;
