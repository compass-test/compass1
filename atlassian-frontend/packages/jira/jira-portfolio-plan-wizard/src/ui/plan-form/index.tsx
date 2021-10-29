import React, { useEffect } from 'react';

import isEqual from 'lodash/fp/isEqual';
import { FormattedMessage } from 'react-intl';

import ButtonGroup from '@atlaskit/button/button-group';
import Button from '@atlaskit/button/custom-theme-button';
import Form, {
  ErrorMessage,
  Field,
  FormFooter,
  FormHeader,
} from '@atlaskit/form';
import SectionMessage from '@atlaskit/section-message';
import TextField from '@atlaskit/textfield';
import {
  fireScreenAnalytics,
  fireUIAnalytics,
  MountEvent,
} from '@atlassian/analytics-bridge';

import { Plan } from '../../common/types';
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
import { useFeatureFlags } from '../../controllers/feature-flags';
import { useForm } from '../../controllers/form';
import { useIssueCount } from '../../controllers/issue-count';
import { useNav } from '../../controllers/nav';
import { usePlan as usePlanDI } from '../../controllers/plan';
import { usePlanMeta as usePlanMetaDI } from '../../controllers/plan-meta';
import { useBasicPlanInfo } from '../../services';

import { NAME_LIMIT } from './constants';
import GearIcon from './gear-icon';
import IssueSourcesField from './issue-sources-field';
import messages from './messages';
import PermissionField from './permission-field';
import SetExclusionRulesButton from './set-exclusion-rules-button';
import {
  ProjectOverLimitTitle,
  SetRulesButtonGroup,
  SetRulesSection,
  SetRulesSectionInner,
  WarningStyledMessageWrapper,
} from './styled';
import {
  ErrorAppearance,
  FormProps,
  IssueSourcesSettingsPageProps,
  ProjectLimitFormProps,
  ProjectOverLimitPageProps,
} from './types';
import {
  beforeSubmit,
  useIssueSourceOverLimitError,
  validateIssueSources,
  validatePlanNameField,
  validationErrors,
} from './utils';

export type {
  IssueSourcesSettingsPageProps,
  ProjectOverLimitPageProps,
} from './types';

const LEARN_MORE_URL = {
  cloud:
    'https://confluence.atlassian.com/display/advancedroadmapscloud/Missing+issues',
  server:
    'https://confluence.atlassian.com/display/JIRAPortfolioServer/Troubleshooting+missing+issues',
  issueSources:
    'https://support.atlassian.com/jira-software-cloud/docs/add-or-change-issue-sources-in-a-plan/',
};

type ShowExitButtonType = {
  shouldDisplay: boolean;
  onClicked: () => void;
};

type Props = {
  usePlan?: typeof usePlanDI;
  usePlanMeta?: typeof usePlanMetaDI;
  showExitButton?: ShowExitButtonType;
};

export const OverLimitErrorMessage = ({
  appearance,
  ...messageProps
}: FormattedMessage.MessageDescriptor & {
  appearance: ErrorAppearance;
  values?: {};
}) => (
  <WarningStyledMessageWrapper appearance={appearance}>
    <ErrorMessage>
      <FormattedMessage {...messageProps} />
    </ErrorMessage>
  </WarningStyledMessageWrapper>
);

export const calculatePlanningUnit = (plan: Plan): Plan => ({
  ...plan,
  planningUnit: plan.issueSources.some((source) => {
    return source.type !== 'Board' || !source.isUsingStoryPoints;
  })
    ? 'Days'
    : 'StoryPoints',
});

