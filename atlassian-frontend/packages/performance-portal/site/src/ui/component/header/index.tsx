import React, { useCallback } from 'react';

import { graphql, useFragment } from 'react-relay';
import { Link, useRouter } from 'react-resource-router';

import {
  AtlassianNavigation,
  PrimaryButton,
} from '@atlaskit/atlassian-navigation';
import Avatar from '@atlaskit/avatar';
import { ButtonProps } from '@atlaskit/button';
import { AtlassianIcon } from '@atlaskit/logo';
import { routes as catalogRoutes } from '@atlassian/performance-portal-catalog';
import { routes as reportsRoutes } from '@atlassian/performance-portal-reports';

import type { headerFragment$key } from './__generated__/headerFragment.graphql';
import CreateMetricTrigger from './create-metric-trigger';
import { InfoDropdown } from './info-dropdown';
import { ReportsDropdown } from './reports-dropdown';
import { AlignVertically, H1 } from './styled';
import TeamEditorTrigger from './team-editor-trigger';

const CatalogLinkComponent = React.forwardRef<HTMLElement, ButtonProps>(
  (props, ref) => (
    // @ts-ignore
    <Link {...props} ref={ref} to={catalogRoutes.catalogPage.path} type="a">
      Catalog
    </Link>
  ),
);

interface Props {
  data: headerFragment$key;
}
export const Header = (props: Props) => {
  const [routerState] = useRouter();

  const isCatalog = Object.values(catalogRoutes).some(
    (r) => routerState.route === r,
  );
  const isReports = Object.values(reportsRoutes).some(
    (r) => routerState.route === r,
  );

  const data = useFragment(
    graphql`
      fragment headerFragment on Query {
        me {
          avatarUrl
        }
      }
    `,
    props.data,
  );

  const avatarUrl = data.me?.avatarUrl ?? undefined;

  const renderProfile = useCallback(() => {
    return <Avatar src={avatarUrl} />;
  }, [avatarUrl]);

  return (
    <AtlassianNavigation
      label="site"
      renderProductHome={AtlassianIcon}
      primaryItems={[
        <AlignVertically>
          <H1>Performance Portal</H1>
        </AlignVertically>,
        <PrimaryButton
          component={CatalogLinkComponent}
          isHighlighted={isCatalog}
        >
          Catalog
        </PrimaryButton>,
        <ReportsDropdown isHighlighted={isReports} />,
        <CreateMetricTrigger />,
        <TeamEditorTrigger />,
      ]}
      renderHelp={InfoDropdown}
      renderProfile={renderProfile}
    />
  );
};
