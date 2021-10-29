import React, { ReactNode, useCallback, useEffect } from 'react';

import partition from 'lodash/fp/partition';
import throttle from 'lodash/fp/throttle';

import Button from '@atlaskit/button/custom-theme-button';
import InfoIcon from '@atlaskit/icon/glyph/editor/info';
import WarningIcon from '@atlaskit/icon/glyph/warning';
import InlineMessage from '@atlaskit/inline-message';
import Select, {
  components,
  OptionProps,
  OptionType,
  ValueType,
} from '@atlaskit/select';
import * as colors from '@atlaskit/theme/colors';
import Tooltip from '@atlaskit/tooltip';
import {
  ContextualAnalyticsData,
  fireScreenAnalytics,
  fireUIAnalytics,
  MODAL,
  MountEvent,
} from '@atlassian/analytics-bridge';

import { IssueSource, Team } from '../../../../common/types';
import { useIntl } from '../../../../common/utils/intl';
import { useAPI } from '../../../../controllers/api';
import { TeamsFilter, useComponents } from '../../../../controllers/components';
import { useFeatureFlags } from '../../../../controllers/feature-flags';
import {
  useBoardsService,
  useFiltersService,
  useProjectsService,
} from '../../../../services/issue-sources';

import messages from './messages';
import {
  Container,
  GroupLabel,
  Icon,
  Label,
  LabelContainer,
  OptionsDivider,
  TeamColumnLabel,
  TeamSelectWrapper,
  TypeSelectWrapper,
  ValueSelectWrapper,
  WarningContainer,
  WarningContent,
} from './styled';

export const initialIssueSource: IssueSource = {
  id: 0,
  type: 'Board',
  value: '',
  hasNextGenProjects: false,
};

export type Props = {
  id?: string;
  rowIndex: number;
  value: IssueSource;
  onChange: (next: IssueSource) => void;
  removable: boolean;
  onRequestRemove: (issueSourceName?: string) => void;
  optionsFilter?: (option: OptionType) => boolean;
  teamsFilter?: TeamsFilter;
  isDisabled?: boolean;
  showTeam?: boolean;
};

const makeTypeOpts = (intl: ReturnType<typeof useIntl>): OptionType[] => [
  { label: intl.formatMessage(messages.board), value: 'Board' },
  { label: intl.formatMessage(messages.project), value: 'Project' },
  { label: intl.formatMessage(messages.filter), value: 'Filter' },
];

const OptionComponent = (props: OptionProps) => (
  <components.Option {...props}>
    <LabelContainer>
      {props.data.icon && props.data.icon}
      {props.data.label}
    </LabelContainer>
  </components.Option>
);

const NEXT_GEN_WARNING_LINK =
  'https://confluence.atlassian.com/advancedroadmapscloud/discovering-advanced-roadmaps-998650908.html';

const placeholderStyles = {
  placeholder: (base: any) => ({
    ...base,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    maxWidth: 'calc(100% - 5px)',
  }),
};