const PlanForm: React.FC<Props> = ({
  usePlan = usePlanDI,
  usePlanMeta = usePlanMetaDI,
  showExitButton = {
    shouldDisplay: false,
    onClicked: () => {},
  },
}) => {
  const { getNewPlanWizardIssueOverLimit } = useFeatureFlags();
  const { next } = useNav();
  const { submit } = useForm();
  const { plan, setPlan, sync } = usePlan();
  const {
    issueLimit,
    projectLimit,
    dirtyFields,
    setDirtyFields,
  } = usePlanMeta();
  const { value: issueCount, loading: isIssueCountLoading } = useIssueCount();
  const { formatMessage } = useIntl();
  const {
    error: issueSourcesValidationError,
    errorMessage: issueSourcesErrorMessage,
  } = useIssueSourceOverLimitError({ isConfigurationPage: false });

  const handleSubmit = async (data: FormProps) => {
    if (!projectLimit || !issueLimit) {
      return;
    }
    const [hasError, errors] = beforeSubmit(data);

    if (hasError) {
      return errors;
    }

    try {
      await submit();
    } catch (e) {
      const err = (e || new Error('Unknown Error')) as Error;
      if (err.name === 'TaskHandledError') {
        return { generic: '' };
      }
    }

    // Determine planningUnit
    setPlan(calculatePlanningUnit);
    await sync();
    // Need to make the form to have infinite loading state while redirecting
    await new Promise(() => {});
  };

  return (
    <FormContainer>
      <MountEvent
        onMount={(analyticsEvent) => fireScreenAnalytics(analyticsEvent)}
      />
      <Form<FormProps> onSubmit={handleSubmit}>
        {({ formProps, submitting, getValues, getState }) => {
          const {
            hasValidationErrors,
            values: formValues,
            errors,
          } = getState();
          // Ideally issueSourcesValidationError is in the <Field validation/> but our use-case is special
          // The refine issues page actually affects the validity of this field in the first page
          // So for now just use the observer level validationError

          const formHasErrors =
            hasValidationErrors || !!issueSourcesValidationError;

          return (
            <form {...formProps}>
              <HeaderContainer>
                <FormHeader title={<FormattedMessage {...messages.title} />} />
                {plan.issueSources.length ? (
                  <IssueCount
                    issueCount={issueCount || 0}
                    loading={isIssueCountLoading}
                    limit={issueLimit}
                  />
                ) : null}
              </HeaderContainer>
              <Description>
                <FormattedMessage {...messages.subTitle} />
              </Description>
              <Field<FormProps['name']>
                name="name"
                label={<FormattedMessage {...messages.nameLabel} />}
                defaultValue={plan.name}
                isRequired
                validate={validatePlanNameField}
                isDisabled={submitting}
              >
                {({ fieldProps, error }) => (
                  <>
                    <TextField
                      testId="name"
                      {...fieldProps}
                      onChange={(e) => {
                        const name = e.currentTarget.value;
                        setDirtyFields((state) => ({ ...state, name: true }));
                        setPlan((plan) => ({ ...plan, name }));
                        fieldProps.onChange(name);
                      }}
                      autoComplete="off"
                      placeholder={formatMessage(messages.namePlaceholder)}
                    />
                    {error === validationErrors.planNameEmpty && (
                      <ErrorMessage>
                        <FormattedMessage {...messages.mameEmptyError} />
                      </ErrorMessage>
                    )}
                    {error === validationErrors.planNameTooLong && (
                      <ErrorMessage>
                        <FormattedMessage
                          {...messages.nameHitLimitError}
                          values={{ limit: NAME_LIMIT + 1 }}
                        />
                      </ErrorMessage>
                    )}
                  </>
                )}
              </Field>
              <br />
              <Field<FormProps['permission']>
                name="permission"
                label={formatMessage(messages.permissionLabel)}
                defaultValue={plan.permission}
                isRequired
                isDisabled={submitting}
              >
                {({ fieldProps }) => (
                  <PermissionField
                    {...fieldProps}
                    onChange={(permission) => {
                      setDirtyFields((state) => ({
                        ...state,
                        permission: true,
                      }));
                      setPlan((plan) => ({ ...plan, permission }));
                      fieldProps.onChange(permission);
                    }}
                    id="permission-field"
                  />
                )}
              </Field>
              <br />
              <Field<FormProps['issueSources']>
                name="issueSources"
                label={formatMessage(messages.issueSourcesLabel)}
                defaultValue={plan.issueSources}
                isRequired
                isDisabled={submitting}
                validate={validateIssueSources}
              >
                {({ fieldProps, meta }) => {
                  const error = dirtyFields.issueSources && errors.issueSources;
                  return (
                    <IssueSourcesField
                      key="issue-sources"
                      {...fieldProps}
                      onChange={(issueSources) => {
                        setDirtyFields((state) => ({
                          ...state,
                          issueSources: true,
                        }));
                        setPlan((plan) => ({
                          ...plan,
                          issueSources,
                        }));
                        fieldProps.onChange(issueSources);
                      }}
                      errorMessage={(() => {
                        switch (error || issueSourcesValidationError) {
                          case validationErrors.issueSourcesEmpty: {
                            return (
                              <ErrorMessage>
                                <FormattedMessage
                                  {...messages.issueSourcesEmptyError}
                                />
                              </ErrorMessage>
                            );
                          }
                          case validationErrors.OnlyIssueLimitError:
                          case validationErrors.OnlyProjectLimitError:
                          case validationErrors.ProjectLimitAndIssueLimitError: {
                            return issueSourcesErrorMessage ? (
                              <OverLimitErrorMessage
                                {...issueSourcesErrorMessage.descriptor}
                                appearance={issueSourcesErrorMessage.appearance}
                                values={issueSourcesErrorMessage.values}
                              />
                            ) : null;
                          }
                        }
                        return null;
                      })()}
                      hint={
                        !getNewPlanWizardIssueOverLimit() &&
                        error === validationErrors.issueSourcesEmpty &&
                        !meta.dirtySinceLastSubmit && (
                          <ErrorMessage>
                            <FormattedMessage
                              {...messages.issueSourcesEmptyError}
                            />
                          </ErrorMessage>
                        )
                      }
                    />
                  );
                }}
              </Field>
              <SetRulesSection>
                <GearIcon width={60} height={60} />
                <SetRulesSectionInner>
                  <h2>
                    <FormattedMessage {...messages.setRulesHeading} />
                  </h2>
                  <p>
                    <FormattedMessage {...messages.setRulesMessage} />
                  </p>
                  <SetRulesButtonGroup>
                    <ButtonGroup>
                      <SetExclusionRulesButton
                        isDisabled={submitting}
                        onClick={(_, analyticsEvent) => {
                          fireUIAnalytics(analyticsEvent, 'refineIssuesButton');
                          setPlan((plan) => {
                            if (getNewPlanWizardIssueOverLimit()) {
                              return { ...plan, ...formValues };
                            }
                            return { ...plan, ...getValues() };
                          });
                          next();
                        }}
                        testId="set-exclusion-rules"
                      />
                    </ButtonGroup>
                  </SetRulesButtonGroup>
                </SetRulesSectionInner>
              </SetRulesSection>
              <FormFooter>
                <ButtonGroup>
                  {showExitButton.shouldDisplay ? (
                    <Button
                      testId="cancel"
                      type="button"
                      isDisabled={submitting}
                      onClick={(_, analyticsEvent) => {
                        fireUIAnalytics(analyticsEvent, 'cancelButton');
                        showExitButton.onClicked();
                      }}
                    >
                      <FormattedMessage {...messages.cancel} />
                    </Button>
                  ) : null}
                  <Button
                    testId="submit"
                    type="submit"
                    appearance="primary"
                    isLoading={submitting}
                    onClick={(_, analyticsEvent) =>
                      fireUIAnalytics(analyticsEvent, 'submitButton')
                    }
                    isDisabled={formHasErrors}
                  >
                    <FormattedMessage {...messages.create} />
                  </Button>
                </ButtonGroup>
              </FormFooter>
            </form>
          );
        }}
      </Form>
    </FormContainer>
  );
};

