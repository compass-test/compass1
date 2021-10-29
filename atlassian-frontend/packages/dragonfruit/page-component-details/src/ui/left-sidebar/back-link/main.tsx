import React from 'react';

import { Link } from 'react-resource-router';

import ArrowLeftCircleIcon from '@atlaskit/icon/glyph/arrow-left-circle';
import { CustomItem } from '@atlaskit/side-navigation';
import { CompassComponentType } from '@atlassian/dragonfruit-graphql';
import {
  ComponentListTypeUrlParam,
  routes,
} from '@atlassian/dragonfruit-routes';
import { useIntl } from '@atlassian/dragonfruit-utils';

import messages from './messages';

type BackLinkProps = {
  componentType: CompassComponentType;
};

// Map component types into back links
const getBackPath = (componentType: CompassComponentType): string => {
  switch (componentType) {
    case CompassComponentType.SERVICE:
      return routes.COMPONENTS(ComponentListTypeUrlParam.SERVICES);
    case CompassComponentType.APPLICATION:
      return routes.COMPONENTS(ComponentListTypeUrlParam.APPLICATIONS);
    case CompassComponentType.LIBRARY:
      return routes.COMPONENTS(ComponentListTypeUrlParam.LIBRARIES);
    case CompassComponentType.OTHER:
      return routes.COMPONENTS(ComponentListTypeUrlParam.OTHER);
    default:
      throw new Error('Missing CompassComponentType: ' + componentType);
  }
};

export function BackLink(props: BackLinkProps) {
  const { componentType } = props;

  const { formatMessage } = useIntl();

  return (
    <CustomItem
      testId="dragonfruit-page-component-details.left-sidebar-links.back-to"
      component={Link}
      iconBefore={
        <ArrowLeftCircleIcon label={formatMessage(messages.backToComponents)} />
      }
      href={getBackPath(componentType)}
    >
      {formatMessage(messages.backToComponents)}
    </CustomItem>
  );
}
