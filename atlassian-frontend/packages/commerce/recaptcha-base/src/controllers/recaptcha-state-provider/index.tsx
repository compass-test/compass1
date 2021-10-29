import React, { FC } from 'react';

import { TelemetryRoot } from '../../common/utils/events';

export const ReCaptchaStateProvider: FC = ({ children }) => (
  <TelemetryRoot>{children}</TelemetryRoot>
);
