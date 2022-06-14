import { formatDistanceToNow as dateFnsFormatDistanceToNow } from 'date-fns';

import { dateFnsLocales, locales } from './constants';

/**
 * Localized **date-fns** `formatDistanceToNow` function
 *
 * @param   {number | Date} date
 * @returns {string}
 * @link https://date-fns.org/v2.28.0/docs/formatDistanceToNow
 */
const formatDistanceToNow = (date: number | Date): string => {
  return dateFnsFormatDistanceToNow(date, {
    locale: dateFnsLocales[locales.getLanguage()],
  });
};

export default formatDistanceToNow;
