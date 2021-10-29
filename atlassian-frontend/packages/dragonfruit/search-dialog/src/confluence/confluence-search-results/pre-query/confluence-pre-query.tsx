import { LinkComponent, SearchResultSection } from '@atlassian/search-dialog';
import React from 'react';
import {
  RecentlyViewedComponent,
  RecentlyViewedTeam,
} from '@atlassian/compass-search-cache';

import { withClients } from '../../clients';
import {
  withAnalytics,
  ScreenType,
  SectionID,
} from '../../../common/analytics';
import {
  onAdvancedSearchSelected,
  AdvancedSearchAnalyticsProps,
} from '../../../common/analytics/events';
import { injectSearchSession } from '../../../common/search-session-provider';
import { ProductSearchResultForPreQuery as ProductSearchResult } from '../../../common/product-search-result';
import { ComponentTypeIcon } from '@atlassian/dragonfruit-components';
import { CompassComponentType } from '@atlassian/dragonfruit-graphql';
import { addQuery } from '../../../utils/url-utils';
import { ResultAvatar as Avatar } from '../../../common/result-avatar';
import { messages } from '../../../messages';

import {
  getTeamOrUserAvatar,
  getTeamOrUserDisplayName,
  getTeamOrUserURL,
} from '../utils';
import { FormattedMessage } from 'react-intl';
import { useGetTeams } from '@atlassian/dragonfruit-rest';

interface Props {
  components: RecentlyViewedComponent[];
  teams: RecentlyViewedTeam[];
  searchSessionId: string;
  siteUrl?: string;
  advancedSearchSelected: (props: AdvancedSearchAnalyticsProps) => any;
  linkComponent?: LinkComponent;
  formatDate?: (lastModified: string) => JSX.Element;
  isLoading: boolean;
  isCollapsed?: boolean;
  screenType: ScreenType;
}

export const ConfluencePreQuery: React.FC<Props> = (props) => {
  const { teams: owners } = useGetTeams(
    props.components.map((c) => c.ownerId).filter((c): c is string => !!c),
  );
  const components = props.components.map((c, idx) => {
    const [, , uuid] = c.id.split('/');

    const owner = c.ownerId ? owners[c.ownerId] : null;
    const ownerName = owner && 'id' in owner ? owner.displayName : '';

    return (
      <div key={c.id} className={'recently-viewed-component'}>
        <ProductSearchResult
          key={`item_${c.id}`}
          title={c.name}
          href={addQuery(
            `/compass/component/${uuid}`,
            'search_id',
            props.searchSessionId,
          )}
          icon={
            <ComponentTypeIcon
              label={c.name}
              size="small"
              type={c.type || CompassComponentType.OTHER}
            />
          }
          containerDetail={undefined}
          owner={ownerName}
          timeDetail={undefined}
          linkComponent={props.linkComponent}
          screen={props.screenType}
          isCollapsed={props.isCollapsed}
          analyticContext={{
            sectionIndex: 1,
            sectionId: `compass-${
              c.type?.toLowerCase() || CompassComponentType.OTHER.toLowerCase()
            }` as SectionID,
            containerId: 'none',
            globalIndex: idx,
            indexWithinSection: idx,
            isCached: false,
          }}
        />
      </div>
    );
  });
  const teams = props.teams.map((t, idx) => {
    return (
      <div key={t.id} className={'recently-viewed-team'}>
        <ProductSearchResult
          key={`people_${t.id}`}
          title={getTeamOrUserDisplayName(t)}
          href={addQuery(
            getTeamOrUserURL(t),
            'search_id',
            props.searchSessionId,
          )}
          icon={
            <Avatar
              borderColor="transparent"
              src={getTeamOrUserAvatar(t)}
              appearance="circle"
              size={'small'}
            />
          }
          linkComponent={props.linkComponent}
          screen={props.screenType}
          isCollapsed={props.isCollapsed}
          analyticContext={{
            sectionIndex: 2,
            sectionId: 'compass-team',
            containerId: null,
            globalIndex: props.components.length + idx,
            indexWithinSection: idx,
            isCached: false,
          }}
        />
      </div>
    );
  });

  return (
    <span data-test-id="search-dialog-pre-query">
      {props.components.length > 0 && (
        <div
          className={'search-result-section'}
          data-test-id="search-dialog-pre-query-components"
        >
          <SearchResultSection
            title={
              <FormattedMessage
                {...messages.common_recently_viewed_section_heading}
              />
            }
          >
            {components}
          </SearchResultSection>
        </div>
      )}
      {props.teams.length > 0 && (
        <div
          className={'search-result-section'}
          data-test-id="search-dialog-pre-query-teams"
        >
          <SearchResultSection
            title={
              <FormattedMessage
                {...messages.compass_teams_and_people_section_heading}
              />
            }
          >
            {teams}
          </SearchResultSection>
        </div>
      )}
    </span>
  );
};

export default withAnalytics({
  advancedSearchSelected: onAdvancedSearchSelected,
})(withClients(injectSearchSession(ConfluencePreQuery)));
