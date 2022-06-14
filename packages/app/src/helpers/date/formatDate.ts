import { format as dateFnsFormat } from 'date-fns';

import { dateFnsLocales, FORMATS, locales } from './constants';

/**
 * Localized **date-fns** `format` function
 *
 * _https://date-fns.org/v2.21.2/docs/format#description_
 *
 * @param {number | Date} date
 * @param {string} formatStr
 * @param {string} locale
 *
 * @returns {string} Formatted date
 */
const formatDate = (
  date: number | Date,
  formatStr: keyof typeof FORMATS,
  locale: string = locales.getLanguage(),
): string => {
  return dateFnsFormat(date, locales[formatStr] || formatStr, {
    locale: dateFnsLocales[locale],
  });
};

export default formatDate;
