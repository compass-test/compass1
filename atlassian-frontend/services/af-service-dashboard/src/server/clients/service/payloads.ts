export type DeploymentUploadPayload = {
  service: {
    name: string;
    packageName: string;
    description: string;
    team: string;
  };
  deployment: {
    env: string;
    commit: string;
    branch: string;
    packageVersion: string;
    pipelineUuid: string;
    isRollback: boolean;
  };
};

export type Status = 'SUCCESSFUL' | 'FAILED';

export type DeploymentUpdatePayload = {
  pipelineUuid: string;
  status: Status;
  artefactUrl?: string;
  slackChannelId?: string;
};
