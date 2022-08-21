import { WEEKDAY, MONTH } from "../data/date.data";

export const getDate = (unix_timestap) => {
  const date_object = new Date(unix_timestap * 1000);
  
  return {
    date: date_object.getDate(),
    day: WEEKDAY[date_object.getDay()],
    month: MONTH[date_object.getMonth()],
  }
};