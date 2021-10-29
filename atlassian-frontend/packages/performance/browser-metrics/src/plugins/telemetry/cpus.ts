export const telemetryCpu = () => {
  if (!navigator.hardwareConcurrency) {
    return null;
  }
  return {
    'telemetry:cpus': navigator.hardwareConcurrency,
  };
};
