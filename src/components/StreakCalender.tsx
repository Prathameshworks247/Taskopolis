import React, { useState } from "react";
import { addDays, format, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import "bootstrap/dist/css/bootstrap.min.css";

const StreakCalendar: React.FC = () => {
  const today: Date = new Date();
  const [streakDays, setStreakDays] = useState<string[]>([format(today, "yyyy-MM-dd")]);

  const start: Date = startOfMonth(today);
  const end: Date = endOfMonth(today);
  const daysInMonth: Date[] = eachDayOfInterval({ start, end });

  const toggleDay = (date: Date): void => {
    const dateString: string = format(date, "yyyy-MM-dd");
    setStreakDays((prev: string[]) =>
      prev.includes(dateString)
        ? prev.filter((day) => day !== dateString)
        : [...prev, dateString]
    );
  };

  return (
    <div className="container bg-dark w-2 text-white rounded p-4">
      <h2 className="text-center mb-4">Streak Calendar</h2>
      <div className="row row-cols-3 g-2">
        {daysInMonth.map((day: Date) => {
          const dateString: string = format(day, "yyyy-MM-dd");
          const isCompleted: boolean = streakDays.includes(dateString);
          return (
            <div key={dateString} className="col text-center">
              <button
                className={`btn ${isCompleted ? "btn-success" : "btn-secondary"} w-100`}
                onClick={() => toggleDay(day)}
              >
                {format(day, "d")}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StreakCalendar;
