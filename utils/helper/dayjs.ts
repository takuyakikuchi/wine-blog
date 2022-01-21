import dayjs from 'dayjs';
dayjs.extend(utc);
dayjs.extend(timezone);
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

export const toJapanDate = (dateTime: Date) => {
  return dayjs.utc(dateTime).tz('Asia/Tokyo').format('YYYY-MM-DD');
};
