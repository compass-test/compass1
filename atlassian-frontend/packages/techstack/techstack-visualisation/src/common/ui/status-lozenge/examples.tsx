import React from 'react';

import { StatusLozenge } from './index';

export const Recommended = () => <StatusLozenge status="recommended" />;
export const Discouraged = () => <StatusLozenge status="discouraged" />;
export const Deprecated = () => <StatusLozenge status="deprecated" />;
export const NoGo = () => <StatusLozenge status="no-go" />;
export const Unavailable = () => <StatusLozenge status="unavailable" />;
