import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import debounce from 'lodash/fp/debounce';
import escapeRegExp from 'lodash/fp/escapeRegExp';
import isEmpty from 'lodash/fp/isEmpty';
import keyBy from 'lodash/fp/keyBy';
import reverse from 'lodash/fp/reverse';
import times from 'lodash/fp/times';
import uniq from 'lodash/fp/uniq';

import Button from '@atlaskit/button/custom-theme-button';
import { FormHeader } from '@atlaskit/form';
import Select, {
  components,
  OptionProps,
  StylesConfig,
} from '@atlaskit/select';

import { Issue } from '../../common/types';
import {
  Description,
  FormContainer,
  HeaderContainer,
} from '../../common/ui/form';
import { getIssueLinkText } from '../../common/ui/issue-link';
import {
  DEFAULT_HIERARCHY_LEVEL,
  MIN_FILTER_QUERY_LENGTH,
} from '../../common/utils/constants';
import { useIntl as useIntlDI } from '../../common/utils/intl';
import { VrReady } from '../../common/utils/vr';
import { useAPI as useAPIDI } from '../../controllers/api';
import { usePlanMeta } from '../../controllers/plan-meta';
import {
  useBasicPlanInfo,
  useHierarchyConfigurationService,
  useIssueTypesService,
  useProjectsAndReleasesByIssueSourcesService,
  useRemovedIssuesService,
  useStatusTypesService,
} from '../../services';

import msgs from './messages';
import RemovedIssuesTableTree, {
  SearchMatch,
} from './removed-issues-table-tree';
import type { ActiveSearchResult } from './removed-issues-table-tree/highlight/types';
import Search, { Direction } from './search';
import {
  AK_SELECT_PADDING_ADJUST,
  CONTROLS_HEIGHT,
  ControlsContainer,
  HierarchyContainer,
  LabelContainer,
} from './styled';
import { Props } from './types';
export type { Props as RemovedIssuesProps } from './types';

const SEARCH_DEBOUNCE = 100;

type HierarchyFilter = {
  // These are the index in the levels array, thats just how the data ranks them
  from: number;
  to: number;
};

type HierarchyOption = {
  label: string;
  value: number;
};

const OptionComponent = (props: OptionProps<HierarchyOption>) => (
  <components.Option {...props}>
    <LabelContainer>{props.data.label}</LabelContainer>
  </components.Option>
);

const SingleValueComponent: typeof components.SingleValue = (props) => (
  <components.SingleValue {...props}>
    <LabelContainer>{props.data.label}</LabelContainer>
  </components.SingleValue>
);

const findMatchingSearchNode = (
  searchContextRef: React.RefObject<HTMLElement>,
  index: number,
) => {
  const ref = searchContextRef?.current;
  if (ref) {
    const nodes = ref.querySelectorAll('[data-attr-highlighted]');
    return nodes[index];
  }
};

