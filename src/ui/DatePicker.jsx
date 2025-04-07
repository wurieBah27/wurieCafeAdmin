import { Datepicker } from "flowbite-react";
import { format } from "date-fns";
import { useState } from "react";

const DatePicker = () => {
  const todays = new Date();
  const [dates, setDate] = useState(todays);

  const formattedDate = format(dates, "EEE dd MMM yyyy");
  return <Datepicker required onChange={(e) => setDate(e)} value={dates} />;
};

export default DatePicker;
