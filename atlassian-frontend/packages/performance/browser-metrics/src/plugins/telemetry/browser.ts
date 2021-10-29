import Bowser from 'bowser';

export const telemetryBrowser = () => {
  if (!Bowser.getParser) {
    return null;
  }
  const browser = Bowser.getParser(window.navigator.userAgent);
  return {
    'telemetry:browser:name': browser.getBrowserName(),
    'telemetry:browser:version': browser.getBrowserVersion(),
  };
};
