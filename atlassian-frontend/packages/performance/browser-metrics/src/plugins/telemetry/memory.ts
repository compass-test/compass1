export const telemetryMemory = () => {
  // @ts-ignore: deviceMemory is exposed in some browsers
  if (!navigator.deviceMemory) {
    return null;
  }
  return {
    // @ts-ignore
    'telemetry:memory': navigator.deviceMemory,
  };
};
