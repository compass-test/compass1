import { mapPRMetadataToEntity } from './map-metadata-to-entity';

describe('mapPRMetadataToEntity', () => {
  //mock some input data
  const inputData = {
    branch: 'branchName',
    pullRequestId: 123,
    jiraTicket: 'jiraTicket',
    author: 'AFP Repo Bot',
    link: 'link',
    title: "Merge request 'title text'",
    mergeDate: '2021-01-21 13:11:44',
    mergeCommit: 'mergeCommit',
    jiraUrl: 'jiraUrl',
  };

  //mock expected output data
  const expectedOutput = {
    branch: 'branchName',
    author: 'AFP Repo Bot',
    bitbucketId: 123,
    bitbucketUrl:
      'https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/123',
    commitHash: 'mergeCommit',
    mergeDate: '2021-01-21 13',
    title: "Merge request 'title text'",
  };

  it('should map pull request data to PullRequest entity correctly', () => {
    const output = mapPRMetadataToEntity(inputData);
    expect(output).toEqual(expectedOutput);
  });
});
