export interface BackendSettingUrls {
  api: string;
  jira: string;
  templatesService: string;
}

export interface BackendSettings<ContextType> {
  analytics: {
    userId: string;
    hostId: string;
  };
  token?: string;
  flags: {
    [key: string]: number | string | boolean;
  };
  urls: BackendSettingUrls;
  context: ContextType;
}
