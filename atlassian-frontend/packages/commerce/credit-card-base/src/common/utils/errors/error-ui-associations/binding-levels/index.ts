/**
 * These levels represent the different error levels Commerce Atlassian Design Guidelines
 * @see https://hello.atlassian.net/wiki/spaces/~682070436/pages/770319356/Error+messages
 */

/**
 * For generic errors that can't be associated with anything in particular
 */
export const NONE = 'none';
/**
 * For things like field validation errors
 */
export const INPUT = 'input';
/**
 * For errors related to a group of errors.
 * E.g. Errors related to the CC form but not an individual field
 */
export const INPUT_GROUP = 'input-group';
/**
 * For errors related to an action.
 * E.g. An action might be clicking on the submit button to submit your CC details
 */
export const ACTION = 'action';

export type BindingLevel =
  | typeof NONE
  | typeof INPUT
  | typeof ACTION
  | typeof INPUT_GROUP;
