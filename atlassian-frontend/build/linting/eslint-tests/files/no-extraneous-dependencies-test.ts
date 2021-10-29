/* Internal import not in the package.json to test for false negatives. */
// eslint-disable-next-line import/no-extraneous-dependencies
import Button from '@atlaskit/button';

/* Internal import in the package.json to test for false positives. */
import Tooltip from '@atlaskit/tooltip';

/* External import not in the package.json to test for false negatives. */
// eslint-disable-next-line import/no-extraneous-dependencies
const noop = require('noop2');

/* External import in the package.json to test for false positives. */
import format from 'date-fns/format';

noop();
console.log(Button);
console.log(Tooltip);
console.log(format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"));
