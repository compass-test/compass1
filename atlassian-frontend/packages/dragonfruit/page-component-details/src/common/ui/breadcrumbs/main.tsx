import React from 'react';

import { FormattedMessage } from 'react-intl';

import Breadcrumbs from '@atlaskit/breadcrumbs';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import { BreadcrumbsLink } from '@atlassian/dragonfruit-common-ui';
import {
  CompassComponent,
  CompassComponentType,
} from '@atlassian/dragonfruit-graphql';
import {
  ComponentListTypeUrlParam,
  routes,
} from '@atlassian/dragonfruit-routes';
import { useIntl } from '@atlassian/dragonfruit-utils';

type ComponentBreadcrumbsProps = {
  componentId: CompassComponent['id'];
  // We might no know the name or type while the page is loading, and this
  // component should account for that.
  componentName?: CompassComponent['name'];
  componentType?: CompassComponent['type'];
};

// Maps component types to their corresponding component list URL params
const getComponentListTypeUrlParam = (
  componentType: CompassComponentType,
): ComponentListTypeUrlParam => {
  switch (componentType) {
    case CompassComponentType.SERVICE:
      return ComponentListTypeUrlParam.SERVICES;
    case CompassComponentType.APPLICATION:
      return ComponentListTypeUrlParam.APPLICATIONS;
    case CompassComponentType.LIBRARY:
      return ComponentListTypeUrlParam.LIBRARIES;
    case CompassComponentType.OTHER:
      return ComponentListTypeUrlParam.OTHER;
    default:
      throw new Error('Missing componentType: ' + componentType);
  }
};
// Maps component types to their corresponding breadcrumb labels
const getComponentTypeBreadcrumbLabel = (
  componentType: CompassComponentType,
): FormattedMessage.MessageDescriptor => {
  switch (componentType) {
    case CompassComponentType.SERVICE:
      return CommonMessages.services;
    case CompassComponentType.APPLICATION:
      return CommonMessages.applications;
    case CompassComponentType.LIBRARY:
      return CommonMessages.libraries;
    case CompassComponentType.OTHER:
      return CommonMessages.other;
    default:
      throw new Error('Missing CompassComponentType: ' + componentType);
  }
};

export function ComponentBreadcrumbs(props: ComponentBreadcrumbsProps) {
  const { componentId, componentName, componentType } = props;

  const { formatMessage } = useIntl();

  const typeBreadcrumbLabel =
    componentType && getComponentTypeBreadcrumbLabel(componentType);

  return (
    <Breadcrumbs>
      <BreadcrumbsLink
        href={routes.COMPONENTS()}
        text={formatMessage(CommonMessages.components)}
      />

      {/* We might want to show a skeleton shimmer here when the type is loading */}
      {componentType && typeBreadcrumbLabel && (
        <BreadcrumbsLink
          href={routes.COMPONENTS(getComponentListTypeUrlParam(componentType))}
          text={formatMessage(typeBreadcrumbLabel)}
        />
      )}

      {/* We might want to show a skeleton shimmer here when the name is loading */}
      {componentName && (
        <BreadcrumbsLink
          href={routes.COMPONENT_DETAILS(componentId)}
          text={componentName}
        />
      )}
    </Breadcrumbs>
  );
}
