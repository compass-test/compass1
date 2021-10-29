/** @jsx jsx */
import { lazy, useState } from 'react';
import { css, jsx } from '@emotion/core';

import {
  ErrorPanelProps as PublicErrorPanelProps,
  Dispatch,
} from '@atlassian/forge-ui-types';

import { RenderFn } from '../../renderer/RendererNext';

const AKSectionMessage = lazy(() => import('@atlaskit/section-message'));

const AKModalDialog = lazy(() => import('@atlaskit/modal-dialog'));
const AKModalTransition = lazy(() =>
  import('@atlaskit/modal-dialog').then((module) => ({
    default: module.ModalTransition,
  })),
);
const AKModalHeader = lazy(() => import('@atlaskit/modal-dialog/modal-header'));
const AKModalTitle = lazy(() => import('@atlaskit/modal-dialog/modal-title'));
const AKModalBody = lazy(() => import('@atlaskit/modal-dialog/modal-body'));
const AKModalFooter = lazy(() => import('@atlaskit/modal-dialog/modal-footer'));
const AKButton = lazy(() => import('@atlaskit/button/loading-button'));

const textWrapCss = css`
  white-space: pre-wrap;
`;

interface Dependencies {
  onClose: () => void;
}

type ModalErrorPanelProps = PublicErrorPanelProps &
  Dependencies & {
    dispatch: Dispatch;
  };

export const ModalErrorPanel = ({
  error,
  onClose,
  dispatch,
}: ModalErrorPanelProps) => {
  const { message, errorDetails, errorMessage } = error;
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const reinitializeApp = async () => {
    setIsLoading(true);
    try {
      await dispatch({ type: 'render', extensionData: {} });
    } finally {
      setIsLoading(false);
    }
  };
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
      <AKSectionMessage appearance="error" title={''}>
        {errorMessage && <p css={textWrapCss}>{errorMessage}</p>}
        {errorDetails && <pre css={textWrapCss}>{errorDetails}</pre>}
      </AKSectionMessage>
    </div>
  );

  return (
    <AKModalTransition>
      {isModalOpen && (
        <AKModalDialog
          onClose={() => {
            setIsModalOpen(false);
            onClose();
          }}
          width="x-large"
        >
          <AKModalHeader>
            <AKModalTitle>{message}</AKModalTitle>
          </AKModalHeader>
          <AKModalBody>{content}</AKModalBody>
          <AKModalFooter>
            <AKButton
              appearance="subtle"
              onClick={() => {
                setIsModalOpen(false);
                onClose();
              }}
            >
              Close
            </AKButton>
            <AKButton
              appearance="primary"
              isLoading={isLoading}
              onClick={reinitializeApp}
            >
              Refresh app
            </AKButton>
          </AKModalFooter>
        </AKModalDialog>
      )}
    </AKModalTransition>
  );
};

export const makeModalErrorPanel = ({ onClose }: Dependencies): RenderFn => {
  return function modalErrorPanel({ forgeDoc: { props }, dispatch }) {
    const { error } = props as PublicErrorPanelProps;
    return (
      <ModalErrorPanel error={error} dispatch={dispatch} onClose={onClose} />
    );
  };
};
