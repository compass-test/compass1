import { createHash } from 'rusha';
import { Trigger } from './events';

export const sha1Hash = (str: string): string =>
  createHash().update(str).digest('hex');

export const getTrigger = (
  e: React.MouseEvent<any, MouseEvent> | MouseEvent,
): Trigger => {
  return e.screenX === 0 ? Trigger.RETURN : Trigger.CLICK;
};

export const isNewTab = (e: React.MouseEvent<any, MouseEvent> | MouseEvent) => {
  return !!(e && (e.metaKey || e.ctrlKey || e.shiftKey));
};

export const getWordCount = (str: string) => {
  return str.length > 0 ? str.split(/\s+/).length : 0;
};
