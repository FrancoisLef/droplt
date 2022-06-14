import { formatRelative as dateFnsFormatRelative } from 'date-fns';

import { dateFnsLocales, locales } from './constants';

/**
 * Localized **date-fns** `formatRelative` function
 *
 * *https://date-fns.org/v2.21.2/docs/format#description*
 *
 * @param {number | Date} date
 * @param {string} baseDate
 * @returns {string} formatted relative date
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
