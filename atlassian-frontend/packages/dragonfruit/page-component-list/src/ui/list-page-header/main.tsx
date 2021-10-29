import React from 'react';

import { useRouterActions } from 'react-resource-router';

import Breadcrumbs, { BreadcrumbsItem } from '@atlaskit/breadcrumbs';
import PageHeader from '@atlaskit/page-header';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import {
  ComponentListTypeUrlParam,
  routes,
} from '@atlassian/dragonfruit-routes';
import { useIntl } from '@atlassian/dragonfruit-utils';

type Props = {
  componentType: ComponentListTypeUrlParam;
};

export function ListPageHeader(props: Props) {
  const { componentType } = props;
  const { formatMessage } = useIntl();
  const { push } = useRouterActions();

  function getComponentTypeText() {
    switch (componentType) {
      case ComponentListTypeUrlParam.APPLICATIONS:
        return formatMessage(CommonMessages.applications);
      case ComponentListTypeUrlParam.LIBRARIES:
        return formatMessage(CommonMessages.libraries);
      case ComponentListTypeUrlParam.OTHER:
        return formatMessage(CommonMessages.other);
      case ComponentListTypeUrlParam.SERVICES:
        return formatMessage(CommonMessages.services);
      default:
        return '';
    }
  }

  const breadcrumbs = (
    <Breadcrumbs>
      <BreadcrumbsItem
        onClick={() => push(routes.COMPONENTS())}
        text={formatMessage(CommonMessages.components)}
      />
      <BreadcrumbsItem
        onClick={() => push(routes.COMPONENTS(componentType))}
        text={getComponentTypeText()}
      />
    </Breadcrumbs>
  );

  return (
    <PageHeader breadcrumbs={breadcrumbs}>{getComponentTypeText()}</PageHeader>
  );
}
