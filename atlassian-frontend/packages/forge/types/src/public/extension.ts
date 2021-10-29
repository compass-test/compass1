export interface BackendRuntimeContext {
  principal?: {
    accountId?: string;
  };
  // ari
  installContext?: string;
  license?: {
    isActive: boolean;
  };
}
