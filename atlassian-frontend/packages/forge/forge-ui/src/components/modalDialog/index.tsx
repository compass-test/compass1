/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { useState, useRef, lazy, ReactNode, Suspense } from 'react';
import { gridSize } from '@atlaskit/theme/constants';
import { useForm, AkForm, isActionButton } from '../form';
import { useButton, useActionButtons } from '../button/Button';
import { RenderFn } from '../../renderer/RendererNext';
import type {
  ModalDialogProps,
  ModalBodyProps,
  ModalTitleProps,
} from '@atlaskit/modal-dialog/types';

export const AkModalDialog = lazy(() => import('@atlaskit/modal-dialog'));
const AKModalHeader = lazy(() => import('@atlaskit/modal-dialog/modal-header'));
const AKModalTitle = lazy(() => import('@atlaskit/modal-dialog/modal-title'));
const AKModalBody = lazy(() => import('@atlaskit/modal-dialog/modal-body'));
const AKModalFooter = lazy(() => import('@atlaskit/modal-dialog/modal-footer'));
const AKButton = lazy(() => import('@atlaskit/button/loading-button'));

const COMPONENT_TOP_MARGIN = gridSize() * 1.5;

function applyTopMargin(element: ReactNode) {
  return (
    <div
      css={css`
        margin-top: ${COMPONENT_TOP_MARGIN}px;
      `}
    >
      {element}
    </div>
  );
}

type PropsOf<T extends (props: any) => React.ReactNode> = Parameters<T>[0];

export function useModalDialog({
  forgeDoc,
  dispatch,
  render,
}: Parameters<RenderFn>[0]): {
  akModalDialogProps: ModalDialogProps;
  akModalTitleProps: ModalTitleProps;
  akModalBodyProps: ModalBodyProps;
  actions: PropsOf<typeof AKButton>[];
} {
  const {
    appearance,
    header,
    onClose,
    closeButtonText = 'Cancel',
    width = 'medium',
  } = forgeDoc.props || {};

  const formForgeDoc =
    forgeDoc.children.length === 1 && forgeDoc.children[0].type === 'Form'
      ? forgeDoc.children[0]
      : undefined;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const {
    children,
    akFormProps,
    htmlFormProps,
    akSubmitButtonProps: akFormSubmitButtonProps,
  } = useForm({
    // This is awkward because we only use values if formForgeDoc exists
    // I want to conditionally call this hook but I can't
    forgeDoc: formForgeDoc || { type: 'Form', children: [] },
    dispatch,
    render,
  });

  const akFormPropsWithOnSubmit: typeof akFormProps = {
    ...akFormProps,
    onSubmit: async (...args) => {
      setIsSubmitting(true);
      try {
        await akFormProps.onSubmit(...args);
      } finally {
        setIsSubmitting(false);
      }
    },
  };

  const formId = useRef(`modal-form-id-${Date.now()}`);
  const akSubmitButtonProps = {
    ...akFormSubmitButtonProps,
    appearance: appearance || 'primary',
    isLoading: isSubmitting,
    form: formId.current,
  };

  const handleClose = async () => {
    setIsClosing(true);
    try {
      await dispatch({
        type: 'event',
        handler: onClose,
        args: [],
        extensionData: {},
      });
    } finally {
      setIsClosing(false);
    }
  };

  const actions = formForgeDoc
    ? formForgeDoc.children.filter(isActionButton)
    : [];
  const { akActionButtonProps } = useActionButtons({
    forgeDoc: actions,
    dispatch,
    render,
  });

  const { akButtonProps: closeButtonProps } = useButton({
    forgeDoc: {
      type: 'Button',
      props: {
        appearance: 'subtle',
        text: closeButtonText,
        onClick: onClose,
      },
      children: [],
    },
    dispatch,
    render,
  });
  const akCloseButtonProps = {
    ...closeButtonProps,
    isLoading: isClosing || closeButtonProps.isLoading,
  };

  return {
    akModalDialogProps: {
      onClose: handleClose,
      width,
    },
    akModalTitleProps: {
      appearance,
      children: header,
    },
    akModalBodyProps: {
      children: formForgeDoc ? (
        <AkForm {...akFormPropsWithOnSubmit}>
          {({ formProps }) => (
            <form {...formProps} {...htmlFormProps} id={formId.current}>
              {React.Children.map(children, (child, index) =>
                index === 0 ? child : applyTopMargin(child),
              )}
            </form>
          )}
        </AkForm>
      ) : (
        React.Children.map(forgeDoc.children.map(render), (child, index) =>
          index === 0 ? child : applyTopMargin(child),
        )
      ),
    },
    actions: formForgeDoc
      ? [...akActionButtonProps, akCloseButtonProps, akSubmitButtonProps]
      : [akCloseButtonProps],
  };
}

export function ModalDialog(props: Parameters<RenderFn>[0]) {
  const {
    akModalDialogProps,
    akModalTitleProps,
    akModalBodyProps,
    actions,
  } = useModalDialog(props);
  return (
    <Suspense fallback={null}>
      <AkModalDialog {...akModalDialogProps}>
        <AKModalHeader>
          <AKModalTitle {...akModalTitleProps} />
        </AKModalHeader>
        <AKModalBody {...akModalBodyProps} />
        <AKModalFooter>
          {actions.map((akButtonProps) => (
            <AKButton {...akButtonProps} />
          ))}
        </AKModalFooter>
      </AkModalDialog>
    </Suspense>
  );
}
