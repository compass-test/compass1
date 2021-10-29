/** @jsx jsx */
import { gridSize } from '@atlaskit/theme/constants';
import { PortalConsumer, AkFormField, RenderFn } from '@atlassian/forge-ui';
import { css, jsx } from '@emotion/core';
import ApolloClient from 'apollo-client';
import { FC, lazy } from 'react';

type ProvidedProps = {
  client?: ApolloClient<unknown>;
  siteUrl?: string;
};

type Props = {
  label: string;
  name: string;
  isMulti?: boolean;
};

const ConfluenceSpacePicker = lazy(() =>
  import('@atlassian/confluence-space-picker').then((module) => ({
    default: module.SpacePicker,
  })),
);

const isValidValue = (
  value: unknown,
): value is string | string[] | undefined => {
  return (
    typeof value === 'string' ||
    (Array.isArray(value) && typeof value[0] === 'string') ||
    typeof value === 'undefined'
  );
};

export const SpacePicker: FC<ProvidedProps & Props> = (props) => {
  return (
    <PortalConsumer>
      {(portal) => (
        <div
          css={css`
            max-width: 100%;
            width: ${gridSize() * 40}px;
          `}
        >
          <AkFormField id={props.name} label={props.label} name={props.name}>
            {({ fieldProps: { value, ...restFieldProps } }) => (
              <ConfluenceSpacePicker
                value={isValidValue(value) ? value : undefined}
                {...restFieldProps}
                {...props}
                onChange={(value) => restFieldProps.onChange(value as string)}
                portalTarget={portal}
              />
            )}
          </AkFormField>
        </div>
      )}
    </PortalConsumer>
  );
};

export const makeSpacePicker = (providerProps: ProvidedProps) => {
  return function SpacePickerFn({
    forgeDoc: { props },
  }: Parameters<RenderFn>[0]) {
    return <SpacePicker {...(props as Props)} {...providerProps} />;
  };
};
