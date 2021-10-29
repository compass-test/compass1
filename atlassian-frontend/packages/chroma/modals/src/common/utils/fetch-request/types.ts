export interface FetchError extends Error {
  statusText?: string;
  status?: number;
}

export interface AtlRequestInit extends RequestInit {
  org?: string;
  cloudId?: string;
}
