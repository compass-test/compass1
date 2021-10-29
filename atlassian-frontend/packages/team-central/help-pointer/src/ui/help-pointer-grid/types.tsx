import { EmojiProvider } from '@atlaskit/emoji';

import {
  HelpPointer,
  HelpPointerOperations,
  HelpPointerSearchTerms,
  LinkAnalyticsAttributes,
} from '../../types';

export type HelpPointerGridProps = HelpPointerOperations & {
  helpPointers: HelpPointer[];

  /**
   * Information about the search that was used to return this list of help pointers.
   * This is used to highlight the search terms on the help pointer card.
   */
  searchTerms?: HelpPointerSearchTerms;

  /**
   * Callback triggered when a user clicks on a tag - returns the tag's value
   * Note that this also triggers the owner "tag" callback
   */
  tagClickCallback?: (tagValue: string) => void;

  /**
   * Callback triggered when a user clicks on a help link
   */
  linkClickCallback?: (
    linkAnalyticsAttributes: LinkAnalyticsAttributes,
  ) => void;

  /**
   * Whether to show the owner sub-line on help pointer cards
   */
  showOwner?: boolean;

  /**
   * Set the maximum number of columns of help pointer cards to display, when the screen size allows it
   * Default to 1, aka a vertical list.
   */
  maxColumnCount?: number;

  /**
   * Maximum number of lines shown for the description of each card
   */
  descriptionLineCount?: number;

  /**
   * Required to resolve emoji id into a renderable emoji icon for help pointers
   */
  emojiProvider: Promise<EmojiProvider>;

  /**
   * A `testId` prop is provided for specified elements, which is a unique
   * string that appears as a data attribute `data-testid` in the rendered code,
   * serving as a hook for automated tests */
  testId?: string;
};
