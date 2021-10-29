export enum ReportsResolution {
  daily = 'daily',
  weekly = 'weekly',
  eom = 'eom',
}

export const DailyResolution = {
  label: 'daily',
  value: ReportsResolution.daily,
};

export const WeeklyResolution = {
  label: 'weekly',
  value: ReportsResolution.weekly,
};

export const MonthlyResolution = {
  label: 'weekly (EOM)',
  value: ReportsResolution.eom,
};
