export const eventNetworkPlugin = () => {
  // @ts-ignore: connection is available in some browsers
  // eslint-disable-next-line compat/compat
  if (!navigator.connection) {
    return null;
  }
  return {
    // @ts-ignore: connection is available in some browsers
    // eslint-disable-next-line compat/compat
    'event:network:effectiveType': navigator.connection.effectiveType,
    // @ts-ignore: connection is available in some browsers
    // eslint-disable-next-line compat/compat
    'event:network:rtt': navigator.connection.rtt,
    // @ts-ignore: connection is available in some browsers
    // eslint-disable-next-line compat/compat
    'event:network:downlink': navigator.connection.downlink,
  };
};
