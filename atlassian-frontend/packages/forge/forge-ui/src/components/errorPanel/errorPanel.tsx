/** @jsx jsx */
import { lazy, useState } from 'react';
import { css, jsx } from '@emotion/core';

import {
  ErrorPanelProps as PublicErrorPanelProps,
  Dispatch,
} from '@atlassian/forge-ui-types';
import { Loader } from '../../web-runtime/loader';
import { RenderFn } from '../../renderer/RendererNext';

const AKSectionMessage = lazy(() => import('@atlaskit/section-message'));

const SectionMessageAction = lazy(
  () => import('@atlaskit/section-message/section-message-action'),
);

const textWrapCss = css`
  white-space: pre-wrap;
`;

type ErrorPanelProps = PublicErrorPanelProps & {
  dispatch: Dispatch;
};

const ErrorPanel = ({ error, dispatch }: ErrorPanelProps) => {
  const { message, errorDetails, errorMessage } = error;
  const [isLoading, setIsLoading] = useState(false);

  const reinitializeApp = async () => {
    setIsLoading(true);
    try {
      await dispatch({ type: 'render', extensionData: {} });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }
  const content = (
    <div
      css={css`
        width: 100%;

        /* The editor sets styles for ul elements. Add a reset here. */
        ul {
          padding-left: 0;
        }
      `}
    >
      <AKSectionMessage
        appearance="error"
        title={message}
        actions={[
          {
            key: 'refresh',
            text: 'Refresh app',
            onClick: reinitializeApp,
          },
        ].map(({ text, ...restAction }) => (
          <SectionMessageAction {...restAction}>{text}</SectionMessageAction>
        ))}
      >
        {errorMessage && <p css={textWrapCss}>{errorMessage}</p>}
        {errorDetails && <pre css={textWrapCss}>{errorDetails}</pre>}
      </AKSectionMessage>
    </div>
  );

  return content;
};

export default ErrorPanel;

export const ErrorPanelRenderFn: RenderFn = ({ forgeDoc, dispatch }) => {
  const { error } = forgeDoc.props as ErrorPanelProps;
  return <ErrorPanel key="error" error={error} dispatch={dispatch} />;
};
