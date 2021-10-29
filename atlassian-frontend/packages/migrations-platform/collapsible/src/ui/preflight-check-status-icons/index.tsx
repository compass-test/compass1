import React from 'react';

import CheckCircleIcon from '@atlaskit/icon/glyph/check-circle';
import ErrorIcon from '@atlaskit/icon/glyph/error';
import WarningIcon from '@atlaskit/icon/glyph/warning';
import Spinner from '@atlaskit/spinner';
import { G300, R500, Y400 } from '@atlaskit/theme/colors';

export const PreflightCheckSuccess = () => (
  <CheckCircleIcon label="success" primaryColor={G300} />
);

export const PreflightCheckError = () => (
  <ErrorIcon label="error" primaryColor={R500} />
);

export const PreflightCheckLoading = () => <Spinner size="medium" />;

export const PreflightCheckWarning = () => (
  <WarningIcon label="warning" primaryColor={Y400} />
);
