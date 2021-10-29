import { EmojiId } from '@atlaskit/emoji';

/* eslint-disable @atlaskit/design-system/ensure-design-token-usage */
const BLUE_BOOK_EMOJI: EmojiId = {
  shortName: ':blue_book:',
  id: '1f4d8',
  fallback: '📘',
};
const GREEN_BOOK_EMOJI: EmojiId = {
  shortName: ':green_book:',
  id: '1f4d7',
  fallback: '📗',
};
const RED_BOOK_EMOJI: EmojiId = {
  shortName: ':closed_book:',
  id: '1f4d5',
  fallback: '📕',
};
const ORANGE_BOOK_EMOJI: EmojiId = {
  shortName: ':orange_book:',
  id: '1f4d9',
  fallback: '📙',
};

export const BOOK_EMOJIS = [
  BLUE_BOOK_EMOJI,
  GREEN_BOOK_EMOJI,
  RED_BOOK_EMOJI,
  ORANGE_BOOK_EMOJI,
];
/* eslint-enable @atlaskit/design-system/ensure-design-token-usage */
export const CLIPBOARD_EMOJI: EmojiId = {
  id: '1f4cb',
  shortName: ':clipboard:',
  fallback: '📋',
};

export const getRandomBookEmoji = () => {
  return BOOK_EMOJIS[Math.floor(Math.random() * BOOK_EMOJIS.length)];
};
