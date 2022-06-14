import { formatDistanceToNow as dateFnsFormatDistanceToNow } from 'date-fns';

import { dateFnsLocales, locales } from './constants';

/**
 * Localized **date-fns** `formatDistanceToNow` function
 *
 * @link https://date-fns.org/v2.28.0/docs/formatDistanceToNow
 * @param {number | Date} date
 * @returns {string} formatted date
 */
const formatDistanceToNow = (date: number | Date): string => {
  return dateFnsFormatDistanceToNow(date, {
    locale: dateFnsLocales[locales.getLanguage()],
  });
};

export default formatDistanceToNow;
