import MockDate from 'mockdate';

/*
 * Mock the current date in unit tests to be Wed Aug 16 00:00:00 2017 +0000,
 * 1502841600 seconds since epoch, or 1502841600000 milliseconds since epoch,
 * the start of the UTC day of the first commit in atlassian-frontend
 */
MockDate.set(1502841600000);
