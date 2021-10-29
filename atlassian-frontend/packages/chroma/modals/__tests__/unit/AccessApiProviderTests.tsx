import { ProductKeys } from '../../src/common/constants';
import {
  MockGroup,
  MockGroupResponse,
} from '../../src/common/mocks/AccessApiProviderMocks';
import {
  getGroupsBySiteId,
  getGroupsBySiteIdWrapper,
  grantGroupAccessByProduct,
} from '../../src/services/access-api-provider';

jest.mock('../../src/common/utils/fetch-request', () => {
  return {
    get: jest.fn().mockImplementation(
      (): Promise<any> => {
        return Promise.resolve(MockGroupResponse);
      },
    ),
    post: jest.fn().mockImplementation(
      (): Promise<any> => {
        return Promise.resolve(200);
      },
    ),
  };
});

describe('access api provider test suite', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should get group response from adminhub', async () => {
    const groupResponse = await getGroupsBySiteId('test-id');
    expect(groupResponse.total).toEqual(MockGroupResponse.total);
  });

  it('should post success from adminhub', async () => {
    const accessResponse = await grantGroupAccessByProduct(
      'test-id',
      ProductKeys.JIRA_SOFTWARE,
      ['test-group-id'],
    );
    expect(accessResponse).toEqual({ statusCode: 200 });
  });

  it('should get correct group from adminhub', async () => {
    const groupResponse = await getGroupsBySiteIdWrapper('test-id');
    // @ts-ignore
    expect(groupResponse.name).toEqual(MockGroup.name);
  });
});
