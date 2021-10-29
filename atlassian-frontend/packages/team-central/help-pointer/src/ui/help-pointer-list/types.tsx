import { EmojiProvider } from '@atlaskit/emoji';

import {
  HelpPointer,
  HelpPointerOperations,
  LinkAnalyticsAttributes,
} from '../../types';

export type HelpPointerListProps = HelpPointerOperations & {
  helpPointers: HelpPointer[];

  /**
   * Required to resolve emoji id into a renderable emoji icon for help pointers
   */
  emojiProvider: Promise<EmojiProvider>;

  /**
   * A `testId` prop is provided for specified elements, which is a unique
   * string that appears as a data attribute `data-testid` in the rendered code,
   * serving as a hook for automated tests */
  testId?: string;

  /**
   * Callback triggered when a user clicks on a help link
   */
  linkClickCallback?: (
    linkAnalyticsAttributes: LinkAnalyticsAttributes,
  ) => void;
};
