import React, { useEffect, useState } from 'react';

import compose from 'lodash/fp/compose';
import flow from 'lodash/fp/flow';
import isEqual from 'lodash/fp/isEqual';
import partition from 'lodash/fp/partition';

import Button from '@atlaskit/button/custom-theme-button';
import Form, { Field, FormHeader } from '@atlaskit/form';
import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left';
import { ModalTransition } from '@atlaskit/modal-dialog';
import {
  fireScreenAnalytics,
  fireUIAnalytics,
  MountEvent,
} from '@atlassian/analytics-bridge';

import {
  IssueSource,
  IssueStatusType,
  IssueType,
  Plan,
  ReleaseSelectionMode,
} from '../../common/types';
import {
  Description,
  FormContainer,
  HeaderContainer,
} from '../../common/ui/form';
import IssueCount from '../../common/ui/issue-count';
import { useIntl } from '../../common/utils/intl';
import usePrevious from '../../common/utils/use-previous';
import { VrReady } from '../../common/utils/vr';
import { useAPI } from '../../controllers/api';
import { useIssueCount } from '../../controllers/issue-count';
import { useIssueTypes } from '../../controllers/issue-types';
import { useNav } from '../../controllers/nav';
import { usePlan as usePlanDI } from '../../controllers/plan';
import { usePlanMeta as usePlanMetaDI } from '../../controllers/plan-meta';
import { useProjectsAndReleases } from '../../controllers/projects-and-releases';
import { useStatusTypes } from '../../controllers/status-types';
import { usePlanExclusions } from '../../services';

import ExcludeDays from './exclude-days';
import ExcludeIssueTypes from './exclude-issue-types';
import ExcludeStatusTypes, { CATEGORY_PREFIX } from './exclude-status-types';
import msgs from './messages';
import ReleasesModal from './releases-modal';
import {
  ArchivedReleasesMap,
  FormProps,
  Props,
  SetExclusionRulesProps,
} from './types';

export type { SetExclusionRulesProps } from './types';

const DEFAULT_EXCLUDED_ISSUES_AFTER_DAYS = 30;
export const partitionStatusTypes = flow(
  partition((id: string) => id.startsWith(CATEGORY_PREFIX)),
  ([categories, statuses]: string[][]) => [
    categories.map((id) => id.replace(CATEGORY_PREFIX, '')),
    statuses,
  ],
  ([excludedStatusCategories, excludedStatuses]) => ({
    excludedStatusCategories,
    excludedStatuses,
  }),
);

