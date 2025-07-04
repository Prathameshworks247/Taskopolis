
import { format, subDays } from 'date-fns';
import BuildingTile from './BuildingTile.tsx';

interface CityGridProps {
  cityData: Record<string, number>;
}

const CityGrid = ({ cityData }: CityGridProps) => {
  // Generate array of the last 21 days
  const days = Array.from({ length: 21 }, (_, i) => {
    const date = subDays(new Date(), 20 - i);
    return {
      date: format(date, 'yyyy-MM-dd'),
      displayDate: format(date, 'MMM d'),
      dayOfWeek: format(date, 'EEE'),
      isToday: i === 20,
      isWeekend: [0, 6].includes(date.getDay())
    };
  });

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-max">
        {/* Week labels */}
        <div className="grid gap-2 mb-4" style={{ gridTemplateColumns: 'repeat(21, minmax(40px, 1fr))' }}>
          {days.map((day, index) => (
            <div key={day.date} className="text-center">
              <div className="text-xs text-gray-500 font-medium mb-1">
                {day.dayOfWeek}
              </div>
              <div className={`text-xs font-semibold ${
                day.isToday ? 'text-blue-600' : 'text-gray-600'
              }`}>
                {day.displayDate}
              </div>
            </div>
          ))}
        </div>

        {/* City grid */}
        <div className="grid gap-2 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border-2 border-dashed border-gray-200" style={{ gridTemplateColumns: 'repeat(21, minmax(40px, 1fr))' }}>
          {days.map((day, index) => (
            <BuildingTile
              key={day.date}
              tasks={cityData[day.date] || 0}
              isToday={day.isToday}
              isWeekend={day.isWeekend}
              dayIndex={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CityGrid;