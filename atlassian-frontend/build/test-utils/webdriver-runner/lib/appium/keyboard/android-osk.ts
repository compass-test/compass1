import { isUpperCaseCharacter, SPECIAL_KEYS } from './common-osk';

/**
 * Tap a key on the Android software keyboard (OSK)
 *
 * Android has the `pressKeyCode` API available which conveniently
 * means we don't need to switch keyboard layouts manually.
 *
 * In fact, it's able to programmatically tap keys when the keyboard
 * isn't shown yet, and on keys from a non visible keyboard layout.
 *
 * @see http://appium.io/docs/en/commands/device/keys/press-keycode/
 */
export async function sendKeysAndroid(
  browser: WebdriverIO.BrowserObject,
  keys: string[],
) {
  for (const key of keys) {
    if (typeof key !== 'string') {
      // Type safety warns but doesn't prevent us getting into this state when running a test.
      throw new Error(
        `page.tapKeys: received nested non-string value. Did you forget to spread an array of strings? value: ${key}`,
      );
    }

    const keyCode = ANDROID_KEYMAP[key.toUpperCase()];
    if (!keyCode) {
      const [specialSymbolsKey, meta] = SPECIAL_SYMBOLS[key] || [];
      if (specialSymbolsKey) {
        await browser.pressKeyCode(specialSymbolsKey, meta);
      } else {
        throw new Error(
          `page.tapKeys: Unable to insert '${key}' character. No matching value exists in the Android keyCode map.`,
        );
      }
    } else {
      const metaKey = isUpperCaseCharacter(key)
        ? ANDROID_META_KEYS.META_SHIFT_ON
        : undefined;
      await browser.pressKeyCode(keyCode, metaKey);
    }
  }
}

/**
 * @see https://developer.android.com/reference/android/view/KeyEvent
 */
export const ANDROID_KEYMAP = {
  // Alphabet
  A: 29,
  B: 30,
  C: 31,
  D: 32,
  E: 33,
  F: 34,
  G: 35,
  H: 36,
  I: 37,
  J: 38,
  K: 39,
  L: 40,
  M: 41,
  N: 42,
  O: 43,
  P: 44,
  Q: 45,
  R: 46,
  S: 47,
  T: 48,
  U: 49,
  V: 50,
  W: 51,
  X: 52,
  Y: 53,
  Z: 54,
  // Numeric
  '0': 7,
  '1': 8,
  '2': 9,
  '3': 10,
  '4': 11,
  '5': 12,
  '6': 13,
  '7': 14,
  '8': 15,
  '9': 16,
  // Punctuation
  '.': 56, // period / full stop
  ',': 55, // comma
  '`': 68, // backtick / grave
  "'": 76, // apostrophe
  ';': 74, // semi-colon
  '@': 77, // at
  '\\': 73, // backslash (escaped)
  '/': 76, // slash
  '-': 69, // minus
  '=': 70, // equals
  '[': 71, // left bracket
  ']': 72, // right bracket
  '+': 81, // plus / add
  '*': 17, // asterisk
  '#': 18, // hash
  ' ': 62, // space
  [SPECIAL_KEYS.SPACE]: 62, // KEYCODE_SPACE
  [SPECIAL_KEYS.TAB]: 61, // KEYCODE_TAB
  [SPECIAL_KEYS.ENTER]: 66, // KEYCODE_ENTER
  [SPECIAL_KEYS.DELETE]: 67, // KEYCODE_DEL
  [SPECIAL_KEYS.SHIFT]: 59, // KEYCODE_SHIFT_LEFT
  [SPECIAL_KEYS.CLEAR_TEXT]: 28, // KEYCODE_CLEAR

  // Change input method / keyboard
  [SPECIAL_KEYS.NEXT_KEYBOARD]: 63, // KEYCODE_SYM
  /*
    Key Code 94 doesn't change input method on gboard for some reason.
    Replaced it with Key Code 57 which works on gboard.
    Though neither of the key codes work with swift keyboard.
  */
  // [SPECIAL_KEYS.EMOJI]: 94, // KEYCODE_PICTSYMBOLS
  [SPECIAL_KEYS.EMOJI]: 57,
};

const ANDROID_META_KEYS = {
  META_SHIFT_ON: 1,
  META_CAPS_LOCK_ON: 1048576,
  META_SYM_ON: 4,
};

// Some special symbols require combination of keycodes to work.
const SPECIAL_SYMBOLS: { [x: string]: number[] } = {
  ':': [ANDROID_KEYMAP[';'], ANDROID_META_KEYS.META_SHIFT_ON],
  ')': [ANDROID_KEYMAP['0'], ANDROID_META_KEYS.META_SHIFT_ON],
  '(': [ANDROID_KEYMAP['9'], ANDROID_META_KEYS.META_SHIFT_ON],
  '>': [ANDROID_KEYMAP['.'], ANDROID_META_KEYS.META_SHIFT_ON],
};
