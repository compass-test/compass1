// https://www.30secondsofcode.org/js/s/pick
export const pick = (obj: any, arr: any[]) =>
  arr.reduce(
    (acc: any, curr: any) => (curr in obj && (acc[curr] = obj[curr]), acc),
    {},
  );
