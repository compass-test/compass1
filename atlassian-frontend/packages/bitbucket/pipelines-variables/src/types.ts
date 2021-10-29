export type Variable = {
  uuid: string;
  key: string;
  value: string;
  secured: boolean;
  isSyncing: boolean;
  error?: {
    data?: {
      arguments?: {
        [key: string]: string;
      };
      key?: string;
    };
    detail?: string;
    message?: string;
  };
};
