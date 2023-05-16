export const getDateShortFormatEU = (dateTimeToFormat: number) => {
  const dateStr = new Date(dateTimeToFormat).toLocaleDateString('en-us', {
    // dateStyle: 'medium',
    day: '2-digit',
    month: 'short',
    weekday: 'short',
  });
  const result = dateStr.split(',');
  const dayMonthPart = `${result[1]}, ${result[0]}`;

  return dayMonthPart;
};
export const getTimeShort24hFormat = (dateTimeToFormat: number) => {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString
  return new Date(dateTimeToFormat).toLocaleTimeString('en-us', {
    timeStyle: 'short',
    hour12: false,
  });
};

export const formatShortTime3 = (dateTimeToFormat: number) => {
  return new Date(dateTimeToFormat).toLocaleTimeString('en-us', {
    // weekday: 'long',
    // year: 'numeric',
    // month: 'long',
    // day: 'numeric',
    timeStyle: 'full',
  });
};
export const formatShortTime4 = (dateTimeToFormat: number) => {
  return new Date(dateTimeToFormat).toLocaleDateString();
};
/*

 */
