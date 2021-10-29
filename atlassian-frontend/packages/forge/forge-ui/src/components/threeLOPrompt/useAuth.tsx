import React, { useState } from 'react';
import { useMetrics } from '../../metrics';
import { safeAuth, isExternalAuth } from './auth';
import { ThreeLOPromptProps } from './threeLOPrompt';
import { catalog } from '@atlassiansox/metal-client';
import { PromptMessage } from './styled';
import WarningIcon from '@atlaskit/icon/glyph/warning';

export const METRICS_TASK_CONSENT = 'user consent';

// TODO: We should make appName non-optional later: http://go/j/AUX-570
// appName was made optional because it isn't in already inserted apps prior to the change in http://go/j/AUX-411
const defaultPromptMessage = (appName?: string) =>
  `For ${
    appName ? `"${appName}"` : 'this app'
  } to display, you need to allow the app to access Atlassian products on your behalf.`;

const externalAuthPromptMessage = (appName?: string) =>
  `${
    appName ? appName : 'This app'
  } requires additional access to your account.`;

export const useAuth = ({
  message,
  promptText,
  appName,
  authUrl,
  onSuccess,
}: ThreeLOPromptProps) => {
  const [failedToAuthenticate, setFailedToAuthenticate] = useState(false);
  const [loading, setLoading] = useState(false);
  const { submitMetric, page } = useMetrics();
  const promptIsForExternalAuth = isExternalAuth(authUrl);

  const startAuth = () => {
    setLoading(true);
    safeAuth(authUrl).then(
      () =>
        onSuccess().then(() => {
          setLoading(false);
          submitMetric({
            name: catalog.userInteraction.TASK_SUCCESS,
            task: METRICS_TASK_CONSENT,
            page,
          });
        }),
      () => {
        setLoading(false);
        setFailedToAuthenticate(true);
        submitMetric({
          name: catalog.userInteraction.TASK_FAILURE,
          task: METRICS_TASK_CONSENT,
          page,
        });
      },
    );
  };

  const promptMessage = failedToAuthenticate
    ? 'Failed to authenticate.'
    : message ||
      (promptIsForExternalAuth
        ? externalAuthPromptMessage(appName)
        : defaultPromptMessage(appName));

  const content = (
    <PromptMessage>
      <div style={{ marginRight: '8px' }}>
        <WarningIcon
          label="External Auth Warning"
          primaryColor="#FF8B00"
          size="medium"
        />
      </div>
      {promptMessage}
    </PromptMessage>
  );

  const externalAuthButtonText = 'Configure access';
  const buttonText =
    promptText ||
    (promptIsForExternalAuth ? externalAuthButtonText : 'Allow access');

  return { loading, startAuth, promptMessage: content, buttonText };
};
