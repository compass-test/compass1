import {
  CustomPerformanceEventConfig,
  InteractionPerformanceEventConfig,
  PageLoadPerformanceEventConfig,
  PageSegmentLoadPerformanceEventConfig,
  PerformanceEventConfigParam,
} from '../types';

export type PageLoadPerformanceEventFactoryConfig = Omit<
  PageLoadPerformanceEventConfig,
  'type'
>;

export type PageSegmentLoadPerformanceEventFactoryConfig = Omit<
  PageSegmentLoadPerformanceEventConfig,
  'type'
>;

export type InteractionPerformanceEventFactoryConfig = Omit<
  InteractionPerformanceEventConfig,
  'type'
>;

export type CustomPerformanceEventFactoryConfig = Omit<
  CustomPerformanceEventConfig,
  'type'
>;

export type PerformanceEventFactoryConfig = Omit<
  PerformanceEventConfigParam,
  'type'
>;
