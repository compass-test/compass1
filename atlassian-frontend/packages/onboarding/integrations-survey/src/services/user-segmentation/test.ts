import { getAtlassianAccount, getUserSegmentationData } from './index';

jest.mock('./index', () => ({
  ...jest.requireActual<Object>('./index'),
  getAtlassianAccount: jest.fn(),
}));

let mockGetAtlassianAccount = getAtlassianAccount as jest.Mock;
mockGetAtlassianAccount.mockImplementation(() => {
  throw new Error();
});

describe('getUserSegmentationData', () => {
  it('should call onUserSegError if there was an error with getAtlassianAccount', async () => {
    const mockOnUserSegError = jest.fn();

    await getUserSegmentationData(mockOnUserSegError);
    expect(mockOnUserSegError).toHaveBeenCalledTimes(1);
  });
});
