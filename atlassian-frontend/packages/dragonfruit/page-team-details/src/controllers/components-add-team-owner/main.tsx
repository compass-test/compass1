import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import {
  SearchComponentsAddTeamOwnerDocument,
  SearchComponentsAddTeamOwnerQuery,
  SearchComponentsAddTeamOwnerQueryVariables,
  useImperativeQuery,
} from '@atlassian/dragonfruit-graphql';
import { useTenantInfo } from '@atlassian/dragonfruit-tenant-context';
import { useIntl } from '@atlassian/dragonfruit-utils';

import { ComponentOption, TeamComponentSearchResult } from './types';

const useSearchQuery = () => {
  return useImperativeQuery<
    SearchComponentsAddTeamOwnerQuery,
    SearchComponentsAddTeamOwnerQueryVariables
  >(SearchComponentsAddTeamOwnerDocument, { fetchPolicy: 'network-only' });
};

export function useSearchComponentsAddTeamOwner(
  teamId: string,
): TeamComponentSearchResult {
  const { cloudId } = useTenantInfo();

  const search = useSearchQuery();

  const { formatMessage } = useIntl();

  const handleSearch = async (input: string) => {
    const trimmedInput = input.trim();
    const query = trimmedInput !== '' ? trimmedInput : undefined;
    const { data } = await search({
      cloudId,
      query: {
        query,
        first: 10,
        after: '',
        fieldFilters: [
          {
            name: 'ownerId',
            filter: {
              neq: teamId,
            },
          },
        ],
        sort: [],
      },
    });

    const result = data?.compass?.searchComponents;

    if (result?.__typename === 'QueryError') {
      throw new Error(
        `Error when calling SearchComponentsAddTeamOwnerQuery: ${result?.message}`,
      );
    }

    if (result?.__typename !== 'CompassSearchComponentConnection') {
      return [];
    }

    const nodes = result?.nodes?.filter((node) => node.component) ?? [];

    const componentOptions: ComponentOption[] = nodes.reduce(
      (accumulator: ComponentOption[], currentNode) => {
        if (currentNode?.component) {
          const newOption: ComponentOption = {
            label: currentNode.component.name,
            value: currentNode.component.id,
            type: currentNode.component.type,
            description: currentNode.component.description,
            ownerId: currentNode.component.ownerId,
            isManaged: Boolean(currentNode.component.dataManager),
          };
          accumulator.push(newOption);
        }
        return accumulator;
      },
      [],
    );

    return [
      {
        leftColumnLabel: formatMessage(CommonMessages.component),
        rightColumnLabel: formatMessage(CommonMessages.owner),
        options: componentOptions,
      },
    ];
  };

  return { search: handleSearch };
}
