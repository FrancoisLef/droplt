/* eslint-disable quotes */
import { enUS, fr } from 'date-fns/locale';
import LocalizedStrings from 'localized-strings';

/**
 * @example
 * fr "17/12/1995"
 * en "12/17/1995"
 */
export const P = 'P';

/**
 * @example
 * fr "17 déc. 1995"
 * en "Dec 17, 1995"
 */
export const PP = 'PP';

/**
 * @example
 * fr "17 décembre 1995"
 * en "December 17th, 1995"
 */
export const PPP = 'PPP';

/**
 * @example
 * fr "17 décembre 1995 03:24"
 * en "December 17th, 1995 3:24 AM"
 */
export const PPP_p = 'PPP p';

/**
 * @example
 * fr "dimanche 17 décembre 1995 à 03:24"
 * en "Sunday, December 17th, 1995 at 3:24 AM"
 */
export const PPPPp = 'PPPPp';

/**
 * @example
 * fr "17/12/1995, 03:24"
 * en "12/17/1995, 3:24 AM"
 */
export const Pp = 'Pp';

/**
 * @example
 * fr "17 déc. 1995, 03:24"
 * en "Dec 17, 1995, 3:24 AM"
 */
export const PPp = 'PPp';

/**
 * @example
 * fr "17/12/1995 à 03:24"
 * en "12/17/1995 at 3:24 AM"
 */
export const Patp = 'Patp';

/**
 * @example
 * fr "17 déc. 1995 à 03:24"
 * en "Dec 17, 1995 at 3:24 AM"
 */
export const PPatp = 'PPatp';

/**
 * @example
 * fr "17 décembre 1995 à 03:24"
 * en "December 17th, 1995 at 3:24 AM"
 */
export const PPPatp = 'PPPatp';

// don’t forget to add your format to this map
export const FORMATS = {
  P,
  PP,
  PPP,
  PPP_p,
  [PPP_p]: PPP_p,
  PPPPp,
  Pp,
  PPp,
  Patp,
  PPatp,
  PPPatp,
} as const;

/**
 * Custom format locales
 */
export const locales = new LocalizedStrings({
  en: {
    ...FORMATS,
    [Patp]: "P 'at' p",
    [PPatp]: "PP 'at' p",
    [PPPatp]: "PPP 'at' p",
  },
  fr: {
    ...FORMATS,
    [Patp]: "P 'à' p",
    [PPatp]: "PP 'à' p",
    [PPPatp]: "PPP 'à' p",
  },
});

/**
 * Date fns supported locales
 */
export const dateFnsLocales: Record<string, Locale> = {
  en: enUS,
  fr,
};