const RemovedIssues = ({
  planId,
  scenarioId,
  issueSources,
  isLoading = false,
  additionalIssues,
  onSubmit,
  useAPI = useAPIDI,
  useIntl = useIntlDI,
  renderHeader = (header) => <FormHeader>{header}</FormHeader>,
  renderDescription = (description) => <Description>{description}</Description>,
}: Props) => {
  const searchContextRef = useRef<HTMLDivElement>(null);
  const api = useAPI();
  const { formatMessage } = useIntl();
  const [selectedIssues, setSelectedIssues] = useState<Issue[]>([]);
  const [filterQuery, setFilterQuery] = useState('');
  const [activeSearchResult, setActiveSearchResult] = useState<
    ActiveSearchResult
  >({ index: 0, hash: null });
  const [hierarchyFilter, setHierarchyFilter] = useState<HierarchyFilter>({
    from: 0,
    to: 0,
  });
  const [submitting, setSubmitting] = useState(false);
  const {
    loading: issuesLoading,
    data: issues,
    fetchData: fetchRemovedIssues,
  } = useRemovedIssuesService(api);
  const {
    data: issueStatusTypeMap,
    fetchData: fetchStatusTypes,
  } = useStatusTypesService(api);
  const {
    data: issueTypeMap,
    fetchData: fetchIssueTypes,
  } = useIssueTypesService(api);
  const {
    loading: hierarchyLoading,
    data: hierarchyConfig,
  } = useHierarchyConfigurationService(api);
  const {
    data: projectsAndReleases,
    fetchData: fetchProjectsAndReleases,
  } = useProjectsAndReleasesByIssueSourcesService(api);
  const {
    data: planBasicInfo,
    fetchData: fetchPlanBasicInfo,
  } = useBasicPlanInfo(api);
  const { issueLimit } = usePlanMeta();
  const levels = hierarchyConfig?.levels;
  const projects = projectsAndReleases?.projects;
  const allIssues = [...(additionalIssues || []), ...(issues || [])];

  useEffect(() => {
    fetchPlanBasicInfo(planId);
  }, [fetchPlanBasicInfo, issueSources, planId]);

  useEffect(() => {
    if (planBasicInfo) {
      fetchRemovedIssues(planId, scenarioId, issueSources);
      fetchProjectsAndReleases(planBasicInfo.issueSources);
    }
  }, [
    fetchProjectsAndReleases,
    fetchRemovedIssues,
    issueSources,
    planBasicInfo,
    planId,
    scenarioId,
  ]);

  useEffect(() => {
    const allIssues = [...(additionalIssues || []), ...(issues || [])];
    const issueTypes = uniq(
      allIssues.map((issue) => issue.values.type.toString()),
    );
    const issueStatusTypes = uniq(
      allIssues.map((issue) => issue.values.status),
    ).filter((status) => !!status) as string[];
    fetchIssueTypes(issueTypes);
    fetchStatusTypes(issueStatusTypes);
  }, [additionalIssues, fetchIssueTypes, fetchStatusTypes, issues]);

  useEffect(() => {
    if (levels) {
      setHierarchyFilter({ from: levels.length - 1, to: 0 });
    }
  }, [levels]);

  useEffect(() => {
    setSelectedIssues([]);
  }, [hierarchyFilter]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetFilterQuery = useCallback(
    debounce(SEARCH_DEBOUNCE, setFilterQuery),
    [setActiveSearchResult],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const resetActiveSearchResult = useCallback(
    debounce(SEARCH_DEBOUNCE, () => {
      setActiveSearchResult(() => {
        const nextIndex = 0;
        const node = findMatchingSearchNode(searchContextRef, nextIndex);
        if (node) {
          node.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return {
          index: nextIndex,
          hash: node ? node.getAttribute('data-attr-highlighted') : null,
        };
      });
    }),
    [setActiveSearchResult],
  );

  useLayoutEffect(() => {
    resetActiveSearchResult();
  }, [filterQuery, hierarchyFilter, resetActiveSearchResult]);

  const hierarchyLevelByType: { [type: string]: number } = (() => {
    if (!levels) {
      return {};
    }
    return levels
      ?.map(({ issueTypes }) => issueTypes)
      .reduce((result, issueTypes, index) => {
        return {
          ...result,
          ...issueTypes.reduce(
            (result, issueType) => ({ ...result, [issueType]: index }),
            {},
          ),
        };
      }, {});
  })();

  const projectsById = useMemo(() => keyBy('id', projects), [projects]);

  // Filter by heirarchy
  const issuesInScope = allIssues.filter(({ values: { type } }) => {
    const level = hierarchyLevelByType[type] || DEFAULT_HIERARCHY_LEVEL;
    return hierarchyFilter.from >= level && level >= hierarchyFilter.to;
  });

  const hierarchyOptions = (levels || []).map((level, index) => ({
    label: level.title,
    value: index,
  }));

  const issuesMatchingFilterQuery =
    filterQuery.length >= MIN_FILTER_QUERY_LENGTH
      ? issuesInScope?.filter(({ id, values, issueKey }) => {
          const issueLinkText = getIssueLinkText(
            projectsById[values.project]?.key,
            issueKey,
          );
          return `${issueLinkText} ${values.summary}`
            .toLowerCase()
            .includes(filterQuery.toLowerCase());
        })
      : [];

  const searchMatches: SearchMatch[] =
    filterQuery.length >= MIN_FILTER_QUERY_LENGTH
      ? (issuesMatchingFilterQuery || []).reduce((result, issue) => {
          const matcher = new RegExp(
            escapeRegExp(filterQuery.toLowerCase()),
            'g',
          );
          const issueLinkText = getIssueLinkText(
            projectsById[issue.values.project]?.key,
            issue.issueKey,
          );
          const count = (
            `${issueLinkText} ${issue.values.summary}`
              .toLowerCase()
              .match(matcher) || []
          ).length;
          const newEntries = times(
            (index) => ({
              internalIndex: index,
              id: '',
              issueId: issue.id,
              linkMatch: false,
            }),
            count,
          );
          return result.concat(newEntries);
        }, [] as SearchMatch[])
      : [];

  const compactSelectStyles: StylesConfig<HierarchyOption> = {
    container: (base) => ({
      ...base,
      minWidth: '150px',
    }),
    control: (base) => ({
      ...base,
      height: CONTROLS_HEIGHT,
      minHeight: CONTROLS_HEIGHT,
    }),
    valueContainer: (base) => ({
      ...base,
      height: CONTROLS_HEIGHT - AK_SELECT_PADDING_ADJUST,
      minHeight: CONTROLS_HEIGHT - AK_SELECT_PADDING_ADJUST,
    }),
    indicatorsContainer: (base) => ({
      ...base,
      height: CONTROLS_HEIGHT - AK_SELECT_PADDING_ADJUST,
      minHeight: CONTROLS_HEIGHT - AK_SELECT_PADDING_ADJUST,
    }),
  };

  return (
    <FormContainer isSettingsMode>
      <HeaderContainer isSettingsMode>
        {renderHeader(formatMessage(msgs.title))}
      </HeaderContainer>
      {renderDescription(formatMessage(msgs.description, { issueLimit }))}
      <ControlsContainer>
        <Button
          isDisabled={isEmpty(selectedIssues)}
          isLoading={submitting}
          onClick={async () => {
            setFilterQuery('');
            setSubmitting(true);
            const reincludeIssues = selectedIssues.map((issue) => issue.id);
            await onSubmit(reincludeIssues);
            await fetchRemovedIssues(planId, scenarioId, issueSources);
            setSelectedIssues([]);
            setSubmitting(false);
          }}
          appearance="primary"
        >
          {formatMessage(msgs.reinclude)}
        </Button>
        <HierarchyContainer>
          <label>{formatMessage(msgs.hierarchy)}:</label>
          <Select<HierarchyOption>
            isLoading={hierarchyLoading}
            loadingMessage={() => formatMessage(msgs.loading)}
            options={reverse(hierarchyOptions)}
            isDisabled={submitting}
            isOptionDisabled={(option) =>
              hierarchyOptions.indexOf(option) < hierarchyFilter.to
            }
            value={hierarchyOptions[hierarchyFilter.from]}
            onChange={(selected) => {
              setHierarchyFilter(({ to }) => ({
                from: (selected as HierarchyOption)?.value || 0,
                to,
              }));
            }}
            isSearchable={false}
            styles={compactSelectStyles}
            components={{
              Option: OptionComponent,
              SingleValue: SingleValueComponent,
            }}
          />
          <span>{formatMessage(msgs.hierarchyDivider)}</span>
          <Select<HierarchyOption>
            isLoading={hierarchyLoading}
            loadingMessage={() => formatMessage(msgs.loading)}
            options={reverse(hierarchyOptions)}
            isDisabled={submitting}
            isOptionDisabled={(option) =>
              hierarchyOptions.indexOf(option) > hierarchyFilter.from
            }
            value={hierarchyOptions[hierarchyFilter.to]}
            onChange={(selected) => {
              setHierarchyFilter(({ from }) => ({
                from,
                to: (selected as HierarchyOption)?.value || 0,
              }));
            }}
            isSearchable={false}
            styles={compactSelectStyles}
            components={{
              Option: OptionComponent,
              SingleValue: SingleValueComponent,
            }}
          />
        </HierarchyContainer>
        <Search
          activeSearchResultIndex={activeSearchResult.index}
          totalResults={searchMatches.length}
          searchQuery={filterQuery}
          isDisabled={submitting}
          minQueryLength={MIN_FILTER_QUERY_LENGTH}
          navigateResults={(direction) => {
            setActiveSearchResult(({ index }) => {
              const nextIndex =
                direction === Direction.DOWN
                  ? Math.min(searchMatches.length - 1, index + 1)
                  : Math.max(0, index - 1);

              const node = findMatchingSearchNode(searchContextRef, nextIndex);
              if (node) {
                node.scrollIntoView({ behavior: 'smooth', block: 'center' });
                return {
                  index: nextIndex,
                  hash: node.getAttribute('data-attr-highlighted'),
                };
              }

              // Something wrong, reset
              return { index: 0, hash: null };
            });
          }}
          onClear={() => {
            setFilterQuery('');
          }}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            debouncedSetFilterQuery(event.currentTarget.value);
          }}
          searchContextRef={searchContextRef}
        />
      </ControlsContainer>
      <RemovedIssuesTableTree
        forwardRef={searchContextRef}
        issues={issuesInScope}
        loading={isLoading || issuesLoading}
        isDisabled={submitting}
        selectedIssues={selectedIssues}
        setSelectedIssues={setSelectedIssues}
        hierarchyLevelByType={hierarchyLevelByType}
        issueTypeMap={issueTypeMap}
        issueStatusTypeMap={issueStatusTypeMap}
        projects={projects}
        searchQuery={filterQuery}
        searchMatches={searchMatches}
        activeSearchResult={activeSearchResult}
      />
      {!isLoading && !issuesLoading && (
        <VrReady name="remove-issues-settings-page" />
      )}
    </FormContainer>
  );
};

export default RemovedIssues;
