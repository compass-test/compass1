import moment from 'moment';

// http://momentjs.com/docs/#/customization/relative-time/
moment.updateLocale('en', {
  relativeTime: {
    future: '%s',
    past: '%s',
    s: 'just now',
    ss: '%d seconds ago',
    m: 'a minute ago',
    mm: '%d minutes ago',
    h: 'an hour ago',
    hh: '%d hours ago',
    d: 'a day ago',
    dd: '%d days ago',
    M: 'a month ago',
    MM: '%d months ago',
    y: 'a year ago',
    yy: '%d years ago',
  },
});

export function relativeTime(date: any) {
  return moment() < moment(date).add(7, 'days')
    ? moment(date).fromNow()
    : moment(date).format('D MMM YYYY');
}

export function absoluteTime(date: string, isLocal = false): string {
  let time = moment.utc(date);
  if (isLocal) {
    time = time.local();
  }
  return time.format('D MMM YYYY h:mm A');
}