const IssueSourceField: React.FC<Props> = ({
  id,
  rowIndex,
  value: issueSource,
  onChange,
  removable,
  onRequestRemove,
  optionsFilter,
  teamsFilter,
  isDisabled,
  showTeam = true,
}) => {
  const api = useAPI();
  const { teamPicker: TeamPicker } = useComponents();
  const intl = useIntl();
  const {
    getProjectTypeRebrand,
    getPlanIsUsingStoryPoints,
    getAddTeamWithIssueSource,
  } = useFeatureFlags();
  const typeOpts = makeTypeOpts(intl);
  const boardsService = useBoardsService(api);
  const fetchBoards = boardsService.fetchData;

  const projectsService = useProjectsService(api);
  const fetchProjects = projectsService.fetchData;

  const filtersService = useFiltersService(api);
  const fetchFilters = filtersService.fetchData;

  // AFP-2511 TODO: Fix automatic suppressions below
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchOptions = useCallback(
    throttle(250, (query: string) => {
      switch (issueSource.type) {
        case 'Board':
          return fetchBoards(query);
        case 'Project':
          return fetchProjects(query);
        case 'Filter':
          return fetchFilters(query);
      }
    }),
    [issueSource.type, fetchBoards, fetchProjects, fetchFilters],
  );

  const [valueOpts, placeholder, loading] = ((): [
    OptionType[],
    ReactNode,
    boolean,
  ] => {
    switch (issueSource.type) {
      case 'Board': {
        const options: OptionType[] = (boardsService.data || []).map(
          (board) => ({
            label: board.name,
            value: board.id,
            hasNextGenProjects: board.hasNextGenProjects,
            ...(getPlanIsUsingStoryPoints() && {
              isUsingStoryPoints: board.isUsingStoryPoints,
            }),
            ...(getAddTeamWithIssueSource()
              ? { isScrum: board.schedulingMode === 'SCRUM' }
              : {}),
          }),
        );

        return [
          options,
          intl.formatMessage(messages.chooseBoard),
          boardsService.loading,
        ];
      }
      case 'Project': {
        const options: OptionType[] = (projectsService.data || []).map(
          (project) => ({
            label: project.name,
            value: project.id,
            hasNextGenProjects: project.hasNextGenProjects,
            icon: (
              <Icon
                src={project.avatarUrl}
                alt={project.name}
                isDisabled={!!project.hasNextGenProjects}
              />
            ),
          }),
        );

        return [
          options,
          intl.formatMessage(messages.chooseProject),
          projectsService.loading,
        ];
      }

      case 'Filter': {
        const options: OptionType[] = (filtersService.data || []).map(
          (filter) => ({
            label: filter.name,
            value: filter.id,
            hasNextGenProjects: filter.hasNextGenProjects,
          }),
        );

        return [
          options,
          intl.formatMessage(messages.chooseFilter),
          filtersService.loading,
        ];
      }
    }
  })();

  useEffect(() => {
    fetchOptions('');
  }, [fetchOptions]);

  const selectedTypeOpt = typeOpts.find(
    (opt) => opt.value === issueSource.type,
  );

  const selectedValueOpt = (() => {
    const matchingValue = valueOpts.find(
      (opt) => String(opt.value) === issueSource.value,
    );
    // Use matching value from api (latest), else just use the one in memory
    if (matchingValue) {
      return matchingValue;
    } else if (issueSource.value && issueSource.title) {
      return { label: issueSource.title, value: issueSource.value };
    }
    return null;
  })();

  const handleTypeSelectChange = (selected: ValueType<OptionType>) => {
    const nextType = selected ? ((selected as OptionType).value as string) : '';
    if (nextType === issueSource.type) {
      return;
    }
    switch (nextType) {
      case 'Board':
      case 'Project':
      case 'Filter':
        onChange({
          ...initialIssueSource,
          type: nextType,
        });
        break;
      default:
        break;
    }
  };

  const handleValueSelectChange = async (selected: ValueType<OptionType>) => {
    if (!selected && removable) {
      return onRequestRemove(selectedValueOpt?.label);
    }
    const selectedOption = selected as OptionType;
    const nextValue = String(selectedOption?.value || '');
    const label = selectedOption?.label;
    const hasNextGenProjects = await (async () => {
      if (nextValue && issueSource.type === 'Filter') {
        const result = await api.fetchCheckFiltersHasNextGen([
          Number(nextValue),
        ]);
        return !!result[nextValue];
      }
      return !!selectedOption?.hasNextGenProjects;
    })();
    const isUsingStoryPoints = selectedOption.isUsingStoryPoints;
    const isScrum = Boolean(
      getAddTeamWithIssueSource() &&
        issueSource.type === 'Board' &&
        valueOpts.find((board) => board.value === selected?.value)?.isScrum,
    );

    onChange({
      ...issueSource,
      value: nextValue,
      title: label,
      hasNextGenProjects,
      ...(getPlanIsUsingStoryPoints() && {
        isUsingStoryPoints,
      }),
      ...(getAddTeamWithIssueSource() && { isScrum }),
    });
  };

  const handleTeamSelectChange = (team: Team | void) => {
    if (team) {
      onChange({ ...issueSource, ...{ team } });
    } else {
      const { team, ...issueSourceWithoutTeam } = issueSource;
      onChange(issueSourceWithoutTeam);
    }
  };

  const handleInputChange = (query: string, { action }: { action: string }) => {
    if (action !== 'input-change') {
      return;
    }
    fetchOptions(query);
  };

  const options =
    selectedTypeOpt?.value === 'Filter'
      ? valueOpts
      : // Partition out next-gen
        (() => {
          const [nextGen, nonNextGen] = partition(
            'hasNextGenProjects',
            valueOpts,
          );

          const teamManagedProjectsNotSupportedMsg = getProjectTypeRebrand()
            ? messages.teamManagedProjectsNotSupported
            : messages.nextGenProjectsNotSupported;

          const teamManagedBoardsNotSupportedMsg = getProjectTypeRebrand()
            ? messages.teamManagedBoardsNotSupported
            : messages.nextGenBoardsNotSupported;

          return [
            { options: nonNextGen },
            {
              label: intl.formatMessage(
                selectedTypeOpt?.value === 'Project'
                  ? teamManagedProjectsNotSupportedMsg
                  : teamManagedBoardsNotSupportedMsg,
              ),
              options: nextGen,
            },
          ];
        })();

  return (
    <Container>
      <TypeSelectWrapper>
        <Select
          id={`${id}-type`}
          options={typeOpts}
          value={selectedTypeOpt}
          onChange={handleTypeSelectChange}
          isSearchable={false}
          isDisabled={isDisabled}
          aria-label={selectedTypeOpt?.label}
        />
      </TypeSelectWrapper>
      <ValueSelectWrapper data-testid={`${id}_value`}>
        <Select
          aria-label={selectedTypeOpt?.label}
          id={`${id}_value`}
          isLoading={loading}
          loadingMessage={() => intl.formatMessage(messages.loading)}
          options={options}
          value={selectedValueOpt}
          onChange={handleValueSelectChange}
          isClearable={removable}
          placeholder={placeholder}
          onInputChange={handleInputChange}
          components={{ Option: OptionComponent }}
          isDisabled={isDisabled}
          backspaceRemovesValue={false}
          isOptionDisabled={(option: OptionType) => {
            if (selectedTypeOpt?.value === 'Filter') {
              return false;
            }
            return option.hasNextGenProjects;
          }}
          filterOption={optionsFilter}
          formatGroupLabel={({ label }) =>
            label && (
              <GroupLabel>
                <OptionsDivider />
                {label}
              </GroupLabel>
            )
          }
          styles={placeholderStyles}
        />
      </ValueSelectWrapper>
      {getAddTeamWithIssueSource() && showTeam && (
        <TeamSelectWrapper>
          {rowIndex === 0 && (
            <Tooltip content={intl.formatMessage(messages.chooseTeamTooltip)}>
              <TeamColumnLabel>
                <Label htmlFor={`${id}_team`}>
                  {intl.formatMessage(messages.chooseTeamLabel)}
                </Label>
                <InfoIcon
                  label="info"
                  size="small"
                  primaryColor={colors.N200}
                />
              </TeamColumnLabel>
            </Tooltip>
          )}
          <TeamPicker
            onChange={handleTeamSelectChange}
            isDisabled={Boolean(isDisabled)}
            id={`${id}_team`}
            getTeamsFilter={teamsFilter as TeamsFilter}
            selectedTeamId={issueSource.team?.id}
          />
        </TeamSelectWrapper>
      )}
      {issueSource.hasNextGenProjects && (
        <WarningContainer>
          <InlineMessage type="warning" placement="right">
            <WarningContent>
              <div>
                <WarningIcon
                  primaryColor={colors.Y300}
                  label={intl.formatMessage(
                    getProjectTypeRebrand()
                      ? messages.teamManagedWarningTitle
                      : messages.nextGenWarningTitle,
                  )}
                />
              </div>
              <div>
                <ContextualAnalyticsData
                  sourceType={MODAL}
                  sourceName="issueSourcesNextGenProjectWarning"
                >
                  <MountEvent onMount={fireScreenAnalytics} />
                  <h5>
                    {intl.formatMessage(
                      getProjectTypeRebrand()
                        ? messages.teamManagedWarningTitle
                        : messages.nextGenWarningTitle,
                    )}
                  </h5>
                  <p>
                    {intl.formatMessage(
                      getProjectTypeRebrand()
                        ? messages.teamManagedWarningDescription
                        : messages.nextGenWarningDescription,
                    )}
                  </p>
                  <br />
                  <Button
                    appearance="link"
                    spacing="none"
                    href={NEXT_GEN_WARNING_LINK}
                    target="_blank"
                    onClick={(_, analyticsEvent) => {
                      fireUIAnalytics(
                        analyticsEvent.update({
                          actionSubject: 'link',
                        }),
                        'learnMore',
                      );
                    }}
                  >
                    {intl.formatMessage(
                      getProjectTypeRebrand()
                        ? messages.teamManagedWarningLearnMore
                        : messages.nextGenWarningLearnMore,
                    )}
                  </Button>
                </ContextualAnalyticsData>
              </div>
            </WarningContent>
          </InlineMessage>
        </WarningContainer>
      )}
    </Container>
  );
};

export default IssueSourceField;
