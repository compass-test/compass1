import { createTransformer } from '@atlaskit/codemod-utils';

import convertTriggerType from './migrates/convert-trigger-type';
import deprecateItems from './migrates/deprecate-items';
import deprecateOnItemActivated from './migrates/deprecate-onItemActivated';
import deprecateOnPositioned from './migrates/deprecate-onPositioned';
import deprecateShouldFitContainer from './migrates/deprecate-shouldFitContainer';
import updatePositionValue from './migrates/replace-position-to-placement';
import replaceShouldAllowMultiline from './migrates/replace-shouldAllowMultiline';

const transformer = createTransformer([
  deprecateItems,
  deprecateOnItemActivated,
  deprecateOnPositioned,
  deprecateShouldFitContainer,

  replaceShouldAllowMultiline,
  updatePositionValue,

  convertTriggerType,
]);

export default transformer;
