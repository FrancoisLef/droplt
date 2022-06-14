import { add, sub } from 'date-fns';

import { locales } from './constants';
import formatDistanceToNowStrict from './formatDistanceToNowStrict';

describe('Helpers - date - formatDistanceToNowStrict', () => {
  describe('# French locale', () => {
    beforeAll(() => {
      jest.useFakeTimers().setSystemTime(new Date('2020-01-01').getTime());
      locales.setLanguage('fr');
    });

    const cases = [
      [{ minutes: 1 }, '1 minute'],
      [{ hours: 1 }, '1 heure'],
      [{ days: 1 }, '1 jour'],
      [{ weeks: 1 }, '7 jours'],
      [{ weeks: 2 }, '14 jours'],
      [{ months: 1 }, '1 mois'],
      [{ months: 6 }, '6 mois'],
      [{ months: 6, weeks: 2, days: 5 }, '7 mois'],
      [{ years: 1 }, '1 an'],
      [{ minutes: 25, seconds: 29 }, '25 minutes'],
      [{ minutes: 25, seconds: 30 }, '26 minutes'],
    ] as const;

    test.each(cases)(
      'given date minus %p, it should return %p',
      (received, expected) => {
        expect(formatDistanceToNowStrict(sub(new Date(), received))).toEqual(
          expected,
        );
      },
    );

    test.each(cases)(
      'given date plus %p, it should return %p',
      (received, expected) => {
        expect(formatDistanceToNowStrict(add(new Date(), received))).toEqual(
          expected,
        );
      },
    );
  });
});
