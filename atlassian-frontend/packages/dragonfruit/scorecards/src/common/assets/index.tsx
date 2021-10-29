import React from 'react';

import HighestHealthy from './HighestHealthy.svg';
import HighHealthy from './HighHealthy.svg';
import LowestHealthy from './LowestHealthy.svg';
import LowHealthy from './LowHealthy.svg';
import MediumHealthy from './MediumHealthy.svg';

export const LowestHealthyIcon = () => (
  <img
    src={LowestHealthy}
    alt="lowest health"
    data-testid="lowest-health-icon"
  />
);
export const LowHealthyIcon = () => (
  <img src={LowHealthy} alt="low health" data-testid="low-health-icon" />
);
export const MediumHealthyIcon = () => (
  <img
    src={MediumHealthy}
    alt="medium health"
    data-testid="medium-health-icon"
  />
);
export const HighHealthyIcon = () => (
  <img src={HighHealthy} alt="high health" data-testid="high-health-icon" />
);
export const HighestHealthyIcon = () => (
  <img
    src={HighestHealthy}
    alt="highest health"
    data-testid="highest-health-icon"
  />
);
