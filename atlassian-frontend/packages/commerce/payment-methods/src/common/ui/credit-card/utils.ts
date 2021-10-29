const DOT = '\u2022';
const DEFAULT_MASK = `${DOT}${DOT}${DOT}${DOT} `.repeat(3);
const AMEX_MASK = [DOT.repeat(4), DOT.repeat(6), DOT].join(' ');

const CC_TYPE_AMEX = 'AMEX';

export const formatCCNumber = (ccNumber: string, type: string) => {
  if (!ccNumber) {
    return '';
  }

  const value = `${ccNumber}`.padStart(4, DOT);

  if (type === CC_TYPE_AMEX) {
    return `${AMEX_MASK}${value}`;
  }

  return `${DEFAULT_MASK}${value}`;
};
