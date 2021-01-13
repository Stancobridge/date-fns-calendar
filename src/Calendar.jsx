import { format, isSameDay, isSameMonth } from "date-fns";
import { useState } from "react";
import { takeMonth } from "./services/DateFns";
function WeekNames() {
  return (
    <div className={"flex"}>
      {["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"].map((dayName) => (
        <div
          key={dayName}
          className={
            "bg-blue-200 h-16 w-16 flex items-center justify-center border border-blue-200"
          }
        >
          {dayName}
        </div>
      ))}
    </div>
  );
}

function Calendar(props) {
  const [currentDate, setCurrent] = useState(new Date());
  const data = takeMonth(currentDate)();
  const dayColor = (day) => {
    if (!isSameMonth(day, currentDate)) return "text-gray-500";
  };
  const isCurrentDay = (day) => {
    if (isSameDay(day, currentDate)) return "bg-blue-200";
  };
  return (
    <div className={"bg-white box-border m-8 flex"}>
      <div className={"border rounded-xl p-2 shadow"}>
        <h1
          className={
            "text-center font-black text-2xl font-bold mb-2 text-gray-700"
          }
        >
          {format(currentDate, "MMMM")}
        </h1>
        <WeekNames />
        {data.map((week) => (
          <div key={JSON.stringify(week)} className={"flex"}>
            {week.map((day) => (
              <div
                key={day}
                className={`h-16 w-16 flex items-center justify-center border border-blue-200  ${dayColor(
                  day
                )} ${isCurrentDay(day)}`}
                onClick={() => setCurrent(day)}
              >
                {format(day, "dd")}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;
