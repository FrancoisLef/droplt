import { formatDistanceToNowStrict as dateFnsFormatDistanceToNowStrict } from 'date-fns';

import { dateFnsLocales, locales } from './constants';

/**
 * Localized **date-fns** `formatDistanceToNowStrict` function
 *
 * @param   {number | Date} date
 * @returns {string}
 * @link https://date-fns.org/v2.28.0/docs/formatDistanceToNowStrict
 */
const formatDistanceToNowStrict = (date: number | Date): string => {
  return dateFnsFormatDistanceToNowStrict(date, {
    locale: dateFnsLocales[locales.getLanguage()],
  });
};

export default formatDistanceToNowStrict;
