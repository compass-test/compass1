import { decodeString } from 'serialize-query-params';

// adapted from DateParam https://github.com/pbeshai/serialize-query-params/blob/master/src/serialize.ts#L53
export const UTCDateParam = {
  encode: (date: Date | null | undefined): string | null | undefined => {
    if (date == null) {
      return undefined;
    }

    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();

    return `${year}-${month < 10 ? `0${month}` : month}-${
      day < 10 ? `0${day}` : day
    }`;
  },
  decode: (
    input: string | (string | null)[] | null | undefined,
  ): Date | null | undefined => {
    const dateString = decodeString(input);
    if (dateString == null) {
      return undefined;
    }

    const parts = dateString.split('-') as any;
    // may only be a year so won't even have a month
    if (parts[1] != null) {
      parts[1] -= 1; // Note: months are 0-based
    } else {
      // just a year, set the month and day to the first
      parts[1] = 0;
      parts[2] = 1;
    }

    const decoded = new Date(Date.UTC(...(parts as [number, number, number])));

    if (isNaN(decoded.getTime())) {
      return null;
    }

    return decoded;
  },
};
