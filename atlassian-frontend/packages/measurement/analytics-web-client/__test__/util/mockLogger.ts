import { Logger } from '../../src/resiliencedb/types';

const MockLogger: Logger = {
  debug: jest.fn(),
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

export default MockLogger;