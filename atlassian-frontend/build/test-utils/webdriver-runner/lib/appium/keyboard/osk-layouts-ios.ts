import Page from '../../wrapper/wd-app-wrapper';
import { SPECIAL_KEYS } from './common-osk';
import { IOS_KEYMAP } from './ios-osk';

/**
 * Keyboard Layouts for iPhones.
 *
 * Note: iPads have additional keys (since they have extra screen real estate)
 * which these layouts aren't taking into account (yet).
 */

// Keys that trigger a keyboard layout change
export const KEYBOARD_LAYOUT_MODIFIER_KEYS = {
  LETTERS_ABC: 'ABC',
  NUMBERS_123_PRIMARY: '123 P',
  NUMBERS_123_SECONDARY: '123 S',
  PUNCTUATION: '#+=',
  NEXT_KEYBOARD: 'NEXT KEYBOARD / LAYOUT',
  TOGGLE_CASING: 'SHIFT',
};

// These exist on all keyboard layouts based on alhanumeric (not numpad).
const COMMON_KEYS_ALPHA_NUMERIC = [
  SPECIAL_KEYS.DELETE,
  SPECIAL_KEYS.ENTER,
  SPECIAL_KEYS.SPACE,
  ' ',
  KEYBOARD_LAYOUT_MODIFIER_KEYS.NEXT_KEYBOARD,
];

// Array containing uppercase A-Z
const QWERTY = [...Array(26)].map((_, y) => String.fromCharCode(y + 65));

// Array containing 0-9
const NUMBERS = [...Array.from(Array(10).keys()).map(k => String(k))];

const layoutABC = QWERTY.concat([
  ...COMMON_KEYS_ALPHA_NUMERIC,
  SPECIAL_KEYS.SHIFT,
  KEYBOARD_LAYOUT_MODIFIER_KEYS.NUMBERS_123_PRIMARY,
  SPECIAL_KEYS.EMOJI,
]);

const layout123 = `-/:;()$&@".,?!'`
  .split('')
  .concat([
    ...COMMON_KEYS_ALPHA_NUMERIC,
    ...NUMBERS,
    KEYBOARD_LAYOUT_MODIFIER_KEYS.PUNCTUATION,
    KEYBOARD_LAYOUT_MODIFIER_KEYS.LETTERS_ABC,
    SPECIAL_KEYS.EMOJI,
  ]);

const layoutSymbols = `[]{}#%^*+=_\|~<>€£¥•.,?!'`
  .split('')
  .concat([
    ...COMMON_KEYS_ALPHA_NUMERIC,
    KEYBOARD_LAYOUT_MODIFIER_KEYS.NUMBERS_123_SECONDARY,
    KEYBOARD_LAYOUT_MODIFIER_KEYS.LETTERS_ABC,
    SPECIAL_KEYS.EMOJI,
  ]);

export const IOS_KEYBOARD_LAYOUT = {
  LETTERS: layoutABC,
  NUMBERS: layout123,
  SYMBOLS: layoutSymbols,
};

export type IOS_KEYBOARD_MODIFIER = keyof typeof KEYBOARD_LAYOUT_MODIFIER_KEYS;

export type IOS_KEYBOARD_LAYOUT_TYPE =
  | keyof typeof IOS_KEYBOARD_LAYOUT
  | 'UNKNOWN';

export function getKeyboardLayoutForCharacter(
  character: string,
  currentLayout: IOS_KEYBOARD_LAYOUT_TYPE,
): IOS_KEYBOARD_LAYOUT_TYPE {
  if (COMMON_KEYS_ALPHA_NUMERIC.includes(character)) {
    // Common keys exist on all layouts, so there's no need to switch.
    return currentLayout;
  }
  if (character.length === 1) {
    // Uppercase single characters to support both upper and lowercase alpha.
    // It's a no-op for numbers and symbols, and we exclude multiple character special keys.
    character = character.toUpperCase();
  }
  if (layoutABC.includes(character)) {
    return 'LETTERS';
  }
  if (layout123.includes(character)) {
    return 'NUMBERS';
  }
  if (layoutSymbols.includes(character)) {
    return 'SYMBOLS';
  }
  return 'UNKNOWN';
}

type NextLayoutElement = {
  element: string;
  layout: IOS_KEYBOARD_LAYOUT_TYPE;
};
const getKeyboardLayout = (
  layoutModifierKey: IOS_KEYBOARD_MODIFIER,
): NextLayoutElement | null => {
  switch (layoutModifierKey) {
    case 'LETTERS_ABC':
      return {
        element: `~${IOS_KEYMAP[KEYBOARD_LAYOUT_MODIFIER_KEYS.LETTERS_ABC]}`,
        layout: 'LETTERS',
      };
    case 'NUMBERS_123_PRIMARY':
      return {
        element: `~${
          IOS_KEYMAP[KEYBOARD_LAYOUT_MODIFIER_KEYS.NUMBERS_123_PRIMARY]
        }`,
        layout: 'NUMBERS',
      };
    case 'NUMBERS_123_SECONDARY':
      return {
        element: `~${
          IOS_KEYMAP[KEYBOARD_LAYOUT_MODIFIER_KEYS.NUMBERS_123_SECONDARY]
        }`,
        layout: 'NUMBERS',
      };
    case 'PUNCTUATION':
      return {
        element: `~${IOS_KEYMAP[KEYBOARD_LAYOUT_MODIFIER_KEYS.PUNCTUATION]}`,
        layout: 'SYMBOLS',
      };
    case 'TOGGLE_CASING':
      return {
        element: `~${IOS_KEYMAP[SPECIAL_KEYS.SHIFT]}`,
        layout: 'LETTERS',
      };
    default:
      return null;
  }
};

export async function switchKeyboardLayout(
  page: Page,
  layoutModifierKey: IOS_KEYBOARD_MODIFIER,
): Promise<IOS_KEYBOARD_LAYOUT_TYPE> {
  const nextLayout = getKeyboardLayout(layoutModifierKey);

  if (nextLayout === null) {
    return 'UNKNOWN';
  }

  const isKeyVisible = await page.isExisting(nextLayout.element);
  if (isKeyVisible) {
    await page.click(nextLayout.element);
  }

  return nextLayout.layout;
}

export async function getCurrentKeyboardLayoutType(
  page: Page,
): Promise<IOS_KEYBOARD_LAYOUT_TYPE> {
  const isNumberPrimaryKeyVisible = await page.isExisting(
    `~${IOS_KEYMAP[KEYBOARD_LAYOUT_MODIFIER_KEYS.NUMBERS_123_PRIMARY]}`,
  );

  if (isNumberPrimaryKeyVisible) {
    return 'LETTERS';
  }

  const isABCKeyVisible = await page.isExisting(
    `~${IOS_KEYMAP[KEYBOARD_LAYOUT_MODIFIER_KEYS.LETTERS_ABC]}`,
  );

  const isNumbersSecondaryKeyVisible = await page.isExisting(
    `~${IOS_KEYMAP[KEYBOARD_LAYOUT_MODIFIER_KEYS.NUMBERS_123_SECONDARY]}`,
  );

  if (isABCKeyVisible && isNumbersSecondaryKeyVisible) {
    return 'SYMBOLS';
  }

  const isSymbolsKeyVisible = await page.isExisting(
    `~${IOS_KEYMAP[KEYBOARD_LAYOUT_MODIFIER_KEYS.PUNCTUATION]}`,
  );

  if (isABCKeyVisible && isSymbolsKeyVisible) {
    return 'NUMBERS';
  }

  return 'UNKNOWN';
}
