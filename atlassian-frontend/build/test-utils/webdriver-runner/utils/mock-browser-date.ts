// Should be identical to function in build/test-utils/visual-regression/helper/mocks/mock-browser-date.ts
export function mockBrowserDate(
  year: number,
  monthIndex: number,
  day: number,
  hour: number,
  minute: number,
  tz: number,
) {
  const _Date = ((window as any)._Date = window.Date);

  const localDateOffset =
    new _Date(year, monthIndex, day, hour, minute).getTimezoneOffset() / 60;

  const offset = (tz + localDateOffset) * 3600000;

  const mockedDate = new _Date(
    _Date.UTC(year, monthIndex, day, hour, minute) + offset,
  );

  function MockDate(
    y?: number,
    m?: number,
    d?: number,
    h?: number,
    M?: number,
    s?: number,
    ms?: number,
  ) {
    let date;
    switch (arguments.length) {
      case 0:
        date = new _Date(mockedDate.valueOf());
        break;
      case 1:
        // Typescript can't infer that because we have more than 0 args y is defined
        y = y as number;
        date = new _Date(y);
        break;
      default:
        // Typescript can't infer that because we have more than 1 args y and m are defined
        y = y as number;
        m = m as number;
        d = typeof d === 'undefined' ? 1 : d;
        h = h || 0;
        M = M || 0;
        s = s || 0;
        ms = ms || 0;
        date = new _Date(y, m, d, h, M, s, ms);
        break;
    }
    return date;
  }
  MockDate.prototype = _Date.prototype;
  MockDate.UTC = _Date.UTC;

  MockDate.now = () => mockedDate.getTime();
  MockDate.UTC = _Date.UTC;

  Date.parse = function (dateString) {
    return _Date.parse(dateString);
  };
  Date.toString = function () {
    return _Date.toString();
  };
  MockDate.now = function () {
    // @ts-ignore
    return new MockDate().valueOf();
  };
  MockDate.parse = function (dateString: string) {
    return _Date.parse(dateString);
  };
  MockDate.toString = function () {
    return _Date.toString();
  };
  (window as any).Date = MockDate;
}
