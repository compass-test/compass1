export const telemetryNetwork = () => {
  // @ts-ignore: connection is available in some browsers
  // eslint-disable-next-line compat/compat
  if (!navigator.connection) {
    return null;
  }
  return {
    // @ts-ignore: connection is available in some browsers
    // eslint-disable-next-line compat/compat
    'telemetry:network:effectiveType': navigator.connection.effectiveType,
    // @ts-ignore: connection is available in some browsers
    // eslint-disable-next-line compat/compat
    'telemetry:network:rtt': navigator.connection.rtt,
    // @ts-ignore: connection is available in some browsers
    // eslint-disable-next-line compat/compat
    'telemetry:network:downlink': navigator.connection.downlink,
  };
};
