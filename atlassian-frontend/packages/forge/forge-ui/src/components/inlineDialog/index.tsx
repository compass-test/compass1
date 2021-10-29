import React, { Fragment } from 'react';
import { RenderFn } from '../../renderer';
import { AkFormFooter, AkForm, useForm } from '../form';
import { AkButton, ButtonSet } from '../button';

function Form(props: Parameters<RenderFn>[0]) {
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
          <AkFormFooter {...akFormFooterProps} align="end">
            <ButtonSet>
              {actions}
              <AkButton {...akSubmitButtonProps} appearance="primary" />
            </ButtonSet>
          </AkFormFooter>
        </form>
      )}
    </AkForm>
  );
}

export function useInlineDialog({
  forgeDoc,
  dispatch,
  render,
}: Parameters<RenderFn>[0]) {
  return {
    children:
      forgeDoc.children[0].type === 'Form' ? (
        <Form
          forgeDoc={forgeDoc.children[0]}
          dispatch={dispatch}
          render={render}
        />
      ) : (
        forgeDoc.children.map(render)
      ),
  };
}

export const InlineDialog = (props: Parameters<RenderFn>[0]) => {
  const { children } = useInlineDialog(props);
  return <Fragment>{children}</Fragment>;
};
