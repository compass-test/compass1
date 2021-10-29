/** @jsx jsx */

import { css, jsx } from '@emotion/core';
import { ComponentProps, lazy } from 'react';

import { gridSize } from '@atlaskit/theme/constants';
import { AkFormField, PortalConsumer, RenderFn } from '@atlassian/forge-ui';

const ConfluenceLabelPicker = lazy(() =>
  import('@atlassian/confluence-label-picker').then(({ LabelPicker }) => ({
    default: LabelPicker,
  })),
);

export const LabelPicker = ({
  defaultValue,
  label,
  name,
  ...passThroughProps
}: LabelPickerProps) => (
  <PortalConsumer>
    {(portal) => (
      <div
        css={css`
          max-width: 100%;
          width: ${gridSize() * 40}px;
        `}
      >
        <AkFormField
          defaultValue={transformFormValue(defaultValue)}
          id={name}
          label={label}
          name={name}
        >
          {({ fieldProps }) => (
            <ConfluenceLabelPicker
              {...fieldProps}
              {...passThroughProps}
              menuPortalTarget={portal}
              onChange={(value) =>
                fieldProps.onChange(transformFormValue(value))
              }
              value={fieldProps.value as ConfluenceLabelPickerProps['value']}
            />
          )}
        </AkFormField>
      </div>
    )}
  </PortalConsumer>
);

type ConfluenceLabelPickerProps = ComponentProps<typeof ConfluenceLabelPicker>;

export type LabelPickerProps = Omit<
  ConfluenceLabelPickerProps,
  'menuPortalTarget' | 'onChange' | 'value'
> & {
  label: string;
  name: string;
};

export function makeLabelPicker(boundProps: Partial<LabelPickerProps>) {
  return function LabelPickerFn({
    forgeDoc: { props },
  }: Parameters<RenderFn>[0]) {
    return <LabelPicker {...(props as LabelPickerProps)} {...boundProps} />;
  };
}

/**
 * Forge UI `Form` reduces field/form values using its own private heuristic:
 * packages/forge/forge-ui/src/components/form/transformFormData.tsx.
 * Accidentally, the shape of the `Label` value returned by
 * `@atlassian/confluence-label-picker`'s `LabelPicker` matches the heuristic
 * which in turn reduces the `Label` value to its `id` only.
 */
function transformFormValue<T extends Record<string, any>>(
  value: readonly T[] | T | null | undefined,
): (T & { value?: T })[] | (T & { value?: T }) | null | undefined {
  if (Array.isArray(value)) {
    return value.map(transformFormValue) as (T & { value?: T })[];
  }

  // Since Form's transformFormData reduces Option to its value, represent the
  // specified value as an Option to prevent loss of information:
  if (
    value != null &&
    typeof value === 'object' &&
    !(/* isOptionData */ ('value' in (value as T))) &&
    // isUserData
    value.hasOwnProperty('id') &&
    value.hasOwnProperty('name')
  ) {
    return {
      ...value,
      value,
    } as T;
  }

  return value as T | null | undefined;
}
