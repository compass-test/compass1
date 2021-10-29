import React from 'react';

import EditorWarningIcon from '@atlaskit/icon/glyph/editor/warning';
import Spinner from '@atlaskit/spinner';
import {
  ComponentTypeIcon,
  getSearchQuery,
} from '@atlassian/dragonfruit-components';
import {
  CompassComponentType,
  useSearchComponentsQuery,
} from '@atlassian/dragonfruit-graphql';
import { TeamDetails } from '@atlassian/dragonfruit-rest';
import { useTenantInfo } from '@atlassian/dragonfruit-tenant-context';
import { parseSearchComponentsResponse } from '@atlassian/dragonfruit-utils';

import { TeamStatistic } from '../../../../common/ui/team-statistic';

import { ComponentCountWrapper, StatWrapper } from './styled';

type ComponentStatisticProps = {
  team: TeamDetails;
  type: CompassComponentType;
};

export const ComponentStatistic = (props: ComponentStatisticProps) => {
  const { team, type } = props;
  const { cloudId } = useTenantInfo();
  const { data, loading, error } = useSearchComponentsQuery(
    getSearchQuery(cloudId, [
      { name: 'ownerId', filter: { eq: team.id } },
      { name: 'type', filter: { eq: type } },
    ]),
  );

  // need to handle queryError
  const { connection, queryError } = parseSearchComponentsResponse(
    data?.compass?.searchComponents,
  );
  const nodes = connection?.nodes?.filter(node => node.component) ?? [];
  const nextPage = connection?.pageInfo.hasNextPage;

  return (
    <TeamStatistic
      header={type.toString()}
      stat={
        loading ? (
          <Spinner size="small" />
        ) : error || queryError ? (
          <EditorWarningIcon label="error" />
        ) : (
          <StatWrapper>
            <ComponentTypeIcon type={type} />
            <ComponentCountWrapper>
              {nextPage ? `${nodes.length}+` : nodes.length}
            </ComponentCountWrapper>
          </StatWrapper>
        )
      }
    />
  );
};
