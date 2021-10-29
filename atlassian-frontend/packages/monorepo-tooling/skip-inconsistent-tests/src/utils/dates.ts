/**
 * Get todays date in the form of DD/MM/YYYY or MM/DD/YYYY
 * depending on the locale used.
 *
 * 'en-GB' uses DD/MM and 'en-US' uses MM/DD.
 */
export function getDateString(locale = 'en-GB', date = new Date()) {
  return date.toLocaleString(locale).split(',').shift();
}
