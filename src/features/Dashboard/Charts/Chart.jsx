import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Chart = ({ aspect, title, orders, numDays }) => {
  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    return {
      name: format(date, "MMM dd"),
      totalSales: orders
        ?.filter((order) => isSameDay(date, new Date(order?.createdAt)))
        .reduce((acc, curr) => acc + curr?.sub_total, 0),
      Extras: orders
        ?.filter((order) => isSameDay(date, new Date(order?.createdAt)))
        ?.map((item) => item.items)
        .flat()
        .reduce((accumulator, currentValue) => {
          if (currentValue?.totalOptionPrice !== undefined) {
            return accumulator + currentValue?.totalOptionPrice;
          }

          return accumulator;
        }, 0),
    };
  });
  return (
    <>
      <div className="mt-10 flex flex-[6] flex-col gap-2 rounded-md py-3 sm:p-6">
        <p className="ml-3 text-base font-semibold capitalize text-gray-500">
          {title}
        </p>
        <ResponsiveContainer
          width="100%"
          aspect={aspect}
          className={"shadow-md"}
        >
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" fontSize="12px" stroke="gray" />
            <YAxis fontSize="12px" stroke="gray" />
            <CartesianGrid
              strokeDasharray="3 3"
              className=""
              strokeOpacity={0.5}
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="totalSales"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
            <Area
              type="monotone"
              dataKey="Extras"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#colorPv)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default Chart;
