import moment from 'moment-timezone';

export const generateRandomEvents = (
  events: number,
  startIndex: number,
  daysBefore: number = 7,
  daysAfter: number = 7,
  minTime: number = 8,
  maxTime: number = 17,
  maxDuration: number = 3,
) =>
  new Array(events).fill(undefined).map((_, i) => {
    const eventDate = moment()
      .startOf('day')
      .add(
        Math.floor(Math.random() * (daysBefore + daysAfter)) - daysBefore,
        'days',
      )
      .add(minTime, 'hours')
      .add(
        15 * Math.floor(Math.random() * ((maxTime - minTime) * 4)),
        'minutes',
      );

    return {
      id: `event-${startIndex + i}`,
      title: `Event ${startIndex + i + 1}`,
      start: eventDate.toDate(),
      end: eventDate
        .clone()
        .add(15 * Math.floor(Math.random() * (maxDuration * 4) + 1), 'minutes')
        .toDate(),
    };
  });
