// Check whether a character is uppercase, for the purpose of knowing whether to toggle
// the SHIFT / CAPS mode on the software keyboard.
export function isUpperCaseCharacter(char: string) {
  // Assume if we pass through more than one character that it's a SPECIAL_KEYS value.
  // The single character values within SPECIAL_KEYS are non alpha so will return false.
  return char.length === 1 ? /[A-Z]/.test(char) : false;
}

export const SPECIAL_KEYS = {
  DONE: 'DONE',
  SPACE: 'SPACE',
  ENTER: 'ENTER',
  GO: 'GO',
  MORE: 'MORE',
  DELETE: 'DELETE',
  SHIFT: 'SHIFT',
  DOT_COM: 'DOT_COM',
  CLEAR_TEXT: 'CLEAR_TEXT',
  TAB: 'TAB',
  EMOJI: 'EMOJI',
  NEXT_KEYBOARD: 'NEXT_KEYBOARD',
};
