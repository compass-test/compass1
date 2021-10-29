import Bowser from 'bowser';
import memoizeOne from 'memoize-one';

export const eventBrowserPlugin = memoizeOne(() => {
  if (!Bowser.getParser) {
    return null;
  }
  const browser = Bowser.getParser(window.navigator.userAgent);
  return {
    'event:browser:name': browser.getBrowserName(),
    'event:browser:version': browser.getBrowserVersion(),
  };
});
