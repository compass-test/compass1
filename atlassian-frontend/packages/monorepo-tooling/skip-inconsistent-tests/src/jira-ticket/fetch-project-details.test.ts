import fetchProjectDetails from './fetch-project-details';
import {
  mockIssueType,
  mockProjectDetails,
  ProjectKeyIdMap,
} from './test-utils/mock-jira';

describe('fetch jira project details', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch jira project details when provided with auth and projectKey', async () => {
    mockProjectDetails();
    const result = await fetchProjectDetails('product-fabric', 'ED');

    expect(result.projectId).toEqual(ProjectKeyIdMap.get('ED'));
    expect(result.issueId).toEqual('10002');
  });

  it('should use the Task issue type when available', async () => {
    mockProjectDetails({
      issueTypes: [
        mockIssueType(10001, 'Epic'),
        mockIssueType(10002, 'Story'),
        mockIssueType(10003, 'Task'),
        mockIssueType(10004, 'Bug'),
      ],
    });
    const result = await fetchProjectDetails('product-fabric', 'ED');

    expect(result.issueId).toEqual('10003');
  });

  it(`should use the Bug issue type (when available) if Task doesn't exist`, async () => {
    mockProjectDetails({
      issueTypes: [
        mockIssueType(10001, 'Epic'),
        mockIssueType(10002, 'Bug'),
        mockIssueType(10003, 'Story'),
      ],
    });
    const result = await fetchProjectDetails('product-fabric', 'ED');

    expect(result.issueId).toEqual('10002');
  });

  it(`should use the last issue type when Task and Bug don't exist`, async () => {
    mockProjectDetails({
      issueTypes: [mockIssueType(10001, 'Epic'), mockIssueType(10002, 'Story')],
    });
    const result = await fetchProjectDetails('product-fabric', 'ED');

    expect(result.issueId).toEqual('10002');
  });

  it('should throw error when there is no lead available to set as assignee', async () => {
    mockProjectDetails({ lead: undefined });
    try {
      await fetchProjectDetails('product-fabric', 'ED');
    } catch (err) {
      expect(err.message).toBe('Unable to extract lead from project details');
    }
  });
});
