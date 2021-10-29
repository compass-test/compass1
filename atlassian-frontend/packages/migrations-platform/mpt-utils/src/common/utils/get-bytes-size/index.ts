const UNITS = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

const getBytesSize = (bytes: number) => {
  if (bytes === 0) {
    return '0 KB';
  }
  let exponent = Math.min(Math.floor(Math.log2(bytes) / 10), UNITS.length - 1);

  if (exponent === 0) {
    exponent = 1;
  }
  return `${Math.round(bytes / 1024 ** exponent)} ${UNITS[exponent]}`;
};

export default getBytesSize;