export const IssueSourcesSettingsPage = ({
  usePlan = usePlanDI,
  usePlanMeta = usePlanMetaDI,
  planId,
  excludeDays,
  onChange = async () => {},
  toggleIssueLimitWarningFlag = () => {},
  toggleNextGenWarningFlag = () => {},
  renderLoadingSpinner = () => <></>,
  renderHeader = (header) => <FormHeader>{header}</FormHeader>,
  renderDescription = (description) => <Description>{description}</Description>,
}: IssueSourcesSettingsPageProps) => {
  const { getIssueSourceSettingsConfirmOnRemove } = useFeatureFlags();
  const api = useAPI();
  const { plan, setPlan } = usePlan();
  const { formatMessage } = useIntl();
  const {
    data: planBasicInfo,
    fetchData: fetchPlanBasicInfo,
  } = useBasicPlanInfo(api);
  const { issueLimit } = usePlanMeta();
  const { value: issueCount, loading: isIssueCountLoading } = useIssueCount();
  const previousPlan = usePrevious(plan);
  const {
    errorMessage: issueSourcesErrorMessage,
  } = useIssueSourceOverLimitError({ isConfigurationPage: true });

  useEffect(() => {
    fetchPlanBasicInfo(planId);
  }, [fetchPlanBasicInfo, planId]);

  useEffect(() => {
    if (planBasicInfo) {
      setPlan((plan) => ({
        id: planId,
        name: plan.name,
        permission: 'open',
        issueSources: planBasicInfo.issueSources,
        excludedVersions: planBasicInfo.excludedVersions,
        excludeDays: Number(excludeDays),
        excludedIssueTypes: planBasicInfo.excludedIssueTypes,
        excludedStatusCategories: planBasicInfo.excludedStatusCategories,
        excludedStatuses: planBasicInfo.excludedStatuses || [],
      }));
    }
  }, [excludeDays, planBasicInfo, planId, setPlan]);

  useEffect(() => {
    const { id, issueSources, excludedVersions } = plan;

    // Stops some DDOSing when users spam blur some of the fields
    if (isEqual(plan, previousPlan) || previousPlan.id == null) {
      return;
    }

    onChange({ id, issueSources, excludedVersions });
  }, [onChange, plan, previousPlan]);

  useEffect(() => {
    if (!issueCount || !issueLimit || !plan.issueSources) {
      return;
    }

    const shouldShowIssueLimitWarningFlag = issueCount > issueLimit;
    toggleIssueLimitWarningFlag(shouldShowIssueLimitWarningFlag);

    const nextGenProjects = plan.issueSources.filter(
      (issueSource) => issueSource.hasNextGenProjects,
    );
    const shouldShowNextGenWarningFlag = nextGenProjects.length > 0;
    toggleNextGenWarningFlag(shouldShowNextGenWarningFlag);
  }, [
    toggleIssueLimitWarningFlag,
    toggleNextGenWarningFlag,
    issueLimit,
    issueCount,
    plan,
    previousPlan,
  ]);

  const unInitialized = !planBasicInfo || plan.id == null;

  const description = (
    <FormattedMessage
      {...messages.issueSourcesDescriptionSettingsStatusCategoryChangeDate}
      values={{
        LearnMoreLink: (
          <Button
            href={LEARN_MORE_URL.cloud}
            target="_blank"
            appearance="link"
            onClick={(_, analyticsEvent) => {
              fireUIAnalytics(analyticsEvent, 'missingIssuesButton', {
                planId,
              });
            }}
            style={{ padding: 0, margin: 0 }}
          >
            {/* span gets rid of the margin in the default*/}
            <span>{formatMessage(messages.learnMore)}</span>
          </Button>
        ),
      }}
    />
  );

  // Note: Be careful when changing this, done like this so <Mount /> Event only triggers once
  const content = unInitialized ? (
    renderLoadingSpinner()
  ) : (
    <>
      <HeaderContainer isSettingsMode>
        {renderHeader(formatMessage(messages.issueSourcesTitleSettings))}
        <IssueCount
          issueCount={issueCount ?? 0}
          limit={issueLimit}
          loading={isIssueCountLoading}
        />
      </HeaderContainer>
      {renderDescription(description)}
      <IssueSourcesField
        value={plan.issueSources}
        onChange={(issueSources) => {
          setPlan((plan) => ({ ...plan, issueSources }));
        }}
        showTeams={false}
        errorMessage={
          issueSourcesErrorMessage ? (
            <OverLimitErrorMessage
              {...issueSourcesErrorMessage.descriptor}
              appearance={issueSourcesErrorMessage.appearance}
              values={issueSourcesErrorMessage.values}
            />
          ) : null
        }
        confirmOnRemove={getIssueSourceSettingsConfirmOnRemove()}
      />
      {!isIssueCountLoading && <VrReady name="issue-sources-settings-page" />}
    </>
  );

  return (
    <FormContainer isSettingsMode>
      <MountEvent
        onMount={(analyticsEvent) => fireScreenAnalytics(analyticsEvent)}
      />
      {content}
    </FormContainer>
  );
};

