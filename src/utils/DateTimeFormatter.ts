export const formatDate = (inputDate: string): string => {
  const date = new Date(inputDate);
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    weekday: 'short',
  };

  const dateStr = date.toLocaleDateString('en-us', options);

  const result = dateStr.split(',');
  let dayMonthPart = `${result[1]}, ${result[0]}`;

  const currentDate = new Date();

  const isToday =
    currentDate.getDate() === date.getDate() &&
    currentDate.getMonth() === date.getMonth() &&
    currentDate.getFullYear() === date.getFullYear();

  if (isToday) {
    dayMonthPart = `Today, ${result[0]}`;
  } else {
    const isYesterday =
      currentDate.getDate() - date.getDate() === 1 &&
      currentDate.getMonth() === date.getMonth() &&
      currentDate.getFullYear() === date.getFullYear();

    if (isYesterday) {
      dayMonthPart = `Yesterday, ${result[0]}`;
    }
  }

  return dayMonthPart;
};
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

export const getDateForDialog = (dateTimeToFormat: number) => {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString
  const currentDate = new Date();
  const receivedDate = new Date(dateTimeToFormat);

  const isToday =
    currentDate.getDate() === receivedDate.getDate() &&
    currentDate.getMonth() === receivedDate.getMonth() &&
    currentDate.getFullYear() === receivedDate.getFullYear();

  if (isToday) {
    return new Date(dateTimeToFormat).toLocaleTimeString('en-us', {
      timeStyle: 'short',
      hour12: false,
    });
  }

  return new Date(dateTimeToFormat).toLocaleDateString();
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
