// started_on and duration_in_seconds are added to the object only for the logic below they are not sent to the service.
export type IStepsDataType = {
  step_uuid?: string;
  step_command?: string;
  step_name: string;
  step_status: string;
  step_duration: number;
  started_on?: string;
  duration_in_seconds?: number;
};

export type IBuildEventProperties = {
  build_number: string;
  build_status: string;
  build_time: number;
  build_number_steps: number;
  build_type: string;
  build_name: string;
  build_steps: Array<IStepsDataType>;
};

export type IPipelines = {
  default: Array<any>;
  custom: any;
  branches: { master: any };
  'pull-requests': {
    '**': any;
  };
};
