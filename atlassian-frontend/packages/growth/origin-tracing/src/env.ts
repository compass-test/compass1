import { OriginEnv } from './types';

export const getEnvGlobals = () =>
  ({
    atob:
      // atob/btoa need to be bound because they throw an illegal invocation error when called as a method (obj.atob())
      (typeof atob === 'function' && atob.bind(undefined)) ||
      (typeof Buffer !== 'undefined' &&
        ((encoded: string) => Buffer.from(encoded, 'base64').toString())),

    btoa:
      (typeof btoa === 'function' && btoa.bind(undefined)) ||
      (typeof Buffer !== 'undefined' &&
        ((str: string) => Buffer.from(str).toString('base64'))),

    URLSearchParams:
      (typeof URLSearchParams === 'function' && URLSearchParams) ||
      (typeof require === 'function' && require('url').URLSearchParams),
  } as Partial<OriginEnv>);

let env: OriginEnv;

export const getEnv = (): OriginEnv =>
  env || (env = validateEnv(getEnvGlobals()));

const validateEnv = (env: Partial<OriginEnv>) => {
  if (!(env.atob && env.btoa && env.URLSearchParams)) {
    throw new TypeError(
      `Origin-Tracing: missing environment APIs. Required: btoa(), atob(), URLSearchParams() (or in Node: Buffer, require('url').URLSearchParams).`,
    );
  }
  return env as OriginEnv;
};
