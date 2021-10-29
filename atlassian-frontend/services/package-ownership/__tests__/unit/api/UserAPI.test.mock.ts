/** Extracted into its own file so the mock variables can be instantiated before other imports in the test file that would otherwise be hoisted before it */
export const mockAxiosInstance = {
  get: jest.fn(),
};
jest.mock('axios', () => ({
  create: jest.fn(() => mockAxiosInstance),
}));
jest.mock('../../../src/lib/Logger', () => ({
  Logger: {
    error: jest.fn(),
  },
}));
