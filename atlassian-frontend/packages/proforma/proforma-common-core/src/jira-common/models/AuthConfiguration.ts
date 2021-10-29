import { AuthenticationType } from './AuthenticationType';

export type AuthConfiguration =
  | BasicAuthConfiguration
  | DigestAuthConfiguration
  | CustomAuthConfiguration;

export interface BaseAuthConfiguration {
  type: AuthenticationType;
}

export interface BasicAuthConfiguration extends BaseAuthConfiguration {
  type: AuthenticationType.Basic;
  username: string;
  password: string;
}

export interface DigestAuthConfiguration extends BaseAuthConfiguration {
  type: AuthenticationType.Digest;
  username: string;
  password: string;
}

export interface CustomAuthConfiguration extends BaseAuthConfiguration {
  type: AuthenticationType.Custom;
  token: string;
}
