// eslint-disable-next-line import/no-extraneous-dependencies
import { FetchMock } from 'jest-fetch-mock';

// Global types within the package
// NodeJS context type does not has fetch so we need to patch it

declare namespace NodeJS {
  interface Global {
    fetch: FetchMock;
  }
}
