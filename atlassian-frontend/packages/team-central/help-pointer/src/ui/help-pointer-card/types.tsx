import { EmojiDescription } from '@atlaskit/emoji';

import {
  HelpPointer,
  HelpPointerOperations,
  HelpPointerSearchTerms,
  HelpPointerType,
  LinkAnalyticsAttributes,
} from '../../types';

export enum HelpPointerAppearance {
  default,
  borderlessInline,
}

export type HelpPointerCardProps = HelpPointer &
  HelpPointerOperations & {
    /**
     * A `testId` prop is provided for specified elements, which is a unique
     * string that appears as a data attribute `data-testid` in the rendered code,
     * serving as a hook for automated tests */
    testId?: string;
    /**
     * Resolved emoji object after calling emoji service with the relevant emoji Id using HelpPointer.icon
     */
    emojiIcon?: EmojiDescription;

    /**
     * Maximum number of lines shown for the description of each card
     * Defaults to 1
     */
    descriptionLineCount?: number;

    /**
     * The search that was used to return this Help pointer card. This is used to highlight the search
     * text on the help pointer card.
     */
    searchTerms?: HelpPointerSearchTerms;

    /**
     * Controls the appearance of the help pointer
     */
    appearance?: HelpPointerAppearance;

    /**
     * Callback triggered when a user clicks on a tag - returns the tag's value
     */
    tagClickCallback?: (tagValue: string) => void;

    /**
     * Callback triggered when a user clicks on a help link
     */
    linkClickCallback?: (
      linkAnalyticsAttributes: LinkAnalyticsAttributes,
    ) => void;

    /*
     * Controls whether to show the owner on the Help pointer card
     */
    showOwner?: boolean;

    /*
     * Type of help link: request / knowledge article
     */
    type?: HelpPointerType;
  };
