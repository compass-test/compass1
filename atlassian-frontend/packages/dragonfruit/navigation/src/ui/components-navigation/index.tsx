import React from 'react';

import { Link, useRouter } from 'react-resource-router';

import {
  CustomItem,
  HeadingItem,
  NavigationContent,
  Section,
  SideNavigation,
} from '@atlaskit/side-navigation';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import { ComponentIconGlyph } from '@atlassian/dragonfruit-components';
import { CompassComponentType } from '@atlassian/dragonfruit-graphql';
import {
  ComponentListTypeUrlParam,
  routes,
} from '@atlassian/dragonfruit-routes';
import { useIntl } from '@atlassian/dragonfruit-utils';

export function ComponentsNavigation() {
  const { formatMessage } = useIntl();
  const [{ match }] = useRouter();

  const isServicesSelected =
    match.params.componentType?.toLowerCase() ===
    ComponentListTypeUrlParam.SERVICES;
  const isLibrariesSelected =
    match.params.componentType?.toLowerCase() ===
    ComponentListTypeUrlParam.LIBRARIES;
  const isApplicationsSelected =
    match.params.componentType?.toLowerCase() ===
    ComponentListTypeUrlParam.APPLICATIONS;
  const isOtherSelected =
    match.params.componentType?.toLowerCase() ===
    ComponentListTypeUrlParam.OTHER;

  const serviceIcon = (
    <ComponentIconGlyph type={CompassComponentType.SERVICE} />
  );
  const libraryIcon = (
    <ComponentIconGlyph type={CompassComponentType.LIBRARY} />
  );
  const appIcon = (
    <ComponentIconGlyph type={CompassComponentType.APPLICATION} />
  );
  const otherIcon = <ComponentIconGlyph type={CompassComponentType.OTHER} />;

  return (
    <SideNavigation
      label="Component list side navigation"
      testId="dragonfruit-navigation.ui.components-navigation"
    >
      <NavigationContent>
        <Section>
          <HeadingItem>{formatMessage(CommonMessages.components)}</HeadingItem>
          <CustomItem
            testId="dragonfruit-navigation.ui.list-navigation.services"
            component={Link}
            iconBefore={serviceIcon}
            isSelected={isServicesSelected}
            href={routes.COMPONENTS(ComponentListTypeUrlParam.SERVICES)}
          >
            {formatMessage(CommonMessages.services)}
          </CustomItem>
          <CustomItem
            testId="dragonfruit-navigation.ui.list-navigation.libraries"
            component={Link}
            iconBefore={libraryIcon}
            isSelected={isLibrariesSelected}
            href={routes.COMPONENTS(ComponentListTypeUrlParam.LIBRARIES)}
          >
            {formatMessage(CommonMessages.libraries)}
          </CustomItem>
          <CustomItem
            testId="dragonfruit-navigation.ui.list-navigation.applications"
            component={Link}
            iconBefore={appIcon}
            isSelected={isApplicationsSelected}
            href={routes.COMPONENTS(ComponentListTypeUrlParam.APPLICATIONS)}
          >
            {formatMessage(CommonMessages.applications)}
          </CustomItem>
          <CustomItem
            testId="dragonfruit-navigation.ui.list-navigation.other"
            component={Link}
            iconBefore={otherIcon}
            isSelected={isOtherSelected}
            href={routes.COMPONENTS(ComponentListTypeUrlParam.OTHER)}
          >
            {formatMessage(CommonMessages.other)}
          </CustomItem>
        </Section>
      </NavigationContent>
    </SideNavigation>
  );
}
