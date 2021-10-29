export type RatioDataEntry = {
  dateTime: string;
  count: number;
  value: number;
};

export type RatioData = {
  cohortType: string;
  cohortValue: string;
  data: RatioDataEntry[];
};
