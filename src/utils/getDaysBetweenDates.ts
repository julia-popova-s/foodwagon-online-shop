export const getDaysBetweenDates = (dateFirst: string, dateSecond: string) => {
  const dateStart = Date.parse(dateFirst);
  const dateEnd = Date.parse(dateSecond);

  const now = new Date().getTime();

  if (dateStart <= now && now <= dateEnd) {
    return Math.floor((Date.parse(dateSecond) - now) / (1000 * 60 * 60 * 24));
  } else {
    return 0;
  }
};