const RefineIssuesForm: React.FC<Props> = ({
  usePlan = usePlanDI,
  usePlanMeta = usePlanMetaDI,
  isSettingsMode,
  renderHeader = (header) => <FormHeader title={header} />,
  renderDescription = (description) => <Description>{description}</Description>,
}) => {
  const { formatMessage } = useIntl();
  const { back } = useNav();
  const [
    viewReleaseModalState,
    setViewReleaseModalOpen,
  ] = useState<ReleaseSelectionMode | null>(null);
  const { projects, releases } = useProjectsAndReleases();
  const { data: issueTypeMap, loading: issueTypesLoading } = useIssueTypes();
  const {
    data: issueStatusTypeMap,
    loading: statusTypesLoading,
  } = useStatusTypes();
  const { issueLimit, isLoading } = usePlanMeta();
  const { plan, setPlan } = usePlan();
  const { value: issueCount, loading: isIssueCountLoading } = useIssueCount();
  const { excludedStatusCategories = [], excludedStatuses = [] } = plan;
  const excludeStatusTypesAndCategories = excludedStatusCategories
    .map((id) => CATEGORY_PREFIX + id)
    .concat(excludedStatuses);
  let archivedReleasesMap: ArchivedReleasesMap = {};
  if (releases) {
    releases.forEach(({ archived, id }) => {
      archivedReleasesMap[id] = archived;
    });
  }

  useEffect(() => {
    if (plan.excludeDays === undefined) {
      setPlan({
        ...plan,
        excludeDays: plan.excludeDays || DEFAULT_EXCLUDED_ISSUES_AFTER_DAYS,
      });
    }
  });

  const handleFormSubmit = (data: FormProps) => {
    const {
      excludeIssueTypes = [],
      excludeStatusTypes: rawExcludeStatusTypes = [],
      excludeDays = DEFAULT_EXCLUDED_ISSUES_AFTER_DAYS,
    } = data;
    const { excludedStatusCategories, excludedStatuses } = partitionStatusTypes(
      rawExcludeStatusTypes,
    );
    const sanatizedExcludeDays = Number(excludeDays);
    const nextPlan: Plan = {
      ...plan,
      excludeDays: Number.isNaN(sanatizedExcludeDays)
        ? DEFAULT_EXCLUDED_ISSUES_AFTER_DAYS
        : sanatizedExcludeDays,
      excludedIssueTypes: excludeIssueTypes,
      excludedStatuses,
      excludedStatusCategories,
    };
    setPlan(nextPlan);
    back();
  };

  return (
    <FormContainer isSettingsMode={isSettingsMode}>
      <MountEvent
        onMount={(analyticsEvent) => fireScreenAnalytics(analyticsEvent)}
      />
      <Form<FormProps> onSubmit={handleFormSubmit}>
        {({ formProps }) => (
          <form {...formProps}>
            <HeaderContainer isSettingsMode={isSettingsMode}>
              {!isSettingsMode && (
                <Button
                  type="submit"
                  appearance="link"
                  iconBefore={
                    <ArrowLeftIcon label={formatMessage(msgs.backToPlan)} />
                  }
                  style={{
                    padding: 0,
                    marginLeft: '-10px',
                    position: 'absolute',
                    top: 0,
                  }}
                >
                  {formatMessage(msgs.backToPlan)}
                </Button>
              )}
              {renderHeader(
                formatMessage(isSettingsMode ? msgs.titleSettings : msgs.title),
              )}
              <IssueCount
                issueCount={issueCount ?? 0}
                limit={issueLimit}
                loading={isIssueCountLoading}
              />
            </HeaderContainer>
            {renderDescription(
              formatMessage(
                isSettingsMode ? msgs.descriptionSettings : msgs.description,
              ),
            )}

            <Field<number>
              name="excludeDays"
              label={formatMessage(
                msgs.excludeDaysLabelStatusCategoryChangeDate,
              )}
              defaultValue={plan.excludeDays}
              validate={(value) => {
                // This is actually correct, number field returns string because you can use scientific notation
                const valueAsString = String(value);
                const parsed = Number(valueAsString);
                if (
                  !value ||
                  Number.isNaN(parsed) ||
                  parsed < 0 ||
                  Math.floor(parsed) !== parsed
                ) {
                  return formatMessage(msgs.daysSinceDoneValidation);
                }
              }}
              isRequired
            >
              {({ fieldProps, error, valid }) => (
                <ExcludeDays
                  fieldProps={{
                    ...fieldProps,
                    onBlur: compose(fieldProps.onBlur, () => {
                      if (valid) {
                        setPlan((plan) => ({
                          ...plan,
                          excludeDays: fieldProps.value,
                        }));
                      }
                    }),
                  }}
                  error={error}
                  valid={!fieldProps.isInvalid}
                  key={plan.excludeDays}
                />
              )}
            </Field>

            <br />

            <Field<IssueType['id'][]>
              name="excludeIssueTypes"
              label={formatMessage(msgs.excludeIssueTypeLabel)}
              defaultValue={plan.excludedIssueTypes}
            >
              {({ fieldProps, error, valid }) => (
                <ExcludeIssueTypes
                  fieldProps={{
                    ...fieldProps,
                    onBlur: compose(fieldProps.onBlur, () => {
                      if (valid) {
                        setPlan((plan) => ({
                          ...plan,
                          excludedIssueTypes: fieldProps.value,
                        }));
                      }
                    }),
                  }}
                  error={error}
                  valid={valid}
                  loading={issueTypesLoading}
                  issueTypeMap={issueTypeMap}
                />
              )}
            </Field>

            <br />

            <Field<IssueStatusType['id'][]>
              name="excludeStatusTypes"
              label={formatMessage(msgs.excludeStatusTypeLabel)}
              defaultValue={excludeStatusTypesAndCategories}
            >
              {({ fieldProps, error, valid }) => (
                <ExcludeStatusTypes
                  fieldProps={{
                    ...fieldProps,
                    onBlur: compose(fieldProps.onBlur, () => {
                      if (valid) {
                        setPlan((plan) => ({
                          ...plan,
                          ...partitionStatusTypes(fieldProps.value),
                        }));
                      }
                    }),
                  }}
                  error={error}
                  valid={valid}
                  loading={statusTypesLoading}
                  statusTypeMap={issueStatusTypeMap}
                />
              )}
            </Field>

            <br />

            <Field
              name="excludeReleases"
              label={formatMessage(msgs.excludeReleases)}
            >
              {({ fieldProps, error, valid }) => {
                const numExcludedReleases =
                  plan.excludedVersions && releases
                    ? plan.excludedVersions.filter(
                        (version) => !archivedReleasesMap[version],
                      ).length
                    : 0;
                return (
                  <div>
                    <Button
                      testId="view-releases"
                      type="button"
                      onClick={(_, analyticsEvent) => {
                        fireUIAnalytics(analyticsEvent, 'viewReleasesButton');
                        setViewReleaseModalOpen(ReleaseSelectionMode.EXCLUDE);
                      }}
                    >
                      {formatMessage(msgs.viewReleases)}
                    </Button>
                    {numExcludedReleases > 0 ? (
                      <Button
                        testId="releases-excluded"
                        appearance="link"
                        style={{ display: 'block', padding: 0 }}
                        onClick={() =>
                          setViewReleaseModalOpen(
                            ReleaseSelectionMode.REINCLUDE,
                          )
                        }
                      >
                        {formatMessage(msgs.numReleasesExcluded, {
                          numExcludedReleases,
                        })}
                      </Button>
                    ) : null}
                  </div>
                );
              }}
            </Field>

            <ModalTransition>
              {viewReleaseModalState !== null ? (
                <ReleasesModal
                  plan={plan}
                  allProjects={projects}
                  allReleases={releases}
                  loading={isLoading}
                  onClose={() => {
                    setViewReleaseModalOpen(null);
                  }}
                  onSubmit={(excludedVersions) => {
                    setPlan({ ...plan, excludedVersions });
                  }}
                  defaultMode={
                    viewReleaseModalState || ReleaseSelectionMode.EXCLUDE
                  }
                  isSettingsMode={isSettingsMode}
                />
              ) : null}
            </ModalTransition>
          </form>
        )}
      </Form>
      {!isIssueCountLoading && (
        <VrReady name="set-exclusion-rules-settings-page" />
      )}
    </FormContainer>
  );
};

