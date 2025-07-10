import React, { useState, useMemo } from 'react';
import { cn } from '../lib/utils';
import { format, startOfYear, endOfYear, eachDayOfInterval, getDay, startOfWeek, addDays } from 'date-fns';

interface StreakData {
  date: Date;
  count: number;
}

interface StreakCalendarProps {
  data?: StreakData[];
  year?: number;
}

const StreakCalendar: React.FC<StreakCalendarProps> = ({ 
  data = [], 
  year = new Date().getFullYear() 
}) => {
  const [hoveredDay, setHoveredDay] = useState<{ date: Date; count: number } | null>(null);

  // Generate all days in the year
  const yearStart = startOfYear(new Date(year, 0, 1));
  const yearEnd = endOfYear(new Date(year, 0, 1));
  const allDays = eachDayOfInterval({ start: yearStart, end: yearEnd });

  const dataMap = useMemo(() => {
    const map = new Map<string, number>();
    data.forEach(item => {
      map.set(format(item.date, 'yyyy-MM-dd'), item.count);
    });
    return map;
  }, [data]);

  // Get color class based on count
  const getColorClass = (count: number) => {
    if (count === 0) return 'bg-gray-100 hover:bg-gray-200';
    if (count <= 3) return 'bg-green-200 hover:bg-green-300';
    if (count <= 6) return 'bg-green-400 hover:bg-green-500';
    if (count <= 9) return 'bg-green-600 hover:bg-green-700';
    return 'bg-green-800 hover:bg-green-900';
  };

  // Group days into weeks starting from Sunday
  const weeks = useMemo(() => {
    const weeks: Date[][] = [];
    let currentWeek: Date[] = [];
    
    // Find the first Sunday of the year or before
    const firstDay = allDays[0];
    const firstSunday = startOfWeek(firstDay, { weekStartsOn: 0 });
    
    // Add days from previous year if needed
    if (firstSunday < firstDay) {
      for (let i = 0; i < getDay(firstDay); i++) {
        currentWeek.push(addDays(firstSunday, i));
      }
    }
    
    // Add all days of the year
    allDays.forEach(day => {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    });
    
    // Add remaining days to complete the last week
    if (currentWeek.length > 0) {
      const lastDay = currentWeek[currentWeek.length - 1];
      while (currentWeek.length < 7) {
        currentWeek.push(addDays(lastDay, currentWeek.length - allDays.length + 1));
      }
      weeks.push(currentWeek);
    }
    
    return weeks;
  }, [allDays]);

  // Get months for labels
  const months = useMemo(() => {
    const monthLabels: { name: string; weekIndex: number }[] = [];
    const seenMonths = new Set<string>();
    
    weeks.forEach((week, weekIndex) => {
      const firstDayOfWeek = week[0];
      const monthKey = format(firstDayOfWeek, 'MMM');
      
      if (!seenMonths.has(monthKey) && weekIndex % 4 === 0) {
        monthLabels.push({
          name: monthKey,
          weekIndex
        });
        seenMonths.add(monthKey);
      }
    });
    
    return monthLabels;
  }, [weeks]);

  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="flex w-10/12 flex-col justify-center align-middle relative m-8 p-6 bg-white rounded-lg border-spacing-2 shadow-sm">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {year} Activity Calendar
        </h2>
        <p className="text-gray-600">
          {data.length} contributions in the last year
        </p>
      </div>

      <div className="relative">
        {/* Month labels */}
        <div className="flex mb-2">
          <div className="w-8"></div>
          {months.map((month, index) => (
            <div
              key={`${month.name}-${index}`}
              className="text-xs text-gray-600 font-medium"
              style={{ 
                marginLeft: index === 0 ? `${month.weekIndex * 13}px` : `${(month.weekIndex - months[index - 1]?.weekIndex) * 13}px` 
              }}
            >
              {month.name}
            </div>
          ))}
        </div>

        <div className="flex">
          {/* Day labels */}
          <div className="flex flex-col justify-between mr-2 text-xs text-gray-600 font-medium">
            {dayLabels.map((day, index) => (
              <div key={day} className="h-3 flex items-center" style={{ opacity: index % 2 === 1 ? 1 : 0 }}>
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="flex gap-1">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {week.map((day, dayIndex) => {
                  const dateKey = format(day, 'yyyy-MM-dd');
                  const count = dataMap.get(dateKey) || 0;
                  const isCurrentYear = day >= yearStart && day <= yearEnd;
                  
                  return (
                    <div
                      key={`${weekIndex}-${dayIndex}`}
                      className={cn(
                        'w-3 h-3 rounded-sm border transition-all duration-200 cursor-pointer',
                        isCurrentYear 
                          ? getColorClass(count)
                          : 'bg-gray-50 opacity-30',
                        'hover:scale-110 hover:z-10 hover:border-gray-400'
                      )}
                      onMouseEnter={() => isCurrentYear && setHoveredDay({ date: day, count })}
                      onMouseLeave={() => setHoveredDay(null)}
                      title={isCurrentYear ? `${count} contributions on ${format(day, 'MMM d, yyyy')}` : ''}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Tooltip */}
        {hoveredDay && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg z-20 whitespace-nowrap">
            <div className="font-medium">
              {hoveredDay.count} contributions
            </div>
            <div className="text-gray-300">
              {format(hoveredDay.date, 'EEEE, MMMM d, yyyy')}
            </div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between mt-4 text-xs text-gray-600">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 bg-gray-100 rounded-sm border"></div>
          <div className="w-3 h-3 bg-green-200 rounded-sm border"></div>
          <div className="w-3 h-3 bg-green-400 rounded-sm border"></div>
          <div className="w-3 h-3 bg-green-600 rounded-sm border"></div>
          <div className="w-3 h-3 bg-green-800 rounded-sm border"></div>
        </div>
        <span>More</span>
      </div>
    </div>
  );
};

export default StreakCalendar;
