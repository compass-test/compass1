import React, { FC } from 'react';

import { IntlProvider } from 'react-intl';

import AdvancedRoadmapsTaskCard, { Props } from './index';

export const NoSelection: FC<Partial<Props>> = ({
  onSelect = () => undefined,
  onSkip = () => undefined,
}) => {
  return (
    <IntlProvider locale="en">
      <AdvancedRoadmapsTaskCard
        selection={undefined}
        onSelect={onSelect}
        onSkip={onSkip}
        isLoading={false}
        isSelectLoading={false}
        isSkipLoading={false}
        onUnselectAllPlans={() => undefined}
        isMigratingProjectAttachmentsOnly={false}
        isMigratingProjectConfigurationsOnly={false}
      />
    </IntlProvider>
  );
};

export const NotMigratingAnyPlans = () => {
  return (
    <IntlProvider locale="en">
      <AdvancedRoadmapsTaskCard
        selection={{
          numberOfPlans: 0,
        }}
        onSelect={() => undefined}
        onSkip={() => undefined}
        isLoading={false}
        isSelectLoading={false}
        isSkipLoading={false}
        onUnselectAllPlans={() => undefined}
        isMigratingProjectAttachmentsOnly={false}
        isMigratingProjectConfigurationsOnly={false}
      />
    </IntlProvider>
  );
};

export const MigratingOnePlan: FC<Partial<Props>> = ({
  isMigratingProjectAttachmentsOnly = false,
  isMigratingProjectConfigurationsOnly = false,
  onUnselectAllPlans = () => undefined,
}) => {
  return (
    <IntlProvider locale="en">
      <AdvancedRoadmapsTaskCard
        selection={{
          numberOfPlans: 1,
        }}
        onSelect={() => undefined}
        onSkip={() => undefined}
        isLoading={false}
        isSelectLoading={false}
        isSkipLoading={false}
        onUnselectAllPlans={onUnselectAllPlans}
        isMigratingProjectAttachmentsOnly={isMigratingProjectAttachmentsOnly}
        isMigratingProjectConfigurationsOnly={
          isMigratingProjectConfigurationsOnly
        }
      />
    </IntlProvider>
  );
};

export const MigratingMultiplePlans = () => {
  return (
    <IntlProvider locale="en">
      <AdvancedRoadmapsTaskCard
        selection={{
          numberOfPlans: 5,
        }}
        onSelect={() => undefined}
        onSkip={() => undefined}
        isLoading={false}
        isSelectLoading={false}
        isSkipLoading={false}
      />
    </IntlProvider>
  );
};

export const DisabledForConfigOnly = () => {
  return (
    <IntlProvider locale="en">
      <AdvancedRoadmapsTaskCard
        selection={undefined}
        onSelect={() => undefined}
        onSkip={() => undefined}
        isLoading={false}
        isSelectLoading={false}
        isSkipLoading={false}
        onUnselectAllPlans={() => undefined}
        isMigratingProjectAttachmentsOnly={false}
        isMigratingProjectConfigurationsOnly={true}
      />
    </IntlProvider>
  );
};

export const DisabledForAttachmentsOnly = () => {
  return (
    <IntlProvider locale="en">
      <AdvancedRoadmapsTaskCard
        selection={undefined}
        onSelect={() => undefined}
        onSkip={() => undefined}
        isLoading={false}
        isSelectLoading={false}
        isSkipLoading={false}
        onUnselectAllPlans={() => undefined}
        isMigratingProjectAttachmentsOnly={true}
        isMigratingProjectConfigurationsOnly={false}
      />
    </IntlProvider>
  );
};

export const DisabledWithError = () => {
  return (
    <IntlProvider locale="en">
      <AdvancedRoadmapsTaskCard
        selection={{ numberOfPlans: 12 }}
        onSelect={() => undefined}
        onSkip={() => undefined}
        onUnselectAllPlans={() => undefined}
        isMigratingProjectAttachmentsOnly={true}
        isMigratingProjectConfigurationsOnly={true}
      />
    </IntlProvider>
  );
};
