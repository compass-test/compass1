import React, { lazy } from 'react';
import { SectionMessageProps, Rendered } from '@atlassian/forge-ui-types';
import { Props } from '..';

const AKSectionMessage = lazy(() => import('@atlaskit/section-message'));

export const APPEARANCE_OLD_TO_NEW_MAPPING = {
  info: 'information',
  confirmation: 'success',
  change: 'discovery',
  warning: 'warning',
  error: 'error',
} as const;

const SectionMessage: React.FunctionComponent<Rendered<
  SectionMessageProps
>> = ({ title, appearance = 'info', children }) => {
  return (
    <AKSectionMessage
      title={title}
      //TODO: Remove this mapping once the forge-ui package is updated to accomodate section-message appearance changes
      appearance={APPEARANCE_OLD_TO_NEW_MAPPING[appearance]}
    >
      {children}
    </AKSectionMessage>
  );
};

export default SectionMessage;

export const SectionMessageFn: React.FunctionComponent<Props> = ({
  props,
  children,
  Components,
  render,
  renderChildren,
  dispatch,
}) => {
  const { title, appearance } = props as SectionMessageProps;

  return (
    <SectionMessage title={title} appearance={appearance}>
      {renderChildren({ Components, children, render, dispatch })}
    </SectionMessage>
  );
};
