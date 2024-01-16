import { OperatingMode } from './getExtraReducers';

export enum OpeningStatus {
  CLOSED = 'Closed',
  OPENED = 'Opened',
}

const getWeekDay = () => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const date = new Date();
  const number = date.getDay();
  return days[number];
};

export const getOpenStatus = (delivery: OperatingMode) => {
  const weekDay = getWeekDay();
  const listOfTimePeriods = delivery[weekDay].replace(/[\s]/g, '').split(',');

  let status = '';

  const now = new Date();
  const minutes = now.getHours() * 60 + now.getMinutes();

  listOfTimePeriods.forEach((el: any) => {
    if (el === OpeningStatus.CLOSED) {
      status = el;
    } else {
      const list = el.split('-').map((item: any) => {
        if (/\d\d:\d\dPM/.test(item)) {
          return (
            (Number(item.substring(0, 2)) + (Number(item.substring(0, 2)) === 12 ? 0 : 12)) * 60 +
            Number(item.slice(3, -2))
          );
        } else if (/\d\d:\d\dAM/.test(item)) {
          return (
            (Number(item.substring(0, 2)) - (Number(item.substring(0, 2)) === 12 ? 12 : 0)) * 60 +
            Number(item.slice(3, -2))
          );
        } else {
          return el;
        }
      });

      if (list[0] < minutes && list[1] > minutes) {
        status = OpeningStatus.OPENED;
      } else {
        status = OpeningStatus.CLOSED;
      }
    }
  });
  return status;
};
