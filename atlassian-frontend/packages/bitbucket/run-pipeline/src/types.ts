export type FetchBranches = ({
  pagelen,
  name,
}: {
  pagelen: number;
  name: string;
}) => Promise<{ size: number; values: any[] }>;

export type FetchPipelineDefinitions = (
  target: string,
  {
    pagelen,
    page,
  }: {
    pagelen: number;
    page: number;
  },
) => Promise<{ size: number; values: any[] }>;

export type BranchesResponse = {
  values: Array<{
    name: string;
    target: { hash: string };
  }>;
};

export type FetchCreatePipeline = (
  data: any,
) => Promise<{ uuid: string; build_number: number }>;

export type PipelineDefinition = {
  type?: string;
  pattern?: string;
  variables?: { name: string; default?: string }[];
  error?: any;
};

export type BranchOption = {
  label: string;
  value: string;
  branch: {
    name: string;
    revision: string;
  };
};

export type PipelineDefinitionOption = {
  label: string;
  value: string;
  pipelineDefinition: PipelineDefinition;
};

export enum ScheduleEnum {
  Hourly = 'hourly',
  Weekly = 'weekly',
  Daily = 'daily',
}
export enum WeekdayEnum {
  Monday = 'MON',
  Tuesday = 'TUE',
  Wednesday = 'WED',
  Thursday = 'THU',
  Friday = 'FRI',
  Saturday = 'SAT',
  Sunday = 'SUN',
}
export enum HourlyEnum {
  '00:00 - 01:00',
  '01:00 - 02:00',
  '02:00 - 03:00',
  '03:00 - 04:00',
  '04:00 - 05:00',
  '05:00 - 06:00',
  '06:00 - 07:00',
  '07:00 - 08:00',
  '08:00 - 09:00',
  '09:00 - 10:00',
  '10:00 - 11:00',
  '11:00 - 12:00',
  '12:00 - 13:00',
  '13:00 - 14:00',
  '14:00 - 15:00',
  '15:00 - 16:00',
  '16:00 - 17:00',
  '17:00 - 18:00',
  '18:00 - 19:00',
  '19:00 - 20:00',
  '20:00 - 21:00',
  '21:00 - 22:00',
  '22:00 - 23:00',
  '23:00 - 00:00',
}
