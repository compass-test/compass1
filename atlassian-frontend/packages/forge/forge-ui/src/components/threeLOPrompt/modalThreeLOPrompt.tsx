import React, { lazy } from 'react';
import { useState } from 'react';
import { ThreeLOPromptProps as PublicThreeLOPromptProps } from '@atlassian/forge-ui-types';
import { RenderFn } from '../../renderer/RendererNext';
import { useAuth } from './useAuth';

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
interface Dependencies {
  onClose?: () => void;
  appName?: string;
  isBlanketHidden?: boolean;
}

type ModalThreeLOPromptProps = PublicThreeLOPromptProps &
  Dependencies & {
    onSuccess: () => Promise<void>;
  };

const ModalThreeLOPrompt = ({
  onClose = () => {},
  isBlanketHidden,
  ...props
}: ModalThreeLOPromptProps) => {
  const { loading, startAuth, promptMessage, buttonText } = useAuth(props);

  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <AKModalTransition>
      {isModalOpen && (
        <AKModalDialog
          onClose={() => {
            setIsModalOpen(false);
            onClose();
          }}
          isBlanketHidden={isBlanketHidden}
        >
          <AKModalHeader>
            <AKModalTitle>Access required</AKModalTitle>
          </AKModalHeader>
          <AKModalBody>
            <div>{promptMessage}</div>
          </AKModalBody>
          <AKModalFooter>
            <AKButton
              appearance="subtle"
              onClick={() => {
                setIsModalOpen(false);
                onClose();
              }}
            >
              Cancel
            </AKButton>
            <AKButton
              appearance="primary"
              autoFocus
              isLoading={loading}
              onClick={startAuth}
            >
              {buttonText}
            </AKButton>
          </AKModalFooter>
        </AKModalDialog>
      )}
    </AKModalTransition>
  );
};

export default ModalThreeLOPrompt;

export const makeModalThreeLOPrompt = ({
  onClose,
  appName,
}: Dependencies): RenderFn => {
  return function modalThreeLOPrompt({ forgeDoc: { props }, dispatch }) {
    const { message, authUrl, promptText } = props as PublicThreeLOPromptProps;
    return (
      <ModalThreeLOPrompt
        message={message}
        authUrl={authUrl}
        promptText={promptText}
        onSuccess={() => dispatch({ type: 'render', extensionData: {} })}
        appName={appName}
        onClose={onClose}
      />
    );
  };
};

export const makeModalThreeLOPromptForCustomUI = ({
  onClose,
  appName,
  isBlanketHidden = false,
}: Dependencies) => {
  return (props: ModalThreeLOPromptProps) => {
    return (
      <ModalThreeLOPrompt
        {...props}
        appName={appName}
        onClose={onClose}
        isBlanketHidden={isBlanketHidden}
      />
    );
  };
};
