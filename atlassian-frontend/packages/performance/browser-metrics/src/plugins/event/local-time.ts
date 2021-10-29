import format from 'date-fns/format';

export const eventLocalTime = () => ({
  'event:localHour': parseInt(format(new Date(), 'H'), 10),
  'event:localDayOfWeek': parseInt(format(new Date(), 'i'), 10),
});
