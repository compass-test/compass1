'use strict';

import { calculateDays, adjustLabelToFit } from '../common/utils';

describe('Calculating days', () => {
  it('Should convert 2 weeks to 14 days', () => {
    expect(
      calculateDays(
        '2019-07-01T00:00:00+10:00',
        'Australia/Sydney',
        2,
        'weeks',
      ),
    ).toEqual(14);
  });

  it('Should convert 2 weeks over a daylight saving time start to 14 days', () => {
    // DST changeover occured the following Sunday at 2019-10-06T03:00:00+11:00
    expect(
      calculateDays(
        '2019-09-30T00:00:00+10:00',
        'Australia/Sydney',
        2,
        'weeks',
      ),
    ).toEqual(14);
  });

  it('Should convert 2 weeks over a daylight saving time end to 14 days', () => {
    // DST changeover occured the following Sunday at 2019-04-07T02:00:00+10:00
    expect(
      calculateDays(
        '2019-04-01T00:00:00+11:00',
        'Australia/Sydney',
        2,
        'weeks',
      ),
    ).toEqual(14);
  });

  it('Should convert 1 month from the beginning of January to 31 days', () => {
    expect(
      calculateDays(
        '2020-01-01T00:00:00+11:00',
        'Australia/Sydney',
        1,
        'months',
      ),
    ).toEqual(31);
  });

  it('Should convert 2 months from the beginning of January to 60 days (Leap Year)', () => {
    expect(
      calculateDays(
        '2020-01-01T00:00:00+11:00',
        'Australia/Sydney',
        2,
        'months',
      ),
    ).toEqual(60);
  });

  it('Should convert 2 months from the beginning of January to 59 days (Non-Leap Year)', () => {
    expect(
      calculateDays(
        '2019-01-01T00:00:00+11:00',
        'Australia/Sydney',
        2,
        'months',
      ),
    ).toEqual(59);
  });
});

describe('Adjust Label to Fit', () => {
  const exampleNames = [
    {
      full: 'Lachy James Hunt',
      first: 'L',
      initials: 'LJH',
      firstNamePlusInitials: 'Lachy J. H.',
    },
    {
      full: 'Bryan Waite',
      first: 'B',
      initials: 'BW',
      firstNamePlusInitials: 'Bryan W.',
    },
    {
      full: 'saidur rahman',
      first: 'S',
      initials: 'SR',
      firstNamePlusInitials: 'saidur R.',
    },
  ];

  it('Should convert name to first uppercase-initial only', () => {
    expect(adjustLabelToFit(exampleNames[0].full, 2)).toEqual(
      exampleNames[0].first,
    );
    expect(adjustLabelToFit(exampleNames[1].full, 2.7)).toEqual(
      exampleNames[1].first,
    );
    expect(adjustLabelToFit(exampleNames[2].full, 2.7)).toEqual(
      exampleNames[2].first,
    );
  });

  it('Should convert name to all uppercase-initials', () => {
    expect(adjustLabelToFit(exampleNames[0].full, 2.8)).toEqual(
      exampleNames[0].initials,
    );
    expect(adjustLabelToFit(exampleNames[1].full, 8)).toEqual(
      exampleNames[1].initials,
    );
    expect(adjustLabelToFit(exampleNames[2].full, 8)).toEqual(
      exampleNames[2].initials,
    );
  });

  it('Should convert name to first name plus dotted-uppercase-initials', () => {
    expect(adjustLabelToFit(exampleNames[0].full, 8.1)).toEqual(
      exampleNames[0].firstNamePlusInitials,
    );
    expect(adjustLabelToFit(exampleNames[1].full, 11.9)).toEqual(
      exampleNames[1].firstNamePlusInitials,
    );
    expect(adjustLabelToFit(exampleNames[2].full, 11.9)).toEqual(
      exampleNames[2].firstNamePlusInitials,
    );
  });

  it('Should convert return the full name', () => {
    expect(adjustLabelToFit(exampleNames[0].full, 12)).toEqual(
      exampleNames[0].full,
    );
    expect(adjustLabelToFit(exampleNames[1].full, 12)).toEqual(
      exampleNames[1].full,
    );
    expect(adjustLabelToFit(exampleNames[2].full, 12)).toEqual(
      exampleNames[2].full,
    );
  });
});
