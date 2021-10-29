const UNITS = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
export const getBytesSize = (bytes: number) => {
  if (bytes === 0) {
    return '0 KB';
  }
  let exponent = Math.min(Math.floor(Math.log2(bytes) / 10), UNITS.length - 1);
  if (exponent === 0) {
    exponent = 1;
  }
  const value = Math.round(bytes / Math.pow(1024, exponent));
  return `${value} ${UNITS[exponent]}`;
};
