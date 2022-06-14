import { formatRelative as dateFnsFormatRelative } from 'date-fns';

import { dateFnsLocales, locales } from './constants';

/**
 * Localized **date-fns** `formatRelative` function
 *
 * @param   {number | Date} date
 * @param   {string}        baseDate
 * @returns {string}
 * @link https://date-fns.org/v2.21.2/docs/format#description
 */
const formatRelative = (
  date: number | Date,
  baseDate: number | Date,
): string => {
  return dateFnsFormatRelative(date, baseDate, {
    locale: dateFnsLocales[locales.getLanguage()],
  });
};

export default formatRelative;
