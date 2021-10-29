export const safelyToDate = (value: any, fallbackDate: Date): Date => {
  const parsedDate = new Date(value);
  return !isNaN(parsedDate.getTime()) ? parsedDate : fallbackDate;
};
