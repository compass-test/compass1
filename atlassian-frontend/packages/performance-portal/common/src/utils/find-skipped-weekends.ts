export const isUTCMonday = (isoDateTime: string) =>
  new Date(isoDateTime).getUTCDay() === 1;

export const isUTCFriday = (isoDateTime: string) =>
  new Date(isoDateTime).getUTCDay() === 5;

/**
 * @return [friday: string, monday: string][]
 */
export const findSkippedWeekends = (isoDateTimeArray?: string[]) => {
  if (!isoDateTimeArray || !Array.isArray(isoDateTimeArray)) {
    return [];
  }
  return isoDateTimeArray.reduce<[string, string][]>(
    (weekends, maybeFriday, idx, allData) => {
      const nextIdx = idx + 1;
      const maybeMonday =
        nextIdx < allData.length ? allData[nextIdx] : undefined;

      if (isUTCFriday(maybeFriday) && maybeMonday && isUTCMonday(maybeMonday)) {
        weekends.push([maybeFriday, maybeMonday]);
      }

      return weekends;
    },
    [],
  );
};
