import { format, fromUnixTime } from "date-fns";

export const dateConverter = (seconds, nanoseconds) => {
  if (!seconds || !nanoseconds) return null;
  const secondsToConvert = seconds;
  const nanosecondsToConvert = nanoseconds;

  const milliseconds = secondsToConvert * 1000 + nanosecondsToConvert / 1000000;

  const date = fromUnixTime(milliseconds / 1000);
  const formattedDate = format(date, "MMM/dd/yyyy hh:mm a");

  return { formattedDate };
};
