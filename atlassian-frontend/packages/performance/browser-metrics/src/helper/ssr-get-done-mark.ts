import { GetDoneMark } from '../types';

export const SSRGetDoneMark = {
  getDoneMark: (() => null) as GetDoneMark,
  setGetDoneMark: (fn: GetDoneMark) => {
    SSRGetDoneMark.getDoneMark = fn;
  },
};
