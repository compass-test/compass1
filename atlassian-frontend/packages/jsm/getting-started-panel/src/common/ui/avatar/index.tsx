import React, { ReactNode } from 'react';
import { ChecklistTabKey, ProductTourKey } from '../../types';

import IconBasics from './assets/Basics';
import IconIncidents from './assets/Incidents';
import IconChanges from './assets/Changes';

import { AvatarRing, ActiveAvatarBorder, InactiveAvatarBorder } from './styled';

const checklistIcons = {
  basics: IconBasics,
  incidents: IconIncidents,
  changes: IconChanges,
};

const tourIcons = {
  [ProductTourKey.Welcome]: IconBasics,
  [ProductTourKey.IncidentManagement]: IconIncidents,
  [ProductTourKey.ChangeManagement]: IconChanges,
};

interface ChecklistProps {
  isActive?: boolean;
  tabKey: ChecklistTabKey;
}

interface TourProps {
  isActive?: boolean;
  tourKey: ProductTourKey;
}

interface WrapperProps {
  isActive?: boolean;
  children: ReactNode;
}

const AvatarWrapper = ({ children, isActive }: WrapperProps) => {
  return isActive ? (
    <ActiveAvatarBorder>
      <AvatarRing>{children}</AvatarRing>
    </ActiveAvatarBorder>
  ) : (
    <InactiveAvatarBorder>
      <AvatarRing>{children}</AvatarRing>
    </InactiveAvatarBorder>
  );
};

export const ChecklistAvatar = ({ tabKey, isActive }: ChecklistProps) => {
  const Icon = checklistIcons[tabKey];
  return (
    <AvatarWrapper isActive={isActive}>
      <Icon />
    </AvatarWrapper>
  );
};

export const TourAvatar = ({ tourKey, isActive }: TourProps) => {
  const Icon = tourIcons[tourKey];
  return (
    <AvatarWrapper isActive={isActive}>
      <Icon />
    </AvatarWrapper>
  );
};

// TODO JIG-466 export const WalkthroughsAvatar = ...
