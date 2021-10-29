import Page from '../../wrapper/wd-app-wrapper';
import { isUpperCaseCharacter, SPECIAL_KEYS } from './common-osk';
import {
  IOS_KEYBOARD_LAYOUT_TYPE,
  KEYBOARD_LAYOUT_MODIFIER_KEYS,
  getKeyboardLayoutForCharacter,
  getCurrentKeyboardLayoutType,
  switchKeyboardLayout,
} from './osk-layouts-ios';

/**
 * Tap a key on the iOS software keyboard (OSK)
 *
 * You can only tap on keys on the visible keyboard, so ensure that
 * the keyboard is present before attempting to type on it.
 *
 * If the keyboard layout doesn't contain the requested key/character, it
 * will perform automatic layout switching before tapping the key.
 */
export async function sendKeysIOS(
  page: Page,
  keys: string[],
): Promise<IOS_KEYBOARD_LAYOUT_TYPE> {
  if (!(await page.isKeyboardShown())) {
    throw new Error(
      `page.tapKeys: Software keyboard isn't shown. Focus your text input before invoking this method.`,
    );
  }

  let currentLayout = await getCurrentKeyboardLayoutType(page);

  for (const key of keys) {
    if (typeof key !== 'string') {
      // Type safety warns but doesn't prevent us getting into this state when running a test.
      throw new Error(
        `page.tapKeys: received nested non-string value. Did you forget to spread an array of strings? value: ${key}`,
      );
    }

    // Tap the required key
    const keySelector = IOS_KEYMAP[key];
    const isKeyVisible = await page.isExisting(`~${keySelector || key}`);

    if (!isKeyVisible) {
      currentLayout = await getCurrentKeyboardLayoutType(page);
      const requiredLayout = getKeyboardLayoutForCharacter(key, currentLayout);

      // Ensure we're using the correct layout before tapping the required key
      if (currentLayout !== requiredLayout) {
        switch (currentLayout) {
          case 'UNKNOWN':
            throw new Error(
              "We don't support switching to third party or emoji keyboard at this time...",
            );
          case 'LETTERS':
            if (requiredLayout === 'NUMBERS' || requiredLayout === 'SYMBOLS') {
              currentLayout = await switchKeyboardLayout(
                page,
                'NUMBERS_123_PRIMARY',
              );
            }
            if (requiredLayout === 'SYMBOLS') {
              currentLayout = await switchKeyboardLayout(page, 'PUNCTUATION');
            }
            break;
          case 'NUMBERS':
            if (requiredLayout === 'LETTERS') {
              currentLayout = await switchKeyboardLayout(page, 'LETTERS_ABC');
            } else if (requiredLayout === 'SYMBOLS') {
              currentLayout = await switchKeyboardLayout(page, 'PUNCTUATION');
            }
            break;
          case 'SYMBOLS':
            if (requiredLayout === 'LETTERS') {
              currentLayout = await switchKeyboardLayout(page, 'LETTERS_ABC');
            } else if (requiredLayout === 'NUMBERS') {
              currentLayout = await switchKeyboardLayout(
                page,
                'NUMBERS_123_SECONDARY',
              );
            }
        }
      }

      // Check whether we need to switch to uppercase layout.
      if (currentLayout === 'LETTERS') {
        const keyboardHasCorrectCasing = await page.isExisting(
          `~${isUpperCaseCharacter(key) ? 'Q' : 'q'}`,
        );
        if (!keyboardHasCorrectCasing) {
          await switchKeyboardLayout(page, 'TOGGLE_CASING');
        }
      }
    }

    // Using the ~AccessibilityId for faster lookups compared to XPath
    await page.click(`~${keySelector || key}`);

    if (keySelector === IOS_KEYMAP[SPECIAL_KEYS.SPACE] || key === `'`) {
      // After inserting a space the keyboard layout automatically
      // switched back to the letters layout.
      currentLayout = 'LETTERS';
    }
  }

  return currentLayout;
}

// Note: iOS accessibility Ids for keys are inconsistent. Some are lowecase, some are Titlecase.
export const IOS_KEYMAP = {
  '&': 'ampersand',
  [SPECIAL_KEYS.ENTER]: 'Return',
  [SPECIAL_KEYS.DONE]: 'Done',
  [SPECIAL_KEYS.GO]: 'Go',
  ' ': 'space',
  [SPECIAL_KEYS.SPACE]: 'space',
  [KEYBOARD_LAYOUT_MODIFIER_KEYS.LETTERS_ABC]: 'more',
  [KEYBOARD_LAYOUT_MODIFIER_KEYS.NUMBERS_123_PRIMARY]: 'more',
  [SPECIAL_KEYS.MORE]: 'more', // This is for the '123', 'ABC' keys
  [SPECIAL_KEYS.DELETE]: 'delete',
  [SPECIAL_KEYS.EMOJI]: 'Emoji',
  [KEYBOARD_LAYOUT_MODIFIER_KEYS.PUNCTUATION]: 'shift',
  [KEYBOARD_LAYOUT_MODIFIER_KEYS.NUMBERS_123_SECONDARY]: 'shift',
  [SPECIAL_KEYS.SHIFT]: 'shift', // #+= / 123 key
  [SPECIAL_KEYS.DOT_COM]: '.com',
  [SPECIAL_KEYS.CLEAR_TEXT]: 'Clear text', // Little X button within a TextField input (not the keyboard)
  [KEYBOARD_LAYOUT_MODIFIER_KEYS.NEXT_KEYBOARD]: 'Next keyboard',
};
