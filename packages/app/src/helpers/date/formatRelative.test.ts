import { sub } from 'date-fns';

import { locales } from './constants';
import formatRelative from './formatRelative';

const DATE = new Date('2020-01-01');

describe('Helpers - date - formatRelative', () => {
  describe('# French locale', () => {
    beforeAll(() => {
      jest.useFakeTimers().setSystemTime(DATE.getTime());
      locales.setLanguage('fr');
    });

    const subCases = [
      [{ minutes: 1 }, 'hier à 23:59'],
      [{ hours: 1 }, 'hier à 23:00'],
      [{ days: 1 }, 'hier à 00:00'],
      [{ weeks: 1 }, '25/12/2019'],
      [{ weeks: 2 }, '18/12/2019'],
      [{ months: 1 }, '01/12/2019'],
    ] as const;

    test.each(subCases)(
      'given date minus %p, it should return %p',
      (received, expected) => {
        expect(formatRelative(sub(DATE, received), DATE)).toEqual(expected);
      },
    );

    // const addCases = [
    //   [{ minutes: 1 }, 'hier à 23:59'],
    //   [{ hours: 1 }, 'environ 1 heure'],
    //   [{ days: 1 }, '1 jour'],
    //   [{ weeks: 1 }, '7 jours'],
    //   [{ weeks: 2 }, '14 jours'],
    //   [{ months: 1 }, 'environ 1 mois'],
    //   [{ minutes: 25, seconds: 29 }, '25 minutes'],
    //   [{ minutes: 25, seconds: 30 }, '26 minutes'],
    // ] as const;

    // test.each(addCases)(
    //   'given date plus %p, it should return %p',
    //   (received, expected) => {
    //     expect(formatRelative(add(DATE, received), DATE)).toEqual(
    //       expected
    //     );
    //   }
    // );
  });
});
