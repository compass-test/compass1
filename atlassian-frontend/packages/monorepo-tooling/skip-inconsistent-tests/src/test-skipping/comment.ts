import { getDateString } from '../utils/dates';

/**
 * Generate the comment that should be inserted above a skipped test case
 */
export function getSkipLineComment(jiraTicketUrl?: string) {
  const today = getDateString();
  const message = `FIXME: This test was automatically skipped due to failure on ${today}`;
  if (jiraTicketUrl) {
    return `${message}: ${jiraTicketUrl}`;
  }
  return message;
}
