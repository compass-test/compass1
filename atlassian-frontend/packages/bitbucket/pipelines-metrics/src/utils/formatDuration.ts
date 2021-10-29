const isInvalidInput = (seconds: number) => {
  return isNaN(seconds) || seconds === Infinity || seconds < 0;
};

const formatDuration = (firstTimestamp: string, currentTimestamp: string) => {
  const seconds =
    (Number(new Date(currentTimestamp)) - Number(new Date(firstTimestamp))) /
    1000;
  if (isInvalidInput(seconds)) {
    return '0s';
  }
  const totalSeconds = parseInt(`${seconds}`, 10);
  const hours = Math.floor(totalSeconds / 3600);

  let remainingSeconds = totalSeconds % 3600;
  const minutes = Math.floor(remainingSeconds / 60);
  remainingSeconds %= 60;

  const prettyHoursWithSeparator = hours > 0 ? hours + 'h' : '';
  const prettyMinutes = minutes ? minutes + 'm' : '';

  return `${prettyHoursWithSeparator} ${prettyMinutes} ${remainingSeconds}s`.trim();
};

export default formatDuration;
