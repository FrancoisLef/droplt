import { FORMATS, locales } from './constants';
import formatDate from './formatDate';

const { P, PP, PPP, PPP_p, PPPPp, PPPatp, PPatp, PPp, Patp, Pp } = FORMATS;

const DATE = '1995-12-17T03:24:00';

describe('Helpers - date - formatDate', () => {
  describe('# French locale', () => {
    beforeAll(() => {
      locales.setLanguage('fr');
    });

    const cases = [
      [P, '17/12/1995'],
      [PP, '17 déc. 1995'],
      [Pp, '17/12/1995, 03:24'],
      [PPP, '17 décembre 1995'],
      [PPp, '17 déc. 1995, 03:24'],
      [PPP_p, '17 décembre 1995 03:24'],
      [PPPPp, 'dimanche 17 décembre 1995 à 03:24'],
      [Patp, '17/12/1995 à 03:24'],
      [PPatp, '17 déc. 1995 à 03:24'],
      [PPPatp, '17 décembre 1995 à 03:24'],
    ] as const;

    test.each(cases)(
      'given format %p, it should return %p',
      (received, expected) => {
        expect(formatDate(new Date(DATE), received)).toEqual(expected);
      },
    );
  });

  describe('# English locale', () => {
    beforeAll(() => {
      locales.setLanguage('en');
    });

    const cases = [
      [P, '12/17/1995'],
      [PP, 'Dec 17, 1995'],
      [Pp, '12/17/1995, 3:24 AM'],
      [PPP, 'December 17th, 1995'],
      [PPp, 'Dec 17, 1995, 3:24 AM'],
      [PPP_p, 'December 17th, 1995 3:24 AM'],
      [PPPPp, 'Sunday, December 17th, 1995 at 3:24 AM'],
      [Patp, '12/17/1995 at 3:24 AM'],
      [PPatp, 'Dec 17, 1995 at 3:24 AM'],
      [PPPatp, 'December 17th, 1995 at 3:24 AM'],
    ] as const;

    test.each(cases)(
      'given format %p, it should return %p',
      (received, expected) => {
        expect(formatDate(new Date(DATE), received)).toEqual(expected);
      },
    );
  });
});
