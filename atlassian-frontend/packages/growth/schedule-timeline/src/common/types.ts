// eslint-disable-next-line import/no-extraneous-dependencies
import { Moment } from 'moment';

export type IntervalUnit = 'days' | 'weeks' | 'months';
export type PeriodType = 'historical' | 'default' | 'override';
export type DateTime = Date | string | number | Moment;

export interface DaysProps {
  startDate: DateTime;
  timezone: string;
  days: number;
  dateFormat?: string;
  locale?: string;
}

export interface Period {
  startDate: DateTime;
  endDate: DateTime;
  type: PeriodType;
  backgroundColor?: string;
  textColor?: string;
  label: string;
}

export interface PeriodProps extends Period {
  rotation: RotationMeta;
}

export interface RotationMeta {
  startDate: DateTime;
  timezone: string;
  days: number;
}

export interface Rotation {
  name: string;
  periods: Period[];
}

export interface RotationProps extends Rotation, RotationMeta {}

export interface TimelineProps {
  startDate: DateTime;
  timezone: string;
  interval?: number;
  intervalUnit?: IntervalUnit;
  currentDate: DateTime;
  rotations: Rotation[];
  dateFormat: string;
  locale?: string;
}

export interface SchedulesProps {
  startDate: DateTime;
  currentDate: DateTime;
  timezone: string;
  days: number;
  rotations: Rotation[];
}
