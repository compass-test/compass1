import React from 'react';

import { FormattedMessage } from 'react-intl';
import { useRouter } from 'react-resource-router';

import { CustomItemComponentProps, Header } from '@atlaskit/side-navigation';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import { ComponentTypeIcon } from '@atlassian/dragonfruit-components';
import {
  CompassComponent,
  CompassComponentType,
} from '@atlassian/dragonfruit-graphql';
import { routes } from '@atlassian/dragonfruit-routes';
import { useIntl } from '@atlassian/dragonfruit-utils';

type BackLinkProps = {
  componentId: CompassComponent['id'];
  componentType: CompassComponentType;
  children: React.ReactNode;
};

// Map component types into descriptions
const getDescription = (
  componentType: CompassComponentType,
): FormattedMessage.MessageDescriptor => {
  switch (componentType) {
    case CompassComponentType.SERVICE:
      return CommonMessages.service;
    case CompassComponentType.APPLICATION:
      return CommonMessages.application;
    case CompassComponentType.LIBRARY:
      return CommonMessages.library;
    case CompassComponentType.OTHER:
      return CommonMessages.other;
    default:
      throw new Error('Missing CompassComponentType: ' + componentType);
  }
};

export function ComponentHeader(props: BackLinkProps) {
  const { componentId, componentType, children } = props;

  const [{}, { push }] = useRouter();
  const { formatMessage } = useIntl();

  const componentPath = routes.COMPONENT_DETAILS(componentId);

  function InteractiveContainer({
    children,
    ...props
  }: CustomItemComponentProps) {
    return (
      <a
        // Include the href so that the user can see the URL and open in a new tab easily
        href={componentPath}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Header
      testId="dragonfruit-page-component-details.ui.left-sidebar.header"
      component={InteractiveContainer}
      iconBefore={<ComponentTypeIcon type={componentType} />}
      description={formatMessage(getDescription(componentType))}
      onClick={(e) => {
        e.preventDefault(); // Prevent the href from working so that we can use SPA navigation
        push(componentPath);
      }}
    >
      {children}
    </Header>
  );
}