const useIssueSourcesAndExclusions = ({
  planId,
  issueSources,
}: {
  planId: NonNullable<Plan['id']>;
  issueSources: IssueSource[];
}) => {
  const api = useAPI();
  const {
    data: exclusions,
    fetchData: fetchPlanExclusions,
  } = usePlanExclusions(api);

  useEffect(() => {
    fetchPlanExclusions(planId);
  }, [fetchPlanExclusions, planId]);

  return {
    exclusions,
    issueSources,
  };
};

export const SetExclusionRules = ({
  usePlan = usePlanDI,
  planId,
  issueSources: issueSourcesFromProps,
  excludeDays,
  onChange = async () => {},
  renderLoadingSpinner = () => <></>,
  renderHeader = (header) => <FormHeader>{header}</FormHeader>,
  renderDescription = (description) => <Description>{description}</Description>,
}: SetExclusionRulesProps) => {
  const { plan, setPlan } = usePlan();
  const [initialized, setInitialized] = useState(false);
  const { issueSources, exclusions } = useIssueSourcesAndExclusions({
    planId,
    issueSources: issueSourcesFromProps,
  });

  const previousPlan = usePrevious(plan);

  useEffect(() => {
    if (issueSources && exclusions) {
      setPlan((plan) => ({
        ...plan,
        id: planId,
        issueSources: issueSources,
        ...exclusions,
      }));
      setInitialized(true);
    }
  }, [issueSources, exclusions, planId, setPlan]);

  useEffect(() => {
    setPlan((plan) => ({ ...plan, excludeDays }));
  }, [excludeDays, setPlan]);

  useEffect(() => {
    const {
      id,
      excludeDays,
      excludedIssueTypes,
      excludedStatusCategories,
      excludedStatuses,
      excludedVersions,
    } = plan;

    // Stops some DDOSing when users spam blur some of the fields

    if (isEqual(plan, previousPlan) || previousPlan.id == null) {
      return;
    }

    onChange({
      id,
      excludeDays: Number(excludeDays),
      excludeIssueTypes: excludedIssueTypes,
      excludeStatusCategories: excludedStatusCategories,
      excludeStatusTypes: excludedStatuses,
      excludedVersions,
    });
  }, [onChange, plan, previousPlan]);

  if (!initialized) {
    return renderLoadingSpinner();
  }

  return (
    <RefineIssuesForm
      renderHeader={renderHeader}
      renderDescription={renderDescription}
      isSettingsMode
    />
  );
};

export default RefineIssuesForm;
