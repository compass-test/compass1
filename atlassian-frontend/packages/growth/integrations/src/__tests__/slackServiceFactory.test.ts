import { slackServiceFactory } from '../slackServiceFactory';

describe('slackServiceFactory', () => {
  it('creates Jira service for jira product', () => {
    const service = slackServiceFactory('', 'jira', jest.fn());
    expect(service.constructor.name).toBe('JiraSlackService');
  });

  it('creates Confluence service for confluence product', () => {
    const service = slackServiceFactory('', 'confluence', jest.fn());
    expect(service.constructor.name).toBe('ConfluenceSlackService');
  });
});
