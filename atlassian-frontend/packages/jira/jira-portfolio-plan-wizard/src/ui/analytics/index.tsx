import React, { useEffect, useRef, useState } from 'react';

import { AnalyticsContext } from '@atlaskit/analytics-next';
import { FireTrackAnalytics } from '@atlassian/analytics-bridge';

import { usePlan } from '../../controllers/plan';

type Props = {
  source?: string;
};

/**
 * <ContextProvider /> provide the source and object context for child components
 */
const ContextProvider: React.FC<Props> = ({
  children,
  source: customSource,
}) => {
  const { fromScratch, plan } = usePlan();
  const { current: planId } = useRef(plan?.id);

  const objectType = 'plan';
  const objectId = planId;
  const source =
    customSource ??
    (fromScratch ? 'planWizardCreateScreen' : 'planWizardUpdateScreen');

  return (
    <AnalyticsContext data={{ source, objectType, objectId }}>
      {children}
    </AnalyticsContext>
  );
};

/**
 * <WizardTracker /> triggers operational events whenever the users open the wizard
 */
const WizardTracker: React.FC<{}> = () => {
  return (
    <FireTrackAnalytics
      action="started"
      actionSubject="wizard"
      actionSubjectId="planWizard"
    />
  );
};

/**
 * <PlanTracker /> triggers updated/created track events when the users finish the form
 */
const PlanTracker: React.FC<{}> = () => {
  const { plan, syncing } = usePlan();
  const [shouldFire, setShouldFire] = useState(false);
  const { current: action } = useRef(plan.id == null ? 'created' : 'updated');
  const prevSyncingRef = useRef(false);

  useEffect(() => {
    if (prevSyncingRef.current !== syncing && !syncing) {
      // syncing is done
      setShouldFire(true);
    }

    prevSyncingRef.current = syncing;
  }, [syncing]);

  if (!shouldFire) {
    return null;
  }

  return (
    <FireTrackAnalytics
      action={action}
      actionSubject="plan"
      attributes={{
        version: 3, // The wizard version
        planId: plan.id,
        excludeDays: plan.excludeDays,
        excludeVersions: plan.excludedVersions.length,
        excludeIssueTypes: plan.excludedIssueTypes?.length || 0,
        excludeStatusTypes: plan.excludedStatuses?.length || 0,
        excludeStatusCategories: plan.excludedStatusCategories?.length || 0,
      }}
    />
  );
};

export { ContextProvider, PlanTracker, WizardTracker };
