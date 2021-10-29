import { createJiraIssueResponse } from '../../../__tests__/__fixtures__/mock-jira-results';
import { doesJiraIssueMatchQuery } from '../jira-search-dialog-functions';

describe('Jira Search Dialog Functions', () => {
  // White box tests as they use intrinsic knowledge of how generated jira issues are formatted
  describe('doesJiraIssueMatchQuery', () => {
    it('should be true if query matches on exact issue name', () => {
      const dummyIssue = createJiraIssueResponse(1).items[0];
      dummyIssue.name = 'rishul';
      const dummyQuery = 'rishul';
      expect(doesJiraIssueMatchQuery(dummyIssue, dummyQuery)).toBe(true);
    });

    it('should be true if query matches on partial issue name', () => {
      const dummyIssue = createJiraIssueResponse(1).items[0];
      dummyIssue.name = 'rishul';
      const dummyQuery = 'rish';
      expect(doesJiraIssueMatchQuery(dummyIssue, dummyQuery)).toBe(true);
    });

    it('should be true if query matches on case agnostic issue name', () => {
      const dummyIssue = createJiraIssueResponse(1).items[0];
      dummyIssue.name = 'rishul';
      const dummyQuery = 'RISH';
      expect(doesJiraIssueMatchQuery(dummyIssue, dummyQuery)).toBe(true);
    });

    it('should be true if query matches on exact issue key', () => {
      const dummyIssue = createJiraIssueResponse(1).items[0];
      dummyIssue.attributes.key = 'MATT-1991';
      const dummyQuery = 'MATT-1991';
      expect(doesJiraIssueMatchQuery(dummyIssue, dummyQuery)).toBe(true);
    });

    it('should be true if query matches on partial issue key', () => {
      const dummyIssue = createJiraIssueResponse(1).items[0];
      dummyIssue.attributes.key = 'MATT-1991';
      const dummyQuery = 'ATT-19';
      expect(doesJiraIssueMatchQuery(dummyIssue, dummyQuery)).toBe(true);
    });

    it('should be true if query matches on case agnostic issue key', () => {
      const dummyIssue = createJiraIssueResponse(1).items[0];
      dummyIssue.attributes.key = 'MATT-1991';
      const dummyQuery = 'matt-1991';
      expect(doesJiraIssueMatchQuery(dummyIssue, dummyQuery)).toBe(true);
    });

    it('should be true if query features only the number part of the issue key', () => {
      const dummyIssue = createJiraIssueResponse(1).items[0];
      dummyIssue.attributes.key = 'MATT-1991';
      const dummyQuery = '1991';
      expect(doesJiraIssueMatchQuery(dummyIssue, dummyQuery)).toBe(true);
    });

    it('shoud be false if there is no match on either the issue name or key', () => {
      let dummyIssue = createJiraIssueResponse(1).items[0];
      dummyIssue.name = 'palpatine';
      dummyIssue.attributes.key = 'vader';
      const dummyQuery = 'yoda';
      expect(doesJiraIssueMatchQuery(dummyIssue, dummyQuery)).toBe(false);
    });

    it('shoud be true if there are trailing or intial spaces in the query but the text matches', () => {
      let dummyIssue = createJiraIssueResponse(1).items[0];
      dummyIssue.name = 'yoda';
      const dummyQuery = ' yoda ';
      expect(doesJiraIssueMatchQuery(dummyIssue, dummyQuery)).toBe(true);
    });
  });
});
