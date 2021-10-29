/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';
import {
  FieldChildrenProps,
  FormConditionProps,
  Rendered,
} from '@atlassian/forge-ui-types';
import { Props } from '..';
import { transformFormValue } from '../form/transformFormData';

const AKField = React.lazy(() =>
  import('@atlaskit/form').then((module) => ({
    default: module.Field,
  })),
);

const isEqual = (first: any, second: any) => {
  if (first === second) {
    return true;
  }
  if (Array.isArray(first) && Array.isArray(second)) {
    return first.sort().toString() === second.sort().toString();
  }
  return false;
};

const FormCondition = ({
  when,
  is,
  areChildrenPersisted = false,
  children,
}: Rendered<FormConditionProps>) => {
  return (
    <AKField name={when} defaultValue={[]}>
      {({ fieldProps }: FieldChildrenProps) => {
        const shouldShowChildren = isEqual(
          transformFormValue(fieldProps.value),
          is,
        );
        if (areChildrenPersisted) {
          return (
            <div
              css={css`
                display: ${shouldShowChildren ? 'block' : 'none'};
              `}
            >
              {children}
            </div>
          );
        } else {
          return shouldShowChildren ? children : null;
        }
      }}
    </AKField>
  );
};

export default FormCondition;

export const FormConditionFn = ({
  props,
  children,
  Components,
  dispatch,
  render,
  renderChildren,
}: Props) => {
  const { when, is, areChildrenPersisted } = props as Rendered<
    FormConditionProps
  >;
  return (
    <FormCondition
      when={when}
      is={is}
      areChildrenPersisted={areChildrenPersisted}
    >
      {renderChildren({ children, render, dispatch, Components })}
    </FormCondition>
  );
};
