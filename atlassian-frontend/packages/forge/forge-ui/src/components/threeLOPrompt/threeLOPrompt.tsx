import React from 'react';
import {
  Rendered,
  ThreeLOPromptProps as PublicThreeLOPromptProps,
} from '@atlassian/forge-ui-types';
import { AkButton } from '../button/Button';
import { RenderFn } from '../../renderer/RendererNext';
import { useAuth } from './useAuth';

export type ThreeLOPromptProps = Rendered<PublicThreeLOPromptProps> &
  Dependencies & { onSuccess: () => Promise<void> };

interface Dependencies {
  appName?: string;
}

const ThreeLOPrompt = (props: ThreeLOPromptProps) => {
  const { loading, startAuth, promptMessage, buttonText } = useAuth(props);

  return (
    <React.Fragment>
      <div style={{ border: '8px solid #FFFAE6', padding: '16px' }}>
        <div style={{ marginBottom: '20px' }} data-testid="three-lo-prompt">
          <div>{promptMessage}</div>
        </div>
        <AkButton onClick={startAuth} isLoading={loading}>
          {buttonText}
        </AkButton>
      </div>
    </React.Fragment>
  );
};

export default ThreeLOPrompt;

export const ThreeLOPromptRenderFn: RenderFn = ({ forgeDoc, dispatch }) => {
  const {
    message,
    authUrl,
    promptText,
  } = forgeDoc.props as PublicThreeLOPromptProps;
  return (
    <ThreeLOPrompt
      message={message}
      authUrl={authUrl}
      promptText={promptText}
      onSuccess={() => dispatch({ type: 'render', extensionData: {} })}
    />
  );
};

export const makeThreeLOPrompt = ({ appName }: Dependencies): RenderFn => {
  return function threeLOPrompt({ forgeDoc: { props }, dispatch }) {
    const { message, authUrl, promptText } = props as PublicThreeLOPromptProps;
    return (
      <ThreeLOPrompt
        message={message}
        authUrl={authUrl}
        promptText={promptText}
        appName={appName}
        onSuccess={() => dispatch({ type: 'render', extensionData: {} })}
      />
    );
  };
};
