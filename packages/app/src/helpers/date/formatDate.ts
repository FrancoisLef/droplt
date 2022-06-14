import { format as dateFnsFormat } from 'date-fns';

import { dateFnsLocales, FORMATS, locales } from './constants';

/**
 * Localized **date-fns** `format` function
 *
 * @param   {number | Date} date
 * @param   {string}        formatStr
 * @param   {string}        locale
 * @returns {string}
 * @link https://date-fns.org/v2.21.2/docs/format#description
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
