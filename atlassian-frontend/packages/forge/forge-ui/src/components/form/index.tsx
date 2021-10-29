import React, { lazy, useState } from 'react';
import { FormData, ForgeDoc } from '@atlassian/forge-ui-types';
import { gridSize } from '@atlaskit/theme/constants';
import { RenderFn } from '../../renderer/RendererNext';
import { useButton, AkButton, ButtonSet } from '../button';
import { transformFormData } from './transformFormData';
import { emotionInstance } from '../../context/emotion';

export const AkForm = lazy(() =>
  import('@atlaskit/form').then((module) => ({ default: module.default })),
);
export const AkFormFooter = lazy(() =>
  import('@atlaskit/form').then((module) => ({ default: module.FormFooter })),
);
export const AkFormField = lazy(() =>
  import('@atlaskit/form').then((module) => ({ default: module.Field })),
);

export const isActionButton = (auxElement: ForgeDoc) =>
  auxElement.key && auxElement.key.startsWith('actionButton');

type PropsOf<T extends (props: any) => React.ReactNode> = Parameters<T>[0];

export function useForm({
  forgeDoc,
  dispatch,
  render,
}: Parameters<RenderFn>[0]): {
  actions: React.ReactNode;
  akFormProps: PropsOf<typeof AkForm> & { key: React.Key };
  akFormFooterProps: PropsOf<typeof AkFormFooter>;
  akSubmitButtonProps: PropsOf<typeof AkButton>;
  children: React.ReactNode;
  htmlFormProps: React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  >;
} {
  const {
    props: {
      submitButtonText = 'Submit',
      onSubmit,
      submitButtonAppearance = 'default',
    } = {},
  } = forgeDoc;
  const [loading, setLoading] = useState(false);

  /**
   * Toggle the Form's React key to remount the component for clearing fields
   * Using the formProps' reset() would trigger our custom form validation for isRequired on some fields
   */
  const [formKey, setFormKey] = useState<number>(0);

  const onSubmitHandler = async (formData: FormData) => {
    setLoading(true);
    try {
      await dispatch({
        type: 'event',
        extensionData: {},
        handler: onSubmit,
        args: [transformFormData(formData)],
      });
      setFormKey(Number(!formKey));
    } finally {
      setLoading(false);
    }
  };

  const akSubmitButtonProps = {
    ...useButton({
      forgeDoc: {
        type: 'Button',
        props: { text: submitButtonText, appearance: submitButtonAppearance },
        children: [],
      },
      dispatch,
      render,
    }).akButtonProps,
    onClick: undefined,
    type: 'submit' as const,
    isLoading: loading,
  };

  const children = forgeDoc.children.filter((x) => !isActionButton(x));
  const actions = forgeDoc.children
    .filter(isActionButton)
    .map((actionButton: ForgeDoc) => ({
      ...actionButton,
      props: {
        ...actionButton.props,
        appearance: 'subtle',
      },
    }));

  return {
    akFormProps: {
      key: formKey,
      onSubmit: onSubmitHandler,
      children: () => {
        throw Error(
          '@atlassian/forge-ui: Invalid composition of UI Kit useForm and Atlaskit Form',
        );
      },
    },
    akSubmitButtonProps,
    htmlFormProps: {
      // @ts-ignore
      'data-testid': 'form',
      className: emotionInstance.css`
        width: 100%;
        margin-top: 0;
        > *:not(footer) {
          margin-top: 0;
        }
        > *:not(:last-child) {
          margin-bottom: ${gridSize()}px;
        }
        ${
          children.length === 0
            ? `
            > footer {
              margin-top: 0;
            }
            `
            : ''
        }
      `,
    },
    akFormFooterProps: {
      align: 'start',
    },
    children: children.map(render),
    actions: actions.length > 0 ? actions.map(render) : null,
  };
}

export function Form(props: Parameters<RenderFn>[0]) {
  const {
    actions,
    akFormFooterProps,
    akFormProps,
    akSubmitButtonProps,
    children,
    htmlFormProps,
  } = useForm(props);
  return (
    <AkForm {...akFormProps}>
      {({ formProps }) => (
        <form {...formProps} {...htmlFormProps}>
          {children}
          <AkFormFooter {...akFormFooterProps}>
            <ButtonSet>
              <AkButton {...akSubmitButtonProps} />
              {actions}
            </ButtonSet>
          </AkFormFooter>
        </form>
      )}
    </AkForm>
  );
}
