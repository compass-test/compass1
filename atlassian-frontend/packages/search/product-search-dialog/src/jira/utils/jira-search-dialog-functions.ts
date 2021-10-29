import { Result, Scope } from '../clients';
// Used in conjunction with 'faster search' containing predicate logic
// as to whether or not cached items should be included in the faster search list
// depending on the query.
export const doesJiraIssueMatchQuery = (
  item: Result<Scope.JiraIssue>,
  query: string,
) => {
  const lowerQuery = query.toLowerCase().trim();
  return (
    item.name.toLowerCase().includes(lowerQuery) ||
    item.attributes.key.toLowerCase().includes(lowerQuery)
  );
};
