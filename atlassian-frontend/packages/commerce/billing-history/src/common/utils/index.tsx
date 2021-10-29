import { EpochDateTime } from '@atlassian/commerce-types';

const twoDigits = (n: number): string => (n < 10 ? `0${n}` : String(n));

export const formatDate = (d: EpochDateTime) => {
  const date = new Date(d);
  const dd = date.getUTCDate();

  const mm = date.getUTCMonth() + 1;

  const yyyy = date.getUTCFullYear();

  return `${yyyy}-${twoDigits(mm)}-${twoDigits(dd)}`;
};