export const ProjectOverLimitPage = ({
  usePlan = usePlanDI,
  usePlanMeta = usePlanMetaDI,
  planId,
  onChange = async () => {},
  renderLoadingSpinner = () => <></>,
}: ProjectOverLimitPageProps) => {
  const { submit } = useForm();
  const { plan, setPlan, sync } = usePlan();
  const { issueLimit } = usePlanMeta();
  const { value: issueCount, loading: isIssueCountLoading } = useIssueCount();
  const { formatMessage } = useIntl();
  const api = useAPI();
  const {
    data: planBasicInfo,
    fetchData: fetchPlanBasicInfo,
  } = useBasicPlanInfo(api);
  const previousPlan = usePrevious(plan);

  const { getIssueSourceSettingsConfirmOnRemove } = useFeatureFlags();

  const {
    errorMessage: issueSourcesErrorMessage,
  } = useIssueSourceOverLimitError({ isConfigurationPage: false });

  useEffect(() => {
    fetchPlanBasicInfo(planId);
  }, [fetchPlanBasicInfo, planId]);

  useEffect(() => {
    if (planBasicInfo) {
      setPlan((plan) => ({
        ...plan,
        id: planId,
        name: plan.name,
        permission: 'open',
        issueSources: planBasicInfo.issueSources,
        excludedVersions: planBasicInfo.excludedVersions,
        excludedIssueTypes: planBasicInfo.excludedIssueTypes,
        excludedStatusCategories: planBasicInfo.excludedStatusCategories,
        excludedStatuses: planBasicInfo.excludedStatuses || [],
      }));
    }
  }, [planBasicInfo, planId, setPlan]);

  useEffect(() => {
    const { id, issueSources, excludedVersions } = plan;

    // Stops some DDOSing when users spam blur some of the fields
    if (isEqual(plan, previousPlan) || previousPlan.id == null) {
      return;
    }

    onChange({ id, issueSources, excludedVersions });
  }, [onChange, plan, previousPlan]);

  const handleSubmit = async () => {
    try {
      await submit();
    } catch (e) {
      const err = (e || new Error('Unknown Error')) as Error;
      if (err.name === 'TaskHandledError') {
        return { generic: '' };
      }
    }

    await sync();
    // Need to make the form to have infinite loading state while redirecting
    await new Promise(() => {});
  };

  const unInitialized = !planBasicInfo || plan.id == null;

  if (unInitialized) {
    return renderLoadingSpinner();
  }

  // Note: Be careful when changing this, done like this so <Mount /> Event only triggers once
  const issueSourcesContent = (
    <>
      <IssueSourcesField
        value={plan.issueSources}
        onChange={(issueSources) => {
          setPlan((plan) => ({ ...plan, issueSources }));
        }}
        showTeams={false}
        errorMessage={
          issueSourcesErrorMessage ? (
            <OverLimitErrorMessage
              {...issueSourcesErrorMessage.descriptor}
              appearance={issueSourcesErrorMessage.appearance}
              values={issueSourcesErrorMessage.values}
            />
          ) : null
        }
        confirmOnRemove={getIssueSourceSettingsConfirmOnRemove()}
      />
      {!isIssueCountLoading && <VrReady name="issue-sources-settings-page" />}
    </>
  );

  return (
    <FormContainer>
      <SectionMessage
        title={formatMessage(messages.projectOverLimitSectionHeader)}
        appearance="error"
      >
        <p>
          <FormattedMessage {...messages.projectOverLimitSectionBody} />
        </p>
        <Button
          href={LEARN_MORE_URL.issueSources}
          target="_blank"
          appearance="link"
          onClick={(_, analyticsEvent) => {
            fireUIAnalytics(analyticsEvent, 'issueSourcesLearnMore', {
              planId,
            });
          }}
          style={{ padding: 0, margin: 0 }}
        >
          {formatMessage(messages.issueSourcesLearnMore)}
        </Button>
      </SectionMessage>
      <Form<ProjectLimitFormProps> onSubmit={handleSubmit}>
        {({ formProps, submitting, getValues }) => (
          <form {...formProps}>
            <ProjectOverLimitTitle>
              <FormHeader
                title={
                  <span style={{ whiteSpace: 'initial' }}>
                    <FormattedMessage
                      {...messages.projectOverLimitTitle}
                      values={{ planName: plan.name }}
                    />
                  </span>
                }
              />
              <IssueCount
                issueCount={issueCount ?? 0}
                limit={issueLimit}
                loading={isIssueCountLoading}
              />
            </ProjectOverLimitTitle>
            {issueSourcesContent}
            <FormFooter>
              <ButtonGroup>
                <Button
                  testId="submit"
                  type="submit"
                  appearance="primary"
                  isLoading={submitting}
                  onClick={(_, analyticsEvent) =>
                    fireUIAnalytics(analyticsEvent, 'submitButton')
                  }
                  isDisabled={issueSourcesErrorMessage != null}
                >
                  <FormattedMessage {...messages.update} />
                </Button>
              </ButtonGroup>
            </FormFooter>
          </form>
        )}
      </Form>
    </FormContainer>
  );
};

export default PlanForm;
