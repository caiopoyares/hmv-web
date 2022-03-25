import dayjs from "dayjs";

export const isBrowser = typeof window !== "undefined";

export const parseDate = (date: string) => {
  const [day, month, year] = date.split("/");
  return dayjs(`${year}/${month}/${day}`, "YYYY/MM/DD").toDate();
};
