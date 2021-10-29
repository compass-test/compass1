/** Extracted into its own file so the mock variables can be instantiated before other imports in the test file that would otherwise be hoisted before it */
jest.mock('@atlassian/analytics-bridge', () => ({
  fireUIAnalytics: jest.fn(),
}));

export const mockOnTaskComplete = jest.fn();

jest.mock('../../../common/ui/url-data', () => ({
  useUrlData: () => ({
    onTaskComplete: mockOnTaskComplete,
  }),
}));
