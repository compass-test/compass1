export {};
/* References a file that doesn't exist to test for false negatives. */
// eslint-disable-next-line import/no-unresolved
const test = require('./test.json');

/* References a file that does exist to test for false positives. */
const empty = require('./empty.json');

console.log(test);
console.log(empty);
